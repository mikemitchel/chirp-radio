// NowPlayingContext.tsx
// Handles now playing metadata fetching, polling, and album art management
// Separated from playback/collection concerns for better performance

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { CapacitorHttp } from '@capacitor/core'
import { useNetworkQuality } from '../hooks/useNetworkQuality'
import { upgradeImageQuality } from '../utils/imageOptimizer'
import { parseDjAndShowName } from '../utils/djNameParser'
import { addRecentlyPlayed, updateRecentlyPlayedAlbumArt } from '../utils/recentlyPlayedDB'
import { useAudioPlayback } from './AudioPlaybackContext'
import { on } from '../utils/eventBus'
import { createLogger } from '../utils/logger'
import NowPlayingPlugin from '../plugins/NowPlayingPlugin'
import NativeAudioPlayer from '../plugins/NativeAudioPlayer'

const log = createLogger('NowPlayingContext')

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
}

export function NowPlayingProvider({
  children,
  autoFetch = false,
  apiUrl = 'https://chirpradio.appspot.com/api/current_playlist',
}: NowPlayingProviderProps) {
  const networkInfo = useNetworkQuality()
  const { isPlaying } = useAudioPlayback()

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

  const [currentData, setCurrentData] = useState<TrackData>(initialData)
  const [isLoading, setIsLoading] = useState(autoFetch && !cachedData)

  const lastSongRef = useRef(
    cachedData ? `${cachedData.artist} - ${cachedData.track}`.toLowerCase().trim() : ''
  )
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const consecutiveNoChangeRef = useRef(0)
  const hasDetectedSongChangeRef = useRef(false)
  const lastUpdateTimeRef = useRef<Date>(new Date())
  const albumArtRetryCountRef = useRef(0)
  const lastAlbumArtUrlRef = useRef(cachedData?.albumArt || '')

  // Fetch now playing data
  const fetchNowPlaying = async () => {
    if (!autoFetch) return

    try {
      const response = await CapacitorHttp.get({
        url: apiUrl,
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.status === 200 && response.data) {
        const newData = response.data

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

          // Parse DJ and show names
          const parsed = parseDjAndShowName(newData.dj || '', newData.show || '')

          // Determine album art URL
          let albumArtUrl = ''
          if (newData.albumArt) {
            albumArtUrl = upgradeImageQuality(newData.albumArt, networkInfo)
          }

          const trackData: TrackData = {
            dj: parsed.djName,
            show: parsed.showName,
            artist: newData.artist || 'Unknown Artist',
            track: newData.track || 'Unknown Track',
            album: newData.album || 'Unknown Album',
            label: newData.label || 'Unknown Label',
            albumArt: albumArtUrl,
            isLocal: newData.isLocal || false,
            playedAtGmt: newData.playedAtGmt,
            detailsUpdatedAt: newData.detailsUpdatedAt,
          }

          setCurrentData(trackData)
          lastAlbumArtUrlRef.current = albumArtUrl
          albumArtRetryCountRef.current = 0

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
              timestamp: new Date().toISOString(),
            })
          }

          setIsLoading(false)
        } else {
          consecutiveNoChangeRef.current++
          log.log(`No song change detected (${consecutiveNoChangeRef.current} times)`)

          // Retry album art if missing
          if (!currentData.albumArt && newData.albumArt && albumArtRetryCountRef.current < 5) {
            const retryAlbumArt = upgradeImageQuality(newData.albumArt, networkInfo)
            if (retryAlbumArt !== lastAlbumArtUrlRef.current) {
              log.log('Retrying album art:', retryAlbumArt)
              setCurrentData((prev) => ({ ...prev, albumArt: retryAlbumArt }))
              lastAlbumArtUrlRef.current = retryAlbumArt
              albumArtRetryCountRef.current++

              updateRecentlyPlayedAlbumArt(currentData.artist, currentData.track, retryAlbumArt)
              updateNativeMetadata({ ...currentData, albumArt: retryAlbumArt })
            }
          }
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
        })

        await NowPlayingPlugin.setPlaybackState({ isPlaying })
      } catch (error) {
        console.error('Error updating Android metadata:', error)
      }
    }
  }

  // Start polling when mounted
  useEffect(() => {
    if (autoFetch) {
      fetchNowPlaying()
    }

    return () => {
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

  // Update metadata when DJ changes
  useEffect(() => {
    if (currentData.dj) {
      updateNativeMetadata(currentData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData.dj])

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

// Export TrackData for use in composite contexts

export type { TrackData }
