// NowPlayingContext.tsx
// Handles now playing metadata fetching, polling, and album art management
// Separated from playback/collection concerns for better performance

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { CapacitorHttp } from '@capacitor/core'
import { App } from '@capacitor/app'
import { useNetworkQuality } from '../hooks/useNetworkQuality'
import { upgradeImageQuality } from '../utils/imageOptimizer'
import { parseDjAndShowName } from '../utils/djNameParser'
import { addRecentlyPlayed } from '../utils/recentlyPlayedDB'
import { on, emit } from '../utils/eventBus'
import { createLogger } from '../utils/logger'
import { resolveAlbumArt } from '../utils/albumArtFallback'
import { useCMS } from './CMSContext'
import NowPlayingPlugin from '../plugins/NowPlayingPlugin'
import NativeAudioPlayer from '../plugins/NativeAudioPlayer'
import mockCurrentPlaylist from '../data/currentPlaylist.json'

const log = createLogger('NowPlayingContext')
// Always use real API - CORS errors in web dev are harmless console warnings
const USE_MOCK_DATA = false

export interface TrackData {
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

interface NowPlayingContextType {
  currentData: TrackData
  isLoading: boolean
  setCurrentData: (data: TrackData) => void
  setIsLoading: (loading: boolean) => void
}

const NowPlayingContext = createContext<NowPlayingContextType | undefined>(undefined)

interface NowPlayingProviderProps {
  children: ReactNode
  autoFetch?: boolean
  apiUrl?: string
  isPlayingProp?: boolean
}

export function NowPlayingProvider({
  children,
  autoFetch = false,
  apiUrl = import.meta.env.DEV
    ? '/api/current_playlist' // Use Vite proxy in dev to avoid CORS
    : 'https://chirpradio.appspot.com/api/current_playlist', // Direct in production/native
  isPlayingProp = false,
}: NowPlayingProviderProps) {
  const networkInfo = useNetworkQuality()
  const isPlaying = isPlayingProp
  const { data: cmsData } = useCMS()

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

  log.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  log.log('🏁 [NowPlayingContext] Component MOUNTING')
  log.log('   autoFetch:', autoFetch)
  log.log('   hasCache:', !!cachedData)
  log.log('   Platform:', Capacitor.getPlatform())
  if (cachedData) {
    log.log('   Cached Artist:', initialData.artist)
    log.log('   Cached Track:', initialData.track)
    log.log('   Cached Album Art:', initialData.albumArt ? 'HAS URL' : 'EMPTY')
  } else {
    log.log('   Using placeholder data')
  }
  log.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  const [currentData, setCurrentData] = useState<TrackData>(initialData)
  const [isLoading, setIsLoading] = useState(autoFetch && !cachedData)

  log.log('📊 [NowPlayingContext] State initialized:', {
    currentData: {
      artist: currentData.artist,
      track: currentData.track,
    },
    isLoading,
  })

  const lastSongRef = useRef(
    cachedData ? `${cachedData.artist} - ${cachedData.track}`.toLowerCase().trim() : ''
  )
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const consecutiveNoChangeRef = useRef(0)
  const hasDetectedSongChangeRef = useRef(false)
  const lastUpdateTimeRef = useRef<Date>(new Date())
  const albumArtRetryCountRef = useRef(0)
  const lastAlbumArtUrlRef = useRef(cachedData?.albumArt || '')
  // Mark as resolved if cached data has album art to prevent unnecessary retries
  const albumArtResolvedRef = useRef(!!cachedData?.albumArt)

  // Fetch now playing data
  const fetchNowPlaying = async () => {
    if (!autoFetch) return

    try {
      let responseData

      if (USE_MOCK_DATA) {
        // In dev mode, use mock data to avoid CORS issues
        log.log('Using mock current playlist data (dev mode)')
        responseData = mockCurrentPlaylist.now_playing
      } else {
        // Use native HTTP for iOS/Android, fetch for web
        const isNative = Capacitor.getPlatform() !== 'web'

        if (isNative) {
          // Native: Use CapacitorHttp (bypasses CORS)
          const response = await CapacitorHttp.get({
            url: apiUrl,
            headers: { 'Content-Type': 'application/json' },
          })

          if (response.status !== 200 || !response.data) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          responseData = response.data.now_playing
        } else {
          // Web: Use fetch (works with Vite proxy)
          const response = await fetch(apiUrl, {
            headers: { 'Content-Type': 'application/json' },
          })

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          const data = await response.json()
          responseData = data.now_playing
        }
      }

      if (responseData) {
        const newData = responseData

        const newSong = `${newData.artist || 'Unknown'} - ${newData.track || 'Unknown'}`
          .toLowerCase()
          .trim()
        const hasChanged = lastSongRef.current !== newSong

        if (hasChanged || !hasDetectedSongChangeRef.current) {
          log.log('Song changed or first fetch:', newSong)
          hasDetectedSongChangeRef.current = true
          consecutiveNoChangeRef.current = 0
          lastSongRef.current = newSong
          lastUpdateTimeRef.current = new Date()

          // Emit song change event to trigger Recently Played refresh
          emit('songChanged', { artist: newData.artist, track: newData.track })
          log.log('Emitted songChanged event for Recently Played sync')

          // Parse DJ and show names
          const parsed = parseDjAndShowName(newData.dj || '', newData.show || '')

          // Get quality for image upgrade (fallback to 'low' if offline)
          const imageQuality = networkInfo.quality === 'offline' ? 'low' : networkInfo.quality

          // Determine album art URL using fallback chain (Last.fm → iTunes → MusicBrainz → CMS)
          let albumArtUrl = ''
          const fallbackImages =
            cmsData.playerFallbackImages
              ?.map((img) => img.url)
              .filter((url): url is string => !!url) || []

          // Debug: Log what we're receiving
          log.log('🔍 Checking album art sources:', {
            hasDirectAlbumArt: !!newData.albumArt,
            albumArt: newData.albumArt,
            hasLastfmUrls: !!newData.lastfm_urls,
            lastfm_urls: newData.lastfm_urls,
          })

          // First try direct albumArt if provided
          if (newData.albumArt) {
            albumArtUrl = upgradeImageQuality(newData.albumArt, imageQuality)
            log.log('✅ Album art from direct albumArt field:', albumArtUrl)
          } else {
            // Check for Last.fm URLs
            const lastFmUrl =
              newData.lastfm_urls?.large_image ||
              newData.lastfm_urls?.med_image ||
              newData.lastfm_urls?.sm_image

            if (lastFmUrl) {
              // Use Last.fm URL directly (don't validate - avoid CORS issues)
              albumArtUrl = upgradeImageQuality(lastFmUrl, imageQuality)
              log.log('✅ Album art from Last.fm URL:', albumArtUrl)
            } else {
              log.log('❌ No Last.fm URLs found, trying fallback chain')
              // No Last.fm URL - try fallback chain (iTunes → MusicBrainz → CMS)
              const isMobile = Capacitor.isNativePlatform()

              try {
                const resolved = await resolveAlbumArt(
                  undefined, // No Last.fm URL
                  newData.artist || '',
                  newData.album || newData.release || '',
                  fallbackImages,
                  -1,
                  isMobile
                )
                albumArtUrl = resolved.url
                log.log(`Album art resolved from: ${resolved.source}`)
              } catch (_error) {
                log.log('Failed to resolve album art from fallbacks, using empty string')
                albumArtUrl = ''
              }
            }
          }

          const trackData: TrackData = {
            dj: parsed.djName,
            show: parsed.showName,
            artist: newData.artist || 'Unknown Artist',
            track: newData.track || 'Unknown Track',
            album: newData.album || newData.release || 'Unknown Album',
            label: newData.label || 'Unknown Label',
            albumArt: albumArtUrl,
            isLocal: newData.isLocal || newData.artist_is_local || false,
            playedAtGmt: newData.playedAtGmt || newData.played_at_gmt,
            detailsUpdatedAt: newData.detailsUpdatedAt,
          }

          log.log('📝 [setCurrentData] Setting track data:', {
            artist: trackData.artist,
            track: trackData.track,
            albumArt: trackData.albumArt ? 'HAS URL' : 'EMPTY',
            source: 'fetchNowPlaying',
          })
          setCurrentData(trackData)
          lastAlbumArtUrlRef.current = albumArtUrl
          albumArtRetryCountRef.current = 0
          // Reset resolved flag for new track, mark as resolved if we have album art
          albumArtResolvedRef.current = !!albumArtUrl

          // Cache the data
          const cacheData = {
            ...trackData,
            timestamp: Date.now(),
          }
          sessionStorage.setItem('chirp-now-playing', JSON.stringify(cacheData))

          // Update native media controls
          updateNativeMetadata(trackData)

          // Add to recently played if playing
          if (isPlaying) {
            addRecentlyPlayed({
              id: `${Date.now()}-${newData.artist}-${newData.track}`,
              trackName: trackData.track,
              artistName: trackData.artist,
              albumName: trackData.album,
              albumArt: trackData.albumArt,
              labelName: trackData.label,
              isLocal: trackData.isLocal,
              djName: trackData.dj,
              showName: trackData.show,
            })
          }

          setIsLoading(false)
        } else {
          consecutiveNoChangeRef.current++

          // Group repetitive "no change" logs to reduce console noise
          console.groupCollapsed(
            `[NowPlayingContext] No song change detected (${consecutiveNoChangeRef.current} times)`
          )
          log.log('Current track:', currentData.track, 'by', currentData.artist)

          // REMOVED: Album art retry mechanism that was causing art to flip back and forth
          // Album art is now resolved once when track changes and not retried

          console.groupEnd()
        }
      }
    } catch (error) {
      console.error('Error fetching now playing:', error)
    } finally {
      // Schedule next poll
      const nextDelay = 5000 // Poll every 5 seconds
      pollTimeoutRef.current = setTimeout(() => {
        fetchNowPlaying()
      }, nextDelay)
    }
  }

  // Update native media controls (iOS/Android)
  const updateNativeMetadata = async (data: TrackData) => {
    const isIOS = Capacitor.getPlatform() === 'ios'
    const isAndroid = Capacitor.getPlatform() === 'android'

    if (isIOS) {
      try {
        await NativeAudioPlayer.updateMetadata({
          title: data.track,
          artist: data.artist,
          album: data.album,
          albumArt: data.albumArt,
        })
      } catch (error) {
        console.error('Error updating iOS metadata:', error)
      }
    } else if (isAndroid) {
      try {
        await NowPlayingPlugin.updateNowPlaying({
          artist: data.artist,
          title: data.track,
          album: data.album,
          albumArt: data.albumArt,
          dj: data.dj || data.album || 'CHIRP Radio',
        })

        await NowPlayingPlugin.setPlaybackState({ isPlaying })
      } catch (error) {
        console.error('Error updating Android metadata:', error)
      }
    }
  }

  // Start polling when mounted
  useEffect(() => {
    // CRITICAL: Use console.log directly - logger is stripped in production builds
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔄 [NOW PLAYING POLLING] useEffect triggered')
    console.log('   autoFetch:', autoFetch)
    console.log('   Platform:', Capacitor.getPlatform())
    console.log('   Platform check result:', Capacitor.getPlatform() === 'ios')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    if (!autoFetch) {
      console.log('⚠️ [NOW PLAYING POLLING] autoFetch is false, skipping polling setup')
      return
    }

    const isIOS = Capacitor.getPlatform() === 'ios'
    console.log('🔍 [NOW PLAYING POLLING] Platform detection:', {
      platform: Capacitor.getPlatform(),
      isIOS: isIOS,
    })

    if (isIOS) {
      // Use native background polling on iOS (avoids JavaScript timer throttling)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('📱 [IOS SETUP] Starting native background polling for iOS')
      console.log('   API URL:', apiUrl)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      // CRITICAL: Add listener BEFORE starting polling to ensure we don't miss events
      console.log('📡 [IOS SETUP] Adding trackChanged event listener...')
      NativeAudioPlayer.addListener('trackChanged', (data) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
        console.log('🎵 [JS EVENT RECEIVED] Track changed event from native!')
        console.log('   Artist:', data.artist)
        console.log('   Track:', data.track)
        console.log('   Album:', data.album)
        console.log('   Album Art:', data.albumArt ? 'HAS URL' : 'EMPTY')
        console.log('   Timestamp:', new Date().toISOString())
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

        // Preserve existing DJ/show/label data instead of replacing with placeholders
        setCurrentData((prev) => ({
          ...prev, // Keep existing DJ, show, label, isLocal
          artist: data.artist,
          track: data.track,
          album: data.album,
          albumArt: data.albumArt,
        }))
        setIsLoading(false)
        console.log('✅ [JS STATE UPDATED] currentData state updated with new track')
      }).then(() => {
        console.log('✅ [IOS SETUP] Event listener registered successfully')
      })

      NativeAudioPlayer.startBackgroundPolling({ apiUrl })
        .then(() => {
          console.log('✅ [IOS SETUP] Native polling started successfully')
        })
        .catch((error) => {
          console.log(
            '❌ [IOS SETUP] Failed to start native polling, falling back to JavaScript:',
            error
          )
          fetchNowPlaying() // Fallback to JavaScript polling
        })
    } else {
      // Use JavaScript polling for web/Android
      log.log('Starting JavaScript polling')
      fetchNowPlaying()
    }

    return () => {
      log.log('🧹 [CLEANUP] Cleaning up native polling and listeners')
      if (isIOS) {
        NativeAudioPlayer.stopBackgroundPolling().catch(console.error)
        // Note: Capacitor listeners auto-cleanup when component unmounts
      }
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch])

  // Update native metadata when playback state changes
  useEffect(() => {
    const isAndroid = Capacitor.getPlatform() === 'android'
    if (isAndroid) {
      NowPlayingPlugin.setPlaybackState({ isPlaying }).catch((error) => {
        console.error('Error updating playback state:', error)
      })
    }
  }, [isPlaying])

  // Listen for force refresh events
  useEffect(() => {
    const unsubscribe = on('chirp-force-refresh', () => {
      log.log('Force refresh triggered')
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current)
      }
      fetchNowPlaying()
    })

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Listen for app state changes (coming to foreground/waking from sleep)
  useEffect(() => {
    const isNative = Capacitor.getPlatform() !== 'web'
    if (!isNative || !autoFetch) return

    let listenerCleanup: (() => void) | undefined

    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        log.log('App became active - refreshing metadata')

        // DON'T clear album art caches - this was causing art to disappear
        // The cache should only be cleared on force refresh or track change

        // Clear any pending poll timeout
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current)
        }

        // Immediately fetch latest track data (will update if track changed)
        fetchNowPlaying()
      }
    }).then((listener) => {
      listenerCleanup = () => listener.remove()
    })

    return () => {
      listenerCleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch])

  // Listen for CarPlay connection
  useEffect(() => {
    const isNative = Capacitor.getPlatform() !== 'web'
    if (!isNative || !autoFetch) return

    let listenerCleanup: (() => void) | undefined

    NativeAudioPlayer.addListener('carPlayConnected', () => {
      log.log('🚗 CarPlay connected - refreshing metadata')

      // Clear any pending poll timeout
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current)
      }

      // Immediately fetch latest track data
      fetchNowPlaying()
    }).then((listener) => {
      listenerCleanup = () => listener.remove()
    })

    return () => {
      listenerCleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch])

  // Update metadata when track information changes
  useEffect(() => {
    if (currentData.track && currentData.artist) {
      updateNativeMetadata(currentData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData.track, currentData.artist, currentData.album, currentData.albumArt])

  const value: NowPlayingContextType = {
    currentData,
    isLoading,
    setCurrentData,
    setIsLoading,
  }

  return <NowPlayingContext.Provider value={value}>{children}</NowPlayingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNowPlaying(): NowPlayingContextType {
  const context = useContext(NowPlayingContext)
  if (context === undefined) {
    throw new Error('useNowPlaying must be used within a NowPlayingProvider')
  }
  return context
}
