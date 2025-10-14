// src/contexts/AudioPlayerContext.tsx
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { upgradeImageQuality } from '../utils/imageOptimizer'
import { useNetworkQuality } from '../hooks/useNetworkQuality'
import { addToCollection, removeFromCollection, isInCollection } from '../utils/collectionDB'
import { addRecentlyPlayed, updateRecentlyPlayedAlbumArt } from '../utils/recentlyPlayedDB'
import { useAuth } from '../hooks/useAuth'
import LoginRequiredModal from '../components/LoginRequiredModal'
import { createLogger } from '../utils/logger'

const log = createLogger('AudioPlayerContext')

interface TrackData {
  dj: string
  show: string
  artist: string
  track: string
  album: string
  label: string
  albumArt: string
  isLocal: boolean
  playedAtGmt?: string
  detailsUpdatedAt?: string
}

interface AudioPlayerContextType {
  isPlaying: boolean
  isLoading: boolean
  currentData: TrackData
  isTrackAdded: boolean
  play: () => Promise<void>
  pause: () => void
  togglePlayPause: () => void
  toggleAddTrack: () => void
  setCurrentData: (data: TrackData) => void
  setIsLoading: (loading: boolean) => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

interface AudioPlayerProviderProps {
  children: ReactNode
  streamUrl?: string
  autoFetch?: boolean
  apiUrl?: string
}

export function AudioPlayerProvider({
  children,
  streamUrl: defaultStreamUrl,
  autoFetch = false,
  apiUrl = 'https://chirpradio.appspot.com/api/current_playlist',
}: AudioPlayerProviderProps) {
  // Monitor network quality for adaptive image loading
  const networkInfo = useNetworkQuality()

  // Get stream URL based on quality setting
  const getStreamUrl = () => {
    // Check both localStorage (logged in) and sessionStorage (logged out)
    const quality =
      localStorage.getItem('chirp-streaming-quality') ||
      sessionStorage.getItem('chirp-streaming-quality') ||
      '128'
    if (quality === '64') {
      return 'https://peridot.streamguys1.com:5180/live-64kb'
    }
    return defaultStreamUrl || 'https://peridot.streamguys1.com:5185/live'
  }

  const [streamUrl, setStreamUrl] = useState(getStreamUrl())

  // Listen for streaming quality changes

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chirp-streaming-quality') {
        const newUrl = getStreamUrl()
        if (newUrl !== streamUrl) {
          log.log('Stream URL changed to:', newUrl)
          setStreamUrl(newUrl)
        }
      }
    }

    const handleQualityChange = () => {
      const newUrl = getStreamUrl()
      if (newUrl !== streamUrl) {
        log.log('Stream URL changed to:', newUrl)
        setStreamUrl(newUrl)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('chirp-quality-change', handleQualityChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('chirp-quality-change', handleQualityChange)
    }
  }, [streamUrl])

  // Check for cached data
  const getCachedData = (): TrackData | null => {
    if (autoFetch) {
      const cached = sessionStorage.getItem('chirp-now-playing')
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached)
          if (Date.now() - parsedCache.timestamp < 30000) {
            return parsedCache
          }
        } catch (e) {
          console.error('Error parsing cached data:', e)
        }
      }
    }
    return null
  }

  const cachedData = getCachedData()
  const initialData: TrackData = cachedData || {
    dj: 'DJ Current',
    show: 'Current Show',
    artist: 'Artist Name',
    track: 'Song Name',
    album: 'Album Name',
    label: 'Label Name',
    albumArt: '',
    isLocal: false,
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(autoFetch && !cachedData)
  const [currentData, setCurrentData] = useState<TrackData>(initialData)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const { isLoggedIn, login, signup } = useAuth()
  const [isTrackAdded, setIsTrackAdded] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const lastSongRef = useRef(
    cachedData ? `${cachedData.artist} - ${cachedData.track}`.toLowerCase().trim() : ''
  )
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const consecutiveNoChangeRef = useRef(0)
  const hasDetectedSongChangeRef = useRef(false) // Track if we've seen at least one song change
  const lastUpdateTimeRef = useRef<Date>(new Date()) // Track when we last updated
  const albumArtRetryCountRef = useRef(0) // Track how many times we've retried for album art
  const lastAlbumArtUrlRef = useRef(cachedData?.albumArt || '') // Track the last album art URL we set

  // Initialize audio element once

  useEffect(() => {
    const wasPlaying = isPlaying
    const audio = new Audio(streamUrl)
    audio.autoplay = false
    audio.loop = true
    audio.volume = 1.0
    audio.setAttribute('playsinline', 'true')

    // Android-specific audio configuration
    const isAndroid = Capacitor.getPlatform() === 'android'
    log.log('Platform:', Capacitor.getPlatform())
    log.log('Initial volume:', audio.volume)

    if (isAndroid) {
      // Android WebView sometimes needs explicit volume setting after a delay
      setTimeout(() => {
        audio.volume = 1.0
        log.log('Android volume set to:', audio.volume)
      }, 100)
    }

    audioRef.current = audio

    // If audio was playing before stream change, restart it
    if (wasPlaying) {
      audio.play().catch((err) => {
        console.error('Error restarting audio after stream change:', err)
        setIsPlaying(false)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [streamUrl])

  // Track if we detected the song at its start (within first 10 seconds)
  const caughtSongAtStartRef = useRef(false)

  // Calculate next poll delay based on when the song started
  // Poll every 5 seconds for maximum responsiveness
  const getNextPollDelay = (): number => {
    return 5000 // Poll every 5 seconds
  }

  const isFetchingRef = useRef(false)

  // Fetch now playing data
  const fetchNowPlaying = async () => {
    if (!autoFetch) return
    if (isFetchingRef.current) {
      return
    }
    isFetchingRef.current = true

    // Check if we're in simulation mode
    const simulationMode = sessionStorage.getItem('chirp-simulation-mode') === 'true'
    if (simulationMode) {
      // In simulation mode, read directly from sessionStorage without timestamp check
      const cached = sessionStorage.getItem('chirp-now-playing')
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached)
          setCurrentData(parsedCache)
          setIsLoading(false)
          isFetchingRef.current = false
          return
        } catch (e) {
          console.error('Error parsing simulation data:', e)
        }
      }
    }

    // Use proxy with aggressive cache busting
    // For Capacitor (native apps), use full URL since proxy isn't available
    // For web, use proxy path to avoid CORS issues
    const timestamp = Date.now()
    const random = Math.random()
    const isNative = Capacitor.isNativePlatform()
    const baseUrl = isNative ? 'https://chirpradio.appspot.com' : ''
    const fetchUrl = `${baseUrl}/api/current_playlist?_t=${timestamp}&_r=${random}`

    log.log('Fetching now playing...')
    log.log('isNative:', isNative)
    log.log('fetchUrl:', fetchUrl)

    let songStartedMs: number | null = null // Track song start time for scheduling

    try {
      const response = await fetch(fetchUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      log.log('Response status:', response.status)
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const parsedData = await response.json()

      if (!parsedData || !parsedData.now_playing) throw new Error('Invalid API response')

      const nowPlaying = parsedData.now_playing
      songStartedMs = nowPlaying.played_at_gmt_ts * 1000 // Save for scheduling later
      const artist = nowPlaying.artist?.trim() || 'Unknown Artist'
      const track = nowPlaying.track?.trim() || 'Unknown Track'
      const dj = nowPlaying.dj?.trim() || 'Unknown DJ'
      const show = nowPlaying.show?.trim() || ''
      const label = nowPlaying.label?.trim() || 'Unknown Label'
      const album = nowPlaying.release?.trim() || 'Unknown Release'
      const isLocal = nowPlaying.artist_is_local || false
      const playedAtGmt = nowPlaying.played_at_gmt || ''
      const detailsUpdatedAt = new Date().toISOString()

      log.log('Parsed track data:', { artist, track, dj, show })

      // Map network quality to image quality
      const getImageQuality = (): 'low' | 'medium' | 'high' => {
        switch (networkInfo.quality) {
          case 'low':
          case 'offline':
            return 'low' // 174x174 for slow connections
          case 'medium':
            return 'medium' // 300x300 for moderate connections
          case 'high':
          default:
            return 'high' // 348x348 for fast connections
        }
      }

      const imageQuality = getImageQuality()

      // Collect all available image URLs and upgrade based on network quality
      const rawUrls = [
        nowPlaying.lastfm_urls?.large_image,
        nowPlaying.lastfm_urls?.med_image,
        nowPlaying.lastfm_urls?.sm_image,
      ]

      const imageUrls = rawUrls
        .filter((url) => url && url.trim() !== '' && url !== 'none' && url !== 'null')
        .map((url) => upgradeImageQuality(url, imageQuality)) // Adaptive quality based on network

      const currentSong = `${artist} - ${track}`.toLowerCase().trim()
      const isSameSong = currentSong === lastSongRef.current

      // Check if album art just appeared for the same song
      // Use ref instead of state to avoid async state update issues
      const stripTimestampForComparison = (url: string) => url.split('?')[0]
      const currentArtUrlFromRef = stripTimestampForComparison(lastAlbumArtUrlRef.current)
      const newArtUrlFromApi = imageUrls.length > 0 ? stripTimestampForComparison(imageUrls[0]) : ''
      const albumArtJustAppeared =
        isSameSong && currentArtUrlFromRef === '' && newArtUrlFromApi !== ''

      // Check if we're in retry mode (same song, no art yet, retries remaining)
      const isRetryingAlbumArt =
        isSameSong &&
        !currentArtUrlFromRef &&
        albumArtRetryCountRef.current > 0 &&
        albumArtRetryCountRef.current < 5

      if (currentSong !== lastSongRef.current || albumArtJustAppeared || isRetryingAlbumArt) {
        // Reset counter only for actual song changes
        if (!isSameSong) {
          consecutiveNoChangeRef.current = 0
          hasDetectedSongChangeRef.current = true
          albumArtRetryCountRef.current = 0 // Reset retry count for new song
          lastAlbumArtUrlRef.current = '' // Reset album art tracking for new song
        }

        // Get the best available image URL (upgraded quality)
        // Don't preload - let the browser handle loading naturally to avoid delays
        let albumArtUrl = ''
        if (imageUrls.length > 0) {
          // Only add timestamp for NEW songs to bust cache, not on retries for same song
          // This prevents unnecessary image reloads when polling
          if (!isSameSong) {
            albumArtUrl = `${imageUrls[0]}?t=${Date.now()}`
          } else {
            // Same song, album art just appeared - no need for timestamp
            albumArtUrl = imageUrls[0]
          }
        } else if (
          isSameSong &&
          albumArtRetryCountRef.current > 0 &&
          albumArtRetryCountRef.current < 5
        ) {
          // During retries for the same song, keep showing the old album art (from previous song)
          // Don't switch to empty until we've exhausted all retries
          albumArtUrl = currentData.albumArt
        }

        const newData: TrackData = {
          dj,
          show,
          artist,
          track,
          album,
          label,
          albumArt: albumArtUrl, // Keep old art during retries, empty after retries exhausted
          isLocal,
          playedAtGmt,
          detailsUpdatedAt,
        }

        // Calculate detection delay using GMT timestamp (most reliable)
        let detectionDelaySec = 0

        if (nowPlaying.played_at_gmt_ts) {
          // Unix timestamp is in seconds, convert to milliseconds
          // Both timestamps are in UTC/GMT, so direct comparison works
          const playedAtMs = nowPlaying.played_at_gmt_ts * 1000
          const nowMs = Date.now() // Current time in UTC milliseconds
          detectionDelaySec = Math.round((nowMs - playedAtMs) / 1000)
        }

        // Check if we caught this song at its start (within first 10 seconds)
        if (!isSameSong && detectionDelaySec <= 10) {
          caughtSongAtStartRef.current = true
        } else if (!isSameSong) {
          caughtSongAtStartRef.current = false
        }

        // Only update state if data actually changed
        // Compare album art URLs without timestamps to avoid unnecessary rerenders
        const stripTimestamp = (url: string) => url.split('?')[0]
        const currentArtUrl = stripTimestamp(currentData.albumArt || '')
        const newArtUrl = stripTimestamp(albumArtUrl)

        const dataChanged =
          currentData.artist !== artist ||
          currentData.track !== track ||
          currentData.dj !== dj ||
          currentData.show !== show ||
          currentData.album !== album ||
          currentData.label !== label ||
          currentData.isLocal !== isLocal ||
          currentArtUrl !== newArtUrl

        if (dataChanged) {
          setCurrentData(newData)
          setIsLoading(false)
          // Update ref to track album art URL (prevents repeated updates)
          lastAlbumArtUrlRef.current = albumArtUrl

          // Track new song in recently played (only when song actually changes, not just metadata updates)
          if (!isSameSong) {
            addRecentlyPlayed({
              id: `${Date.now()}-${artist}-${track}`.replace(/\s+/g, '-').toLowerCase(),
              artistName: artist,
              trackName: track,
              albumName: album,
              labelName: label,
              albumArt: albumArtUrl || '/src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg',
              isLocal,
              djName: dj,
              showName: show,
            })
          } else if (albumArtJustAppeared && albumArtUrl) {
            // Album art loaded for existing track - update Recently Played
            updateRecentlyPlayedAlbumArt(artist, track, albumArtUrl)
          }
        }

        lastSongRef.current = currentSong
        lastUpdateTimeRef.current = new Date()

        // If no album art, retry up to 5 times quickly (200ms each = 1s total)
        // This gives the backend time to fetch from Last.fm
        // The API may return null initially and then update with actual URLs later
        const shouldRetry =
          !albumArtUrl &&
          autoFetch &&
          pollTimeoutRef.current !== null &&
          albumArtRetryCountRef.current < 5

        if (shouldRetry) {
          albumArtRetryCountRef.current += 1
          const retryDelay = 200 // 200ms between retries

          if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current)
          pollTimeoutRef.current = setTimeout(() => {
            isFetchingRef.current = false // Reset flag before retry
            fetchNowPlaying()
          }, retryDelay)
          return // Skip the normal scheduling at the end
        }

        sessionStorage.setItem(
          'chirp-now-playing',
          JSON.stringify({
            ...newData,
            timestamp: Date.now(),
          })
        )
      } else {
        // No change - increment counter for progressive polling
        consecutiveNoChangeRef.current += 1
      }
    } catch (error) {
      console.error('Error fetching now playing data:', error)
      setIsLoading(false)
    }

    // Schedule next poll based on when this song started
    if (autoFetch && pollTimeoutRef.current !== null && songStartedMs !== null) {
      const nextDelay = getNextPollDelay()
      pollTimeoutRef.current = setTimeout(() => {
        isFetchingRef.current = false // Reset flag right before next fetch
        fetchNowPlaying()
      }, nextDelay)
    } else {
      isFetchingRef.current = false // Reset if not scheduling another poll
    }
  }

  // Auto-fetch effect with dynamic polling

  useEffect(() => {
    if (autoFetch) {
      // Initialize polling (set ref to a non-null value to enable scheduling)
      pollTimeoutRef.current = setTimeout(() => {}, 0)
      fetchNowPlaying()

      return () => {
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current)
          pollTimeoutRef.current = null
        }
      }
    }
  }, [autoFetch, apiUrl])

  // Listen for forced refresh (for devTools simulation)

  useEffect(() => {
    const handleForceRefresh = () => {
      if (autoFetch) {
        isFetchingRef.current = false // Reset flag to allow immediate fetch
        fetchNowPlaying()
      }
    }

    window.addEventListener('chirp-force-refresh', handleForceRefresh)
    return () => window.removeEventListener('chirp-force-refresh', handleForceRefresh)
  }, [autoFetch])

  // Debug test functions

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Test 1: Load track with blue album art
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).test1 = () => {
        setCurrentData({
          artist: 'Test Artist 1',
          track: 'Blue Album',
          albumArt:
            'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.webp',
          dj: 'Test DJ',
          show: 'Test Show',
          album: 'Test Album 1',
          label: 'Test Label',
          isLocal: false,
        })
      }

      // Test 2: Load track with different album art
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).test2 = () => {
        setCurrentData({
          artist: 'Test Artist 2',
          track: 'Red Album',
          albumArt:
            'https://lastfm.freetls.fastly.net/i/u/300x300/5a31176389a59cda2a4ce90b414a65f7.webp',
          dj: 'Test DJ',
          show: 'Test Show',
          album: 'Test Album 2',
          label: 'Test Label',
          isLocal: false,
        })
      }

      // Test 3: Load track with no album art (should show fallback after 1s)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).test3 = () => {
        setCurrentData({
          artist: 'No Art Artist',
          track: 'No Album Art',
          albumArt: '',
          dj: 'Test DJ',
          show: 'Test Show',
          album: 'Test Album',
          label: 'Test Label',
          isLocal: false,
        })
      }

      // Test 4: Load track with null album art
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).test4 = () => {
        setCurrentData({
          artist: 'Null Art Artist',
          track: 'Null Album Art',
          albumArt: null,
          dj: 'Test DJ',
          show: 'Test Show',
          album: 'Test Album',
          label: 'Test Label',
          isLocal: false,
        })
      }

      // Test 5: Load track with 'none' string (simulates API returning 'none')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).test5 = () => {
        setCurrentData({
          artist: 'None String Artist',
          track: 'Album Art is None String',
          albumArt: 'none',
          dj: 'Test DJ',
          show: 'Test Show',
          album: 'Test Album',
          label: 'Test Label',
          isLocal: false,
        })
      }

      // Reset to API data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).testReset = () => {
        // Clear refs to force fresh fetch
        lastSongRef.current = ''
        lastAlbumArtUrlRef.current = ''
        albumArtRetryCountRef.current = 0
        isFetchingRef.current = false
        // Fetch now
        fetchNowPlaying()
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).test1
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).test2
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).test3
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).test4
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).test5
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).testReset
      }
    }
  }, [])

  const play = async () => {
    if (!audioRef.current) return
    try {
      log.log('Playing audio...')
      log.log('Audio volume before play:', audioRef.current.volume)
      log.log('Stream URL:', streamUrl)

      await audioRef.current.play()
      setIsPlaying(true)

      log.log('Audio playback started')
      log.log('Audio volume after play:', audioRef.current.volume)

      // Immediately fetch latest track info when resuming playback
      if (autoFetch) {
        fetchNowPlaying()
      }
    } catch (error) {
      log.error('Error playing audio:', error)
    }
  }

  const pause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const toggleAddTrack = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    const trackId = `${currentData.artist}-${currentData.track}`.replace(/\s+/g, '-').toLowerCase()

    if (isTrackAdded) {
      // Remove from collection
      const removed = removeFromCollection(trackId)
      if (removed) {
        // Dispatch toast event
        window.dispatchEvent(
          new CustomEvent('chirp-show-toast', {
            detail: {
              message: `Removed ${currentData.track} from your collection`,
              type: 'success',
              duration: 3000,
            },
          })
        )
      }
    } else {
      // Add to collection
      // Use CHIRP logo as fallback if no album art
      const albumArtUrl =
        currentData.albumArt || '/src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg'

      addToCollection({
        id: trackId,
        artistName: currentData.artist,
        trackName: currentData.track,
        albumName: currentData.album,
        labelName: currentData.label,
        albumArt: albumArtUrl,
        isLocal: currentData.isLocal,
      })
      // Dispatch toast event
      window.dispatchEvent(
        new CustomEvent('chirp-show-toast', {
          detail: {
            message: `Added ${currentData.track} to your collection`,
            type: 'success',
            duration: 3000,
          },
        })
      )
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = (email: string, _password: string) => {
    // TODO: Validate credentials with API
    login(email, email.split('@')[0]) // For demo, use email prefix as name
    setShowLoginModal(false)

    window.dispatchEvent(
      new CustomEvent('chirp-show-toast', {
        detail: {
          message: 'Successfully logged in!',
          type: 'success',
          duration: 3000,
        },
      })
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSignUp = (email: string, _password: string) => {
    // TODO: Create account with API
    signup(email, email.split('@')[0]) // For demo, use email prefix as name
    setShowLoginModal(false)

    window.dispatchEvent(
      new CustomEvent('chirp-show-toast', {
        detail: {
          message: 'Account created successfully!',
          type: 'success',
          duration: 3000,
        },
      })
    )
  }

  // Sync isTrackAdded with collection state
  useEffect(() => {
    const updateAddedStatus = () => {
      const inCollection = isInCollection(currentData.artist, currentData.track)
      setIsTrackAdded(inCollection)
    }

    // Initial check
    updateAddedStatus()

    // Listen for collection updates
    window.addEventListener('chirp-collection-updated', updateAddedStatus)
    return () => {
      window.removeEventListener('chirp-collection-updated', updateAddedStatus)
    }
  }, [currentData.artist, currentData.track])

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isLoading,
        currentData,
        isTrackAdded,
        play,
        pause,
        togglePlayPause,
        toggleAddTrack,
        setCurrentData,
        setIsLoading,
      }}
    >
      {children}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </AudioPlayerContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}
