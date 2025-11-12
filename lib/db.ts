// Database connection utility for Vercel Postgres
import { sql } from '@vercel/postgres'

export interface PlaylistEntry {
  id?: number
  chirp_id: string
  artist: string
  track: string
  release?: string | null
  label?: string | null
  dj_name?: string | null
  notes?: string | null
  played_at_gmt: Date
  played_at_gmt_ts: number
  played_at_local: Date
  played_at_local_ts: number
  artist_is_local: boolean
  album_art_small?: string | null
  album_art_medium?: string | null
  album_art_large?: string | null
  album_art_enhanced?: string | null
  correction_of?: number | null
  is_superseded: boolean
  raw_data: any
  captured_at?: Date
  updated_at?: Date
}

/**
 * Insert a single playlist entry into the database
 * Uses ON CONFLICT to handle duplicates gracefully
 */
export async function insertPlaylistEntry(
  entry: Omit<PlaylistEntry, 'id' | 'captured_at' | 'updated_at'>
) {
  try {
    const result = await sql`
      INSERT INTO playlist_history (
        chirp_id, artist, track, release, label, dj_name, notes,
        played_at_gmt, played_at_gmt_ts, played_at_local, played_at_local_ts,
        artist_is_local, album_art_small, album_art_medium, album_art_large,
        album_art_enhanced, correction_of, is_superseded, raw_data
      ) VALUES (
        ${entry.chirp_id}, ${entry.artist}, ${entry.track}, ${entry.release}, ${entry.label},
        ${entry.dj_name}, ${entry.notes}, ${entry.played_at_gmt}, ${entry.played_at_gmt_ts},
        ${entry.played_at_local}, ${entry.played_at_local_ts}, ${entry.artist_is_local},
        ${entry.album_art_small}, ${entry.album_art_medium}, ${entry.album_art_large},
        ${entry.album_art_enhanced}, ${entry.correction_of}, ${entry.is_superseded},
        ${JSON.stringify(entry.raw_data)}::jsonb
      )
      ON CONFLICT (chirp_id) DO NOTHING
      RETURNING id
    `
    return result.rows[0]
  } catch (error) {
    console.error('[db] Error inserting playlist entry:', error)
    throw error
  }
}

/**
 * Check if a playlist entry already exists by chirp_id
 */
export async function playlistEntryExists(chirp_id: string): Promise<boolean> {
  try {
    const result = await sql`
      SELECT id FROM playlist_history WHERE chirp_id = ${chirp_id} LIMIT 1
    `
    return result.rows.length > 0
  } catch (error) {
    console.error('[db] Error checking playlist entry existence:', error)
    throw error
  }
}

/**
 * Find potential corrections for a song within a time window
 * Returns entries with same/similar artist and track within 5 minutes
 */
export async function findPotentialCorrections(
  artist: string,
  track: string,
  played_at_gmt: Date,
  chirp_id: string
): Promise<PlaylistEntry[]> {
  try {
    const fiveMinutesAgo = new Date(played_at_gmt.getTime() - 5 * 60 * 1000)
    const fiveMinutesLater = new Date(played_at_gmt.getTime() + 5 * 60 * 1000)

    const result = await sql<PlaylistEntry>`
      SELECT * FROM playlist_history
      WHERE chirp_id != ${chirp_id}
        AND played_at_gmt BETWEEN ${fiveMinutesAgo.toISOString()} AND ${fiveMinutesLater.toISOString()}
        AND (
          (LOWER(artist) = LOWER(${artist}) AND LOWER(track) = LOWER(${track}))
          OR (similarity(artist, ${artist}) > 0.7 AND similarity(track, ${track}) > 0.7)
        )
      ORDER BY played_at_gmt ASC
    `
    return result.rows
  } catch (error) {
    console.error('[db] Error finding potential corrections:', error)
    return []
  }
}

/**
 * Mark a playlist entry as superseded
 */
export async function markAsSuperseded(id: number): Promise<void> {
  try {
    await sql`
      UPDATE playlist_history
      SET is_superseded = true, updated_at = NOW()
      WHERE id = ${id}
    `
  } catch (error) {
    console.error('[db] Error marking entry as superseded:', error)
    throw error
  }
}

/**
 * Get playlist history within a date range
 */
export async function getPlaylistHistory(
  startDate: Date,
  endDate: Date,
  limit: number = 100
): Promise<PlaylistEntry[]> {
  try {
    const result = await sql<PlaylistEntry>`
      SELECT * FROM playlist_history
      WHERE played_at_gmt BETWEEN ${startDate.toISOString()} AND ${endDate.toISOString()}
        AND is_superseded = false
      ORDER BY played_at_gmt DESC
      LIMIT ${limit}
    `
    return result.rows
  } catch (error) {
    console.error('[db] Error getting playlist history:', error)
    throw error
  }
}

/**
 * Get cached album art for artist+album combination
 * Returns the most recent album_art_enhanced URL if we've seen this before
 */
export async function getCachedAlbumArt(
  artist: string,
  album: string | null | undefined
): Promise<string | null> {
  try {
    // Only cache if we have both artist and album
    if (!artist || !album) return null

    const result = await sql`
      SELECT album_art_enhanced FROM playlist_history
      WHERE LOWER(artist) = LOWER(${artist})
        AND LOWER(release) = LOWER(${album})
        AND album_art_enhanced IS NOT NULL
        AND is_superseded = false
      ORDER BY captured_at DESC
      LIMIT 1
    `

    if (result.rows.length > 0) {
      return result.rows[0].album_art_enhanced
    }

    return null
  } catch (error) {
    console.error('[db] Error getting cached album art:', error)
    return null
  }
}

/**
 * Initialize the database schema (run this once on first deploy)
 */
export async function initializeDatabase() {
  try {
    // Read and execute the schema.sql file
    // This should be run manually via Vercel Postgres dashboard or CLI
    console.log('[db] Database should be initialized using the schema.sql file')
  } catch (error) {
    console.error('[db] Error initializing database:', error)
    throw error
  }
}
