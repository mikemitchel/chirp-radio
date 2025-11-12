/**
 * Vercel Cron Function: Capture CHIRP Playlist
 *
 * This runs every 30 seconds to capture the current playlist from CHIRP Radio.
 * It processes all 6 songs (now_playing + recently_played) to ensure 100% capture rate.
 *
 * Optimizations:
 * - Caches album art by artist+album to avoid redundant API calls
 * - Still validates Last.fm URLs (they can change over time)
 * - Handles DJ batch submissions (multiple songs added at once)
 *
 * Configure in vercel.json with cron schedule to run every 30 seconds
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  insertPlaylistEntry,
  playlistEntryExists,
  findPotentialCorrections,
  markAsSuperseded,
  getCachedAlbumArt,
} from '../../lib/db'
import {
  tryItunesAlbumArt,
  tryMusicBrainzAlbumArt,
  testImageUrl,
  upgradeLastFmQuality,
} from '../../src/utils/albumArtFallback'

// Type definitions matching the CHIRP API
interface ChirpSong {
  id: string
  artist: string
  track: string
  release?: string
  label?: string
  dj: string
  notes?: string
  played_at_gmt: string
  played_at_gmt_ts: number
  played_at_local: string
  played_at_local_ts: number
  artist_is_local: boolean
  lastfm_urls?: {
    large_image?: string | null
    med_image?: string | null
    sm_image?: string | null
    _processed?: boolean
  }
}

interface ChirpPlaylistResponse {
  now_playing: ChirpSong
  recently_played: ChirpSong[]
}

/**
 * Resolves enhanced album art with fallback chain
 * Priority: Cache → Last.fm → iTunes → MusicBrainz
 *
 * Cache: If we've already resolved album art for this artist+album combo, reuse it
 * This saves API calls and speeds up processing for repeat albums
 */
async function resolveEnhancedAlbumArt(song: ChirpSong): Promise<string | null> {
  const artist = song.artist
  const album = song.release || ''

  // Step 1: Check cache first (if we have album info)
  if (album && album.trim() !== '') {
    const cachedUrl = await getCachedAlbumArt(artist, album)
    if (cachedUrl) {
      console.log(`💾 Using cached album art for ${artist} - ${album}`)
      return cachedUrl
    }
  }

  // Step 2: Try Last.fm large image (always validate, URLs can change)
  const lastFmUrl = song.lastfm_urls?.large_image
  if (lastFmUrl && lastFmUrl.trim() !== '') {
    const upgradedUrl = upgradeLastFmQuality(lastFmUrl, false)
    const isValid = await testImageUrl(upgradedUrl)
    if (isValid) {
      console.log(`✓ Last.fm art validated for ${artist} - ${song.track}`)
      return upgradedUrl
    }
  }

  // Step 3: Only try iTunes/MusicBrainz if we have album name
  if (album && album.trim() !== '') {
    // Try iTunes
    console.log(`Trying iTunes for ${artist} - ${album}...`)
    const itunesUrl = await tryItunesAlbumArt(artist, album)
    if (itunesUrl) {
      console.log(`✓ iTunes art found for ${artist} - ${album}`)
      return itunesUrl
    }

    // Try MusicBrainz
    console.log(`Trying MusicBrainz for ${artist} - ${album}...`)
    const musicBrainzUrl = await tryMusicBrainzAlbumArt(artist, album)
    if (musicBrainzUrl) {
      console.log(`✓ MusicBrainz art found for ${artist} - ${album}`)
      return musicBrainzUrl
    }
  }

  console.log(`✗ No enhanced album art found for ${artist} - ${song.track}`)
  return null
}

/**
 * Detects if this song is a correction of a previous entry
 * Returns the ID of the entry being corrected, or null
 */
async function detectCorrection(song: ChirpSong): Promise<number | null> {
  const played_at_gmt = new Date(song.played_at_gmt)

  // Find potential corrections within 5-minute window
  const potentials = await findPotentialCorrections(song.artist, song.track, played_at_gmt, song.id)

  // If we found a similar entry within the time window, it's likely a correction
  if (potentials.length > 0) {
    const original = potentials[0]
    console.log(`🔄 Detected correction: ${original.id} → ${song.id}`)
    return original.id!
  }

  return null
}

/**
 * Main cron handler
 */
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    console.log('[Cron] Starting playlist capture...')
    const startTime = Date.now()

    // Fetch current playlist from CHIRP API
    const response = await fetch('https://chirpradio.appspot.com/api/current_playlist')
    if (!response.ok) {
      throw new Error(`CHIRP API returned ${response.status}`)
    }

    const data: ChirpPlaylistResponse = await response.json()

    // Combine all 6 songs into one array
    const allSongs: ChirpSong[] = [data.now_playing, ...data.recently_played]
    console.log(`[Cron] Fetched ${allSongs.length} songs from CHIRP API`)

    let newSongs = 0
    let skipped = 0
    let corrections = 0
    let errors = 0

    // Process each song
    for (const song of allSongs) {
      try {
        // Check if we already have this song
        const exists = await playlistEntryExists(song.id)
        if (exists) {
          console.log(`⏭️  Skipping ${song.artist} - ${song.track} (already captured)`)
          skipped++
          continue
        }

        console.log(`📝 Processing new song: ${song.artist} - ${song.track}`)

        // Detect if this is a correction
        const correction_of = await detectCorrection(song)
        if (correction_of) {
          // Mark the original as superseded
          await markAsSuperseded(correction_of)
          corrections++
        }

        // Resolve enhanced album art
        const album_art_enhanced = await resolveEnhancedAlbumArt(song)

        // Insert into database
        await insertPlaylistEntry({
          chirp_id: song.id,
          artist: song.artist,
          track: song.track,
          release: song.release || null,
          label: song.label || null,
          dj_name: song.dj,
          notes: song.notes || null,
          played_at_gmt: new Date(song.played_at_gmt),
          played_at_gmt_ts: song.played_at_gmt_ts,
          played_at_local: new Date(song.played_at_local),
          played_at_local_ts: song.played_at_local_ts,
          artist_is_local: song.artist_is_local,
          album_art_small: song.lastfm_urls?.sm_image || null,
          album_art_medium: song.lastfm_urls?.med_image || null,
          album_art_large: song.lastfm_urls?.large_image || null,
          album_art_enhanced: album_art_enhanced,
          correction_of: correction_of,
          is_superseded: false,
          raw_data: song,
          capture_source: 'cron',
        })

        console.log(`✅ Captured: ${song.artist} - ${song.track}`)
        newSongs++
      } catch (error) {
        console.error(`❌ Error processing song ${song.id}:`, error)
        errors++
      }
    }

    const duration = Date.now() - startTime

    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      duration_ms: duration,
      stats: {
        total: allSongs.length,
        new: newSongs,
        skipped,
        corrections,
        errors,
      },
    }

    console.log('[Cron] Playlist capture complete:', result)
    return res.status(200).json(result)
  } catch (error) {
    console.error('[Cron] Fatal error:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    })
  }
}
