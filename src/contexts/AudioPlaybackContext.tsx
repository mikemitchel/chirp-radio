// AudioPlaybackContext.tsx
// Handles audio playback control (play/pause/stop) and stream URL management
// Separated from metadata/collection concerns for better performance

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { on } from '../utils/eventBus'
import { createLogger } from '../utils/logger'
import NativeAudioPlayer from '../plugins/NativeAudioPlayer'

const log = createLogger('AudioPlaybackContext')

interface AudioPlaybackContextType {
  isPlaying: boolean
  streamUrl: string
  play: () => Promise<void>
  pause: () => void
  togglePlayPause: () => void
  setIsPlaying: (playing: boolean) => void
}

const AudioPlaybackContext = createContext<AudioPlaybackContextType | undefined>(undefined)

interface AudioPlaybackProviderProps {
  children: ReactNode
  defaultStreamUrl?: string
}

export function AudioPlaybackProvider({
  children,
  defaultStreamUrl = 'https://peridot.streamguys1.com:5185/live',
}: AudioPlaybackProviderProps) {
  // Get stream URL based on quality setting
  const getStreamUrl = () => {
    const quality =
      localStorage.getItem('chirp-streaming-quality') ||
      sessionStorage.getItem('chirp-streaming-quality') ||
      '128'
    if (quality === '64') {
      return 'https://peridot.streamguys1.com:5180/live-64kb'
    }
    return defaultStreamUrl
  }

  const [streamUrl, setStreamUrl] = useState(getStreamUrl())
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element based on platform
  useEffect(() => {
    const wasPlaying = isPlaying
    const isIOS = Capacitor.getPlatform() === 'ios'
    const isAndroid = Capacitor.getPlatform() === 'android'

    log.log('Platform:', Capacitor.getPlatform())

    if (isIOS) {
      // Use native AVPlayer on iOS for background playback
      log.log('Using native AVPlayer for iOS')
      log.log('Stream URL:', streamUrl)

      NativeAudioPlayer.setStreamUrl({ url: streamUrl })
        .then(() => {
          log.log('Stream URL set in native player successfully')
          if (wasPlaying) {
            log.log('Restarting playback after stream change...')
            NativeAudioPlayer.play()
              .then(() => log.log('Playback restarted successfully'))
              .catch((err) => {
                log.error('Error restarting native audio:', err)
                setIsPlaying(false)
              })
          }
        })
        .catch((err) => {
          log.error('Error setting stream URL in native player:', err)
        })
    } else {
      // Use HTML5 audio for web and Android
      const audio = new Audio(streamUrl)
      audio.autoplay = false
      audio.loop = true
      audio.volume = 1.0
      audio.setAttribute('playsinline', 'true')
      audio.removeAttribute('title')

      log.log('Initial volume:', audio.volume)

      if (isAndroid) {
        // Android WebView sometimes needs explicit volume setting
        setTimeout(() => {
          audio.volume = 1.0
          log.log('Android volume set to:', audio.volume)
        }, 100)
      }

      audioRef.current = audio

      if (wasPlaying) {
        audio.play().catch((err) => {
          console.error('Error restarting audio after stream change:', err)
          setIsPlaying(false)
        })
      }
    }

    return () => {
      if (isIOS) {
        NativeAudioPlayer.stop().catch((err) => {
          console.error('Error stopping native audio:', err)
        })
      } else if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamUrl])

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

    const unsubscribeQuality = on('chirp-quality-change', () => {
      const newUrl = getStreamUrl()
      if (newUrl !== streamUrl) {
        log.log('Stream URL changed to:', newUrl)
        setStreamUrl(newUrl)
      }
    })

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      unsubscribeQuality()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamUrl])

  // Play function
  const play = async () => {
    const isIOS = Capacitor.getPlatform() === 'ios'

    if (isIOS) {
      try {
        log.log('Calling NativeAudioPlayer.play()...')
        const result = await NativeAudioPlayer.play()
        log.log('Native audio play result:', result)
        setIsPlaying(true)
      } catch (error) {
        log.error('CRITICAL: NativeAudioPlayer.play() failed:', error)
        // Try to recover
        try {
          await NativeAudioPlayer.setStreamUrl({ url: streamUrl })
          const retryResult = await NativeAudioPlayer.play()
          log.log('Recovery successful:', retryResult)
          setIsPlaying(true)
        } catch (retryError) {
          log.error('Recovery failed:', retryError)
          throw retryError
        }
      }
    } else if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (err) {
        console.error('Error playing audio:', err)
        throw err
      }
    }
  }

  // Pause function
  const pause = () => {
    const isIOS = Capacitor.getPlatform() === 'ios'

    if (isIOS) {
      NativeAudioPlayer.pause().catch((error) => {
        console.error('Error pausing native audio:', error)
      })
    } else if (audioRef.current) {
      audioRef.current.pause()
    }

    setIsPlaying(false)
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const value: AudioPlaybackContextType = {
    isPlaying,
    streamUrl,
    play,
    pause,
    togglePlayPause,
    setIsPlaying,
  }

  return <AudioPlaybackContext.Provider value={value}>{children}</AudioPlaybackContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudioPlayback(): AudioPlaybackContextType {
  const context = useContext(AudioPlaybackContext)
  if (context === undefined) {
    throw new Error('useAudioPlayback must be used within an AudioPlaybackProvider')
  }
  return context
}
