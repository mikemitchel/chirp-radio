// Album Art Stability Stress Test
// This test simulates rapid track changes and monitors album art stability

import { createLogger } from './logger'

const log = createLogger('AlbumArtStressTest')

interface TestResult {
  totalRuns: number
  trackChanges: number
  albumArtFlips: number
  cacheErrors: number
  placeholderLeaks: number
  emptySourceErrors: number
  issues: string[]
}

export const runAlbumArtStressTest = async (
  trackCount: number = 100,
  intervalMs: number = 100
): Promise<TestResult> => {
  log.log(`🧪 Starting album art stress test...`)
  log.log(`   ${trackCount} track changes at ${intervalMs}ms intervals`)
  log.log(`   Total duration: ~${(trackCount * intervalMs) / 1000}s`)

  const result: TestResult = {
    totalRuns: 0,
    trackChanges: 0,
    albumArtFlips: 0,
    cacheErrors: 0,
    placeholderLeaks: 0,
    emptySourceErrors: 0,
    issues: [],
  }

  // Real album art URLs from various sources
  const testTracks = [
    {
      artist: 'The Beatles',
      track: 'Here Comes The Sun',
      album: 'Abbey Road',
      albumArt: 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png',
    },
    {
      artist: 'Pink Floyd',
      track: 'Time',
      album: 'The Dark Side of the Moon',
      albumArt: 'https://lastfm.freetls.fastly.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb.png',
    },
    {
      artist: 'Radiohead',
      track: 'Karma Police',
      album: 'OK Computer',
      albumArt: 'https://lastfm.freetls.fastly.net/i/u/174s/8b9b3f2f4c674f84b2d68b0aef0e5c8d.png',
    },
    {
      artist: 'Unknown Artist',
      track: 'No Album Art Track',
      album: 'Unknown Album',
      albumArt: '', // No album art
    },
    {
      artist: 'Fleetwood Mac',
      track: 'Dreams',
      album: 'Rumours',
      albumArt: 'https://lastfm.freetls.fastly.net/i/u/174s/3b5f4c1e1e3e4a84b1d38b2aef1e6c9d.png',
    },
  ]

  let lastVisibleAlbumArt = ''
  let previousAlbumArt = ''

  // Check cache state
  const checkCache = (iteration: number): boolean => {
    try {
      const cache = sessionStorage.getItem('chirp-album-art-cache')

      // Cache can be null initially - that's okay for first few iterations
      if (!cache) {
        if (iteration > 5) {
          result.cacheErrors++
          result.issues.push(`Iteration ${iteration}: Cache still null after ${iteration} changes`)
          return false
        }
        return true
      }

      const parsed = JSON.parse(cache)

      // Check for placeholder data
      if (parsed.trackId?.includes('Artist Name') || parsed.trackId?.includes('Song Name')) {
        result.placeholderLeaks++
        result.issues.push(`Iteration ${iteration}: Placeholder data detected: ${parsed.trackId}`)
        return false
      }

      // Check for empty sources when marked as loaded
      if (!parsed.frontSrc && !parsed.backSrc && parsed.hasLoadedFirstImage) {
        result.emptySourceErrors++
        result.issues.push(`Iteration ${iteration}: No image sources but marked as loaded`)
        return false
      }

      // Check for album art flipping back
      const currentVisible = parsed.frontIsVisible ? parsed.frontSrc : parsed.backSrc
      if (
        currentVisible &&
        currentVisible === previousAlbumArt &&
        currentVisible !== lastVisibleAlbumArt
      ) {
        result.albumArtFlips++
        result.issues.push(
          `Iteration ${iteration}: Album art flipped back to previous: ${currentVisible.substring(0, 50)}...`
        )
        return false
      }

      if (currentVisible) {
        previousAlbumArt = lastVisibleAlbumArt
        lastVisibleAlbumArt = currentVisible
      }

      return true
    } catch (e) {
      result.cacheErrors++
      result.issues.push(`Iteration ${iteration}: Cache parse error - ${e}`)
      return false
    }
  }

  // Simulate track changes
  for (let i = 0; i < trackCount; i++) {
    result.totalRuns++
    result.trackChanges++

    const track = testTracks[i % testTracks.length]

    // Update now playing cache (simulates API response)
    const trackData = {
      dj: 'Test DJ',
      show: 'Test Show',
      artist: track.artist,
      track: track.track,
      album: track.album,
      label: 'Test Label',
      albumArt: track.albumArt,
      isLocal: false,
      timestamp: Date.now(),
    }

    sessionStorage.setItem('chirp-now-playing', JSON.stringify(trackData))
    window.dispatchEvent(new CustomEvent('chirp-force-refresh'))

    // Check cache state
    checkCache(i)

    // Wait for interval
    await new Promise((resolve) => setTimeout(resolve, intervalMs))
  }

  // Final summary
  log.log('✅ Stress test complete!')
  log.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  log.log(`Total track changes: ${result.trackChanges}`)
  log.log(`Album art flips: ${result.albumArtFlips}`)
  log.log(`Cache errors: ${result.cacheErrors}`)
  log.log(`Placeholder leaks: ${result.placeholderLeaks}`)
  log.log(`Empty source errors: ${result.emptySourceErrors}`)

  const totalIssues =
    result.albumArtFlips + result.cacheErrors + result.placeholderLeaks + result.emptySourceErrors
  const successRate = ((result.totalRuns - totalIssues) / result.totalRuns) * 100

  log.log(`Success rate: ${successRate.toFixed(2)}%`)

  if (result.issues.length > 0) {
    log.log('⚠️ Issues detected:')
    // Show first 10 issues
    result.issues.slice(0, 10).forEach((issue) => log.log(`  - ${issue}`))
    if (result.issues.length > 10) {
      log.log(`  ... and ${result.issues.length - 10} more`)
    }
  } else {
    log.log('🎉 No issues detected!')
  }

  return result
}

// Expose to window for console access
if (typeof window !== 'undefined') {
  ;(window as any).runAlbumArtStressTest = runAlbumArtStressTest
}
