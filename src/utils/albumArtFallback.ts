// Album Art Fallback Utility
// Provides fallback chain for album art: Last.fm → iTunes → MusicBrainz → CMS Fallback Images → Bundled Fallback

import { createLogger } from './logger'

const log = createLogger('AlbumArtFallback')

// Debug flags for testing fallback chain
export const debugFlags = {
  forceLastFmFail: false,
  forceItunesFail: false,
  forceMusicBrainzFail: false,
}

/**
 * Tests if an image URL actually loads (prevents 404s)
 * Includes a 5-second timeout to prevent hanging
 */
export const testImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    const timeout = setTimeout(() => {
      img.src = '' // Cancel the load
      resolve(false)
    }, 5000) // 5 second timeout

    img.onload = () => {
      clearTimeout(timeout)
      resolve(true)
    }
    img.onerror = () => {
      clearTimeout(timeout)
      resolve(false)
    }
    img.src = url
  })
}

/**
 * Normalizes text for comparison (lowercase, remove special chars, trim whitespace)
 */
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Checks if two strings are similar enough (fuzzy match)
 */
const isSimilarEnough = (str1: string, str2: string): boolean => {
  const norm1 = normalizeText(str1)
  const norm2 = normalizeText(str2)

  // Exact match
  if (norm1 === norm2) return true

  // One contains the other
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true

  return false
}

/**
 * Tries to get album art from iTunes API
 * NOTE: iTunes API may redirect to musics:// protocol (Apple Music app scheme)
 * which causes CORS errors in browsers. These are expected and handled gracefully.
 */
export const tryItunesAlbumArt = async (artist: string, album: string): Promise<string | null> => {
  try {
    const searchTerm = encodeURIComponent(`${artist} ${album}`)
    const itunesUrl = `https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&limit=3`

    log.log('Trying iTunes API:', { artist, album })
    const response = await fetch(itunesUrl)
    const data = await response.json()

    if (data.results && data.results.length > 0) {
      // Find the best match by comparing artist and album names
      for (const result of data.results) {
        if (!result.artworkUrl100) continue

        const resultArtist = result.artistName || ''
        const resultAlbum = result.collectionName || ''

        // Validate that artist and album names are similar
        const artistMatches = isSimilarEnough(artist, resultArtist)
        const albumMatches = isSimilarEnough(album, resultAlbum)

        if (artistMatches && albumMatches) {
          // Upgrade to higher quality (600x600)
          const artUrl = result.artworkUrl100.replace('100x100', '600x600')

          // Validate the URL actually loads
          const isValid = await testImageUrl(artUrl)
          if (isValid) {
            log.log('✓ iTunes art found and validated:', {
              artist: resultArtist,
              album: resultAlbum,
              url: artUrl,
            })
            return artUrl
          } else {
            log.log('✗ iTunes art URL failed to load')
          }
        } else {
          log.log("✗ iTunes result skipped (names don't match):", {
            expected: { artist, album },
            got: { artist: resultArtist, album: resultAlbum },
          })
        }
      }
    }

    return null
  } catch (error) {
    // Suppress CORS errors from iTunes redirect to musics:// protocol - these are expected
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (!errorMessage.includes('CORS') && !errorMessage.includes('Failed to fetch')) {
      log.log('✗ iTunes API error:', error)
    }
    return null
  }
}

/**
 * Tries to get album art from MusicBrainz + Cover Art Archive
 */
export const tryMusicBrainzAlbumArt = async (
  artist: string,
  album: string
): Promise<string | null> => {
  try {
    const searchTerm = encodeURIComponent(`${artist} ${album}`)
    const mbUrl = `https://musicbrainz.org/ws/2/release/?query=${searchTerm}&fmt=json&limit=3`

    log.log('Trying MusicBrainz API:', { artist, album })
    const response = await fetch(mbUrl)
    const data = await response.json()

    if (data.releases && data.releases.length > 0) {
      // Find the best match by comparing artist and album names
      for (const release of data.releases) {
        const releaseTitle = release.title || ''
        const releaseArtist = release['artist-credit']?.[0]?.name || ''

        // Validate that artist and album names are similar
        const artistMatches = isSimilarEnough(artist, releaseArtist)
        const albumMatches = isSimilarEnough(album, releaseTitle)

        if (artistMatches && albumMatches) {
          const releaseId = release.id
          const coverArtUrl = `https://coverartarchive.org/release/${releaseId}/front`

          // Validate the URL actually loads
          const isValid = await testImageUrl(coverArtUrl)
          if (isValid) {
            log.log('✓ MusicBrainz art found and validated:', {
              artist: releaseArtist,
              album: releaseTitle,
              url: coverArtUrl,
            })
            return coverArtUrl
          } else {
            log.log('✗ MusicBrainz art URL failed to load')
          }
        } else {
          log.log("✗ MusicBrainz result skipped (names don't match):", {
            expected: { artist, album },
            got: { artist: releaseArtist, album: releaseTitle },
          })
        }
      }
    }

    return null
  } catch (error) {
    log.log('✗ MusicBrainz API error:', error)
    return null
  }
}

