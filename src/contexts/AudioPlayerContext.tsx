// src/contexts/AudioPlayerContext.tsx
// Composite context that combines playback, metadata, and collection contexts
// This maintains backward compatibility while improving performance through separation

import { type ReactNode } from 'react'
import { AudioPlaybackProvider, useAudioPlayback } from './AudioPlaybackContext'
import { NowPlayingProvider, useNowPlaying } from './NowPlayingContext'
import type { TrackData } from './NowPlayingContext'
import { AudioCollectionProvider, useAudioCollection } from './AudioCollectionContext'
import type { Track } from './AudioCollectionContext'

// Re-export TrackData for backward compatibility
export type { TrackData }

interface AudioPlayerContextType {
  // From AudioPlaybackContext
  isPlaying: boolean
  play: () => Promise<void>
  pause: () => void
  togglePlayPause: () => void
  // From NowPlayingContext
  isLoading: boolean
  currentData: TrackData
  setCurrentData: (data: TrackData) => void
  setIsLoading: (loading: boolean) => void
  // From AudioCollectionContext
  isTrackAdded: boolean
  toggleAddTrack: () => void
}

interface AudioPlayerProviderProps {
  children: ReactNode
  streamUrl?: string
  autoFetch?: boolean
  apiUrl?: string
}

// Composite provider that wraps all three contexts
export function AudioPlayerProvider({
  children,
  streamUrl = 'https://peridot.streamguys1.com:5185/live',
  autoFetch = false,
  // Always use relative path - Vite proxy in dev, nginx proxy in production
  apiUrl = '/api/current_playlist',
}: AudioPlayerProviderProps) {
  return (
    <AudioPlaybackProvider defaultStreamUrl={streamUrl}>
      <NowPlayingProviderWrapper autoFetch={autoFetch} apiUrl={apiUrl}>
        <AudioCollectionWrapper>{children}</AudioCollectionWrapper>
      </NowPlayingProviderWrapper>
    </AudioPlaybackProvider>
  )
}

// Wrapper to access isPlaying from AudioPlaybackContext
function NowPlayingProviderWrapper({
  children,
  autoFetch,
  apiUrl,
}: {
  children: ReactNode
  autoFetch: boolean
  apiUrl?: string
}) {
  const { isPlaying } = useAudioPlayback()
  return (
    <NowPlayingProvider autoFetch={autoFetch} apiUrl={apiUrl} isPlayingProp={isPlaying}>
      {children}
    </NowPlayingProvider>
  )
}

// Wrapper to pass current track to AudioCollectionProvider
function AudioCollectionWrapper({ children }: { children: ReactNode }) {
  const { currentData } = useNowPlaying()

  // Convert TrackData to Track for collection context
  const currentTrack: Track = {
    artist: currentData.artist,
    track: currentData.track,
    album: currentData.album,
    label: currentData.label,
    albumArt: currentData.albumArt,
    isLocal: currentData.isLocal,
  }

  return <AudioCollectionProvider currentTrack={currentTrack}>{children}</AudioCollectionProvider>
}

// Composite hook that combines all three contexts
// Maintains backward compatibility with the original useAudioPlayer() API
// eslint-disable-next-line react-refresh/only-export-components
export function useAudioPlayer(): AudioPlayerContextType {
  const { isPlaying, play, pause, togglePlayPause } = useAudioPlayback()
  const { isLoading, currentData, setCurrentData, setIsLoading } = useNowPlaying()
  const { isTrackAdded, toggleAddTrack: toggleAddTrackBase } = useAudioCollection()

  // Wrapper for toggleAddTrack that uses current track data
  const toggleAddTrack = () => {
    const track: Track = {
      artist: currentData.artist,
      track: currentData.track,
      album: currentData.album,
      label: currentData.label,
      albumArt: currentData.albumArt,
      isLocal: currentData.isLocal,
    }
    toggleAddTrackBase(track)
  }

  return {
    // Playback controls
    isPlaying,
    play,
    pause,
    togglePlayPause,
    // Metadata
    isLoading,
    currentData,
    setCurrentData,
    setIsLoading,
    // Collection
    isTrackAdded,
    toggleAddTrack,
  }
}
