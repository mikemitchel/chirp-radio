// AudioPlaybackContext.tsx
// Handles audio playback control (play/pause/stop) and stream URL management
// Separated from metadata/collection concerns for better performance

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { on } from '../utils/eventBus'
import { createLogger } from '../utils/logger'
import NativeAudioPlayer from '../plugins/NativeAudioPlayer'
import NativeAudioBridge from '../plugins/NativeAudioBridge'
import NowPlayingPlugin from '../plugins/NowPlayingPlugin'

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
      // Use Capacitor's standard addListener API for iOS
      let listenerCleanup: (() => void) | undefined

      NativeAudioPlayer.addListener('playbackStateChanged', handlePlaybackStateChange).then(
        (listener) => {
          listenerCleanup = () => listener.remove()
        }
      )

      return () => {
        listenerCleanup?.()
      }
    } else if (isAndroid) {
      // Listen for Android Auto / media session playback state changes
      let stateListenerCleanup: (() => void) | undefined
      let commandListenerCleanup: (() => void) | undefined

      NativeAudioBridge.addListener('playbackStateChanged', handlePlaybackStateChange).then(
        (listener) => {
          stateListenerCleanup = () => listener.remove()
        }
      )

      // Listen for media commands from lock screen/notification
      NowPlayingPlugin.addListener('mediaCommand', (data: { command: string }) => {
        log.log('🎮 Media command from lock screen:', data.command)
        if (data.command === 'play') {
          setIsPlaying(true)
        } else if (data.command === 'pause') {
          setIsPlaying(false)
        }
      }).then((listener: { remove: () => void }) => {
        commandListenerCleanup = () => listener.remove()
      })

      return () => {
        stateListenerCleanup?.()
        commandListenerCleanup?.()
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

      // Stop playback before changing URL
      if (wasPlaying) {
        log.log('Stopping playback before URL change...')
        NativeAudioPlayer.pause().catch((err) => {
          log.error('Error pausing before URL change:', err)
        })
      }

      // Always update stream URL when it changes (for quality toggle)
      NativeAudioPlayer.setStreamUrl({ url: streamUrl })
        .then(() => {
          log.log('Native player URL updated to:', streamUrl)
          // Reset initialization flag to force recreation of player item
          nativePlayerInitialized = false
          return initializeNativePlayer(streamUrl)
        })
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
          log.error('Error updating native player URL:', err)
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
      log.log('Creating new HTML5 audio player for web with URL:', streamUrl)

      // Stop and clean up old audio before creating new one
      if (audioRef.current) {
        log.log('Stopping old audio player...')
        audioRef.current.pause()
        audioRef.current.src = '' // Clear source to stop loading
        audioRef.current = null
      }

      const audio = new Audio(streamUrl)
      audio.autoplay = false
      audio.loop = true
      audio.volume = 1.0
      audio.setAttribute('playsinline', 'true')
      audio.removeAttribute('title')

      log.log('New audio player created, volume:', audio.volume)

      audioRef.current = audio
      setIsPlayerReady(true)

      if (wasPlaying) {
        log.log('Restarting playback with new stream URL...')
        audio
          .play()
          .then(() => {
            log.log('Playback restarted successfully')
            setIsPlaying(true)
          })
          .catch((err) => {
            log.error('Error restarting audio after stream change:', err)
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
    log.log('🎵 [AudioPlaybackContext] Setting up quality change listener')

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chirp-streaming-quality') {
        const newUrl = getStreamUrl()
        if (newUrl !== streamUrl) {
          log.log('Stream URL changed to:', newUrl)
          setStreamUrl(newUrl)
        }
      }
    }

    const unsubscribeQuality = on('chirp-quality-change', (quality) => {
      log.log('🎵 [AudioPlaybackContext] Quality change event received with quality:', quality)
      console.log('🎵 [AudioPlaybackContext] Quality change event received with quality:', quality)
      const newUrl = getStreamUrl()
      log.log('🎵 [AudioPlaybackContext] Current URL:', streamUrl, 'New URL:', newUrl)
      console.log('🎵 [AudioPlaybackContext] Current URL:', streamUrl, 'New URL:', newUrl)
      if (newUrl !== streamUrl) {
        log.log('🎵 [AudioPlaybackContext] Stream URL changed to:', newUrl)
        console.log('🎵 [AudioPlaybackContext] Stream URL changed to:', newUrl)
        setStreamUrl(newUrl)
      } else {
        log.log('🎵 [AudioPlaybackContext] URLs match, no change needed')
        console.log('🎵 [AudioPlaybackContext] URLs match, no change needed')
      }
    })

    log.log('🎵 [AudioPlaybackContext] Listener setup complete')
    console.log('🎵 [AudioPlaybackContext] Listener setup complete')

    window.addEventListener('storage', handleStorageChange)

    return () => {
      log.log('🎵 [AudioPlaybackContext] Cleaning up listeners')
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
        setIsPlaying(true) // Optimistically update UI
        await NativeAudioPlayer.play()
        // Native event will sync state if lock screen controls are used
      } catch (error) {
        log.error('NativeAudioPlayer.play() failed:', error)
        // Try to recover by re-initializing the singleton
        try {
          // Reset singleton state to force re-initialization
          nativePlayerInitialized = false
          await initializeNativePlayer(streamUrl)
          const retryResult = await NativeAudioPlayer.play()
          log.log('Recovery successful:', retryResult)
          setIsPlaying(true) // Update UI after recovery
        } catch (retryError) {
          log.error('Recovery failed:', retryError)
          setIsPlaying(false) // Reset UI on failure
          throw retryError
        }
      }
    } else if (isAndroid) {
      try {
        setIsPlaying(true) // Optimistically update UI
        await NativeAudioBridge.play()
        // Native event will sync state if lock screen controls are used
      } catch (error) {
        log.error('NativeAudioBridge.play() failed:', error)
        setIsPlaying(false)
        throw error
      }
    } else if (audioRef.current) {
      try {
        log.log('Playing web audio...')
        await audioRef.current.play()
        setIsPlaying(true)
        log.log('Web audio playing successfully')
      } catch (err) {
        log.error('Error playing audio:', err)
        throw err
      }
    } else {
      log.error('❌ audioRef.current is null - player not initialized')
      throw new Error('Audio player not initialized')
    }
  }

  // Pause function
  const pause = () => {
    const isIOS = Capacitor.getPlatform() === 'ios'
    const isAndroid = Capacitor.getPlatform() === 'android'

    if (isIOS) {
      setIsPlaying(false) // Optimistically update UI
      NativeAudioPlayer.pause().catch((error) => {
        console.error('Error pausing native audio:', error)
        setIsPlaying(true) // Revert on error
      })
      // Native event will sync state if lock screen controls are used
    } else if (isAndroid) {
      setIsPlaying(false) // Optimistically update UI
      NativeAudioBridge.pause().catch((error) => {
        console.error('Error pausing native audio:', error)
        setIsPlaying(true) // Revert on error
      })
      // Native event will sync state if lock screen controls are used
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
