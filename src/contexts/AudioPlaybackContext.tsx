// AudioPlaybackContext.tsx
// Handles audio playback control (play/pause/stop) and stream URL management
// Separated from metadata/collection concerns for better performance

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { on } from '../utils/eventBus'
import { createLogger } from '../utils/logger'
import NativeAudioPlayer from '../plugins/NativeAudioPlayer'
import NativeAudioBridge from '../plugins/NativeAudioBridge'

const log = createLogger('AudioPlaybackContext')

// Singleton state to track native player initialization across hot reloads
let nativePlayerInitialized = false
let nativePlayerInitializing = false
let initializationPromise: Promise<void> | null = null

// Singleton function to initialize native player - ensures only called once globally
async function initializeNativePlayer(streamUrl: string): Promise<void> {
  // If already initialized, return immediately
  if (nativePlayerInitialized) {
    log.log('Native player already initialized, skipping')
    return
  }

  // If currently initializing, wait for that promise
  if (nativePlayerInitializing && initializationPromise) {
    log.log('Native player initialization in progress, waiting...')
    return initializationPromise
  }

  // Start initialization
  nativePlayerInitializing = true
  log.log('Initializing native player with URL:', streamUrl)

  initializationPromise = new Promise<void>((resolve, reject) => {
    NativeAudioPlayer.setStreamUrl({ url: streamUrl })
      .then(() => {
        log.log('Native player initialized successfully')
        nativePlayerInitialized = true
        nativePlayerInitializing = false
        resolve()
      })
      .catch((error) => {
        log.error('Failed to initialize native player:', error)
        nativePlayerInitializing = false
        // Don't mark as initialized on error, allow retry
        reject(error)
      })
  })

  return initializationPromise
}

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
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Listen for playback state changes from native (CarPlay, Android Auto, lock screen, etc.)
  useEffect(() => {
    const isIOS = Capacitor.getPlatform() === 'ios'
    const isAndroid = Capacitor.getPlatform() === 'android'

    const handlePlaybackStateChange = (data: { isPlaying: boolean }) => {
      log.log('🔄 Playback state changed from native:', data.isPlaying)
      setIsPlaying(data.isPlaying)
    }

    if (isIOS) {
      // Note: Using addEventListener pattern instead of addListener
      // @ts-expect-error - Native plugin may not have proper types
      NativeAudioPlayer.addEventListener?.('playbackStateChanged', handlePlaybackStateChange)

      return () => {
        // @ts-expect-error - Native plugin may not have proper types
        NativeAudioPlayer.removeEventListener?.('playbackStateChanged', handlePlaybackStateChange)
      }
    } else if (isAndroid) {
      // Listen for Android Auto / media session playback state changes
      let listenerCleanup: (() => void) | undefined

      NativeAudioBridge.addListener('playbackStateChanged', handlePlaybackStateChange).then(
        (listener) => {
          listenerCleanup = () => listener.remove()
        }
      )

      return () => {
        listenerCleanup?.()
      }
    }
  }, [])

  // Initialize audio element based on platform
  useEffect(() => {
    const wasPlaying = isPlaying
    const isIOS = Capacitor.getPlatform() === 'ios'
    const isAndroid = Capacitor.getPlatform() === 'android'

    log.log('Initializing audio player for platform:', Capacitor.getPlatform())
    setIsPlayerReady(false)

    if (isIOS) {
      // Use native AVPlayer on iOS for background playback
      log.log('Using native AVPlayer for iOS')
      log.log('Stream URL:', streamUrl)

      // Use singleton initialization to prevent multiple calls across component mounts
      initializeNativePlayer(streamUrl)
        .then(() => {
          log.log('Native player ready')
          setIsPlayerReady(true)
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
          log.error('Error initializing native player:', err)
          setIsPlayerReady(true) // Mark as ready even on error so play can be attempted
        })
    } else if (isAndroid) {
      // Use native audio bridge for Android (for Android Auto and media session support)
      log.log('Using native audio bridge for Android')
      // The native player is always initialized in ChirpMediaService, so just mark as ready
      setIsPlayerReady(true)

      if (wasPlaying) {
        log.log('Restarting playback after stream change...')
        NativeAudioBridge.play()
          .then(() => log.log('Playback restarted successfully'))
          .catch((err) => {
            log.error('Error restarting native audio:', err)
            setIsPlaying(false)
          })
      }
    } else {
      // Use HTML5 audio for web
      const audio = new Audio(streamUrl)
      audio.autoplay = false
      audio.loop = true
      audio.volume = 1.0
      audio.setAttribute('playsinline', 'true')
      audio.removeAttribute('title')

      log.log('Initial volume:', audio.volume)

      audioRef.current = audio
      setIsPlayerReady(true)

      if (wasPlaying) {
        audio.play().catch((err) => {
          console.error('Error restarting audio after stream change:', err)
          setIsPlaying(false)
        })
      }
    }

    return () => {
      // Don't stop native player on unmount - let the singleton stay alive
      // This allows the player to survive hot reloads and component remounts
      if (!isIOS && !isAndroid && audioRef.current) {
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
    // Wait for player to be initialized
    if (!isPlayerReady) {
      log.log('⏳ Player not ready yet, waiting...')
      // Wait up to 3 seconds for player to initialize
      const startTime = Date.now()
      while (!isPlayerReady && Date.now() - startTime < 3000) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      if (!isPlayerReady) {
        log.error('❌ Player initialization timeout')
        throw new Error('Player not initialized')
      }
    }

    const isIOS = Capacitor.getPlatform() === 'ios'
    const isAndroid = Capacitor.getPlatform() === 'android'

    if (isIOS) {
      try {
        await NativeAudioPlayer.play()
        setIsPlaying(true)
      } catch (error) {
        log.error('NativeAudioPlayer.play() failed:', error)
        // Try to recover by re-initializing the singleton
        try {
          // Reset singleton state to force re-initialization
          nativePlayerInitialized = false
          await initializeNativePlayer(streamUrl)
          const retryResult = await NativeAudioPlayer.play()
          log.log('Recovery successful:', retryResult)
          setIsPlaying(true)
        } catch (retryError) {
          log.error('Recovery failed:', retryError)
          throw retryError
        }
      }
    } else if (isAndroid) {
      try {
        await NativeAudioBridge.play()
        // Set isPlaying optimistically for immediate UI feedback
        // The native callback will authoritatively update it
        setIsPlaying(true)
      } catch (error) {
        log.error('NativeAudioBridge.play() failed:', error)
        setIsPlaying(false)
        throw error
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
    const isAndroid = Capacitor.getPlatform() === 'android'

    if (isIOS) {
      NativeAudioPlayer.pause().catch((error) => {
        console.error('Error pausing native audio:', error)
      })
      setIsPlaying(false)
    } else if (isAndroid) {
      NativeAudioBridge.pause().catch((error) => {
        console.error('Error pausing native audio:', error)
      })
      // Set isPlaying optimistically for immediate UI feedback
      // The native callback will authoritatively update it
      setIsPlaying(false)
    } else if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
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