/**
 * Better hash function with improved distribution (DJB2 algorithm)
 */
const hashString = (str: string): number => {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return Math.abs(hash >>> 0) // Unsigned 32-bit integer
}

/**
 * Gets a fallback image deterministically based on artist and album
 * This ensures AlbumArt and BackgroundImage use the same fallback for the same track
 */
export const getRandomFallback = (
  fallbackImages: string[],
  _lastUsedIndex: number = -1,
  artist: string = '',
  album: string = ''
): { url: string; index: number } => {
  // If no artist/album provided or only 1 image available, select from full array
  if ((!artist && !album) || fallbackImages.length <= 1) {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length)
    log.log('🎲 Random fallback (no seed):', { index: randomIndex, total: fallbackImages.length })
    return {
      url: fallbackImages[randomIndex],
      index: randomIndex,
    }
  }

  // Use artist + album to deterministically select an image
  // This ensures AlbumArt and BackgroundImage get the same fallback
  const seed = hashString(`${artist}|${album}`)
  const index = seed % fallbackImages.length
  const selectedImage = fallbackImages[index]

  log.log('🎲 Deterministic fallback:', {
    artist,
    album,
    seed,
    index,
    total: fallbackImages.length,
    selected: selectedImage.substring(selectedImage.lastIndexOf('/') + 1),
    allImages: fallbackImages.map((url) => url.substring(url.lastIndexOf('/') + 1)),
  })

  return {
    url: selectedImage,
    index: index,
  }
}

/**
 * Upgrades Last.fm image URLs to higher quality for mobile platforms
 * Replaces size in URL path (e.g., /i/u/174s/ → /i/u/480x480/)
 */
export const upgradeLastFmQuality = (url: string, isMobile: boolean = false): string => {
  if (!isMobile || !url.includes('lastfm.freetls.fastly.net')) {
    return url
  }

  // Replace any size pattern with 480x480 for mobile
  return url.replace(/\/i\/u\/[^/]+\//, '/i/u/480x480/')
}

/**
 * Main fallback chain orchestrator
 * Returns the first valid image URL or a random fallback
 */
export interface AlbumArtFallbackResult {
  url: string
  source: 'lastfm' | 'itunes' | 'musicbrainz' | 'fallback' | 'bundled-fallback'
  fallbackIndex?: number
}

export const resolveAlbumArt = async (
  lastFmUrl: string | null | undefined,
  artist: string,
  album: string,
  fallbackImages: string[],
  lastFallbackIndex: number = -1,
  isMobile: boolean = false
): Promise<AlbumArtFallbackResult> => {
  // Step 1: Try Last.fm URL if provided (trust Last.fm URLs without validation)
  if (lastFmUrl && lastFmUrl.trim() !== '' && !debugFlags.forceLastFmFail) {
    const upgradedUrl = upgradeLastFmQuality(lastFmUrl, isMobile)
    log.log('Using Last.fm URL:', upgradedUrl)
    // Trust Last.fm URLs without validation to avoid timeout/CORS issues
    return { url: upgradedUrl, source: 'lastfm' }
  } else if (debugFlags.forceLastFmFail && lastFmUrl) {
    log.log('⚠️ DEBUG: Forcing Last.fm to fail')
  }

  // Only try iTunes/MusicBrainz if we have both artist and album info
  if (artist && album) {
    // Step 2: Try iTunes
    if (!debugFlags.forceItunesFail) {
      log.log('Trying iTunes fallback...')
      const itunesUrl = await tryItunesAlbumArt(artist, album)
      if (itunesUrl) {
        return { url: itunesUrl, source: 'itunes' }
      }
    } else {
      log.log('⚠️ DEBUG: Forcing iTunes to fail')
    }

    // Step 3: Try MusicBrainz
    if (!debugFlags.forceMusicBrainzFail) {
      log.log('Trying MusicBrainz fallback...')
      const musicBrainzUrl = await tryMusicBrainzAlbumArt(artist, album)
      if (musicBrainzUrl) {
        return { url: musicBrainzUrl, source: 'musicbrainz' }
      }
    } else {
      log.log('⚠️ DEBUG: Forcing MusicBrainz to fail')
    }
  }

  // Step 4: Use CMS fallback image if available
  if (fallbackImages.length > 0) {
    log.log('All services failed, using deterministic CMS fallback image')
    const fallback = getRandomFallback(fallbackImages, lastFallbackIndex, artist, album)
    return { url: fallback.url, source: 'fallback', fallbackIndex: fallback.index }
  }

  // Step 5: Use bundled fallback image as absolute last resort
  log.log('All services failed, using bundled fallback image')
  return { url: '/images/album-art-fallback.png', source: 'bundled-fallback', fallbackIndex: -1 }
}
