// src/plugins/chirp-media.ts
import { registerPlugin } from '@capacitor/core'

export interface ChirpMediaPlugin {
  /**
   * Update the now playing information displayed in CarPlay, lock screen, etc.
   */
  updateNowPlaying(options: {
    title: string
    artist: string
    albumArtUrl?: string
    dj: string
  }): Promise<void>

  /**
   * Update the current playback state
   */
  setPlaybackState(options: { isPlaying: boolean }): Promise<void>

  /**
   * Get the current state
   */
  getCurrentState(): Promise<{
    isPlaying: boolean
    title: string
    artist: string
    dj: string
  }>

  /**
   * Add a listener for media commands from CarPlay/Lock Screen
   * Commands: 'play', 'pause'
   */
  addListener(
    eventName: 'mediaCommand',
    listenerFunc: (event: { command: 'play' | 'pause' }) => void
  ): Promise<any>

  /**
   * Remove all listeners
   */
  removeAllListeners(): Promise<void>
}

const ChirpMedia = registerPlugin<ChirpMediaPlugin>('ChirpMediaPlugin')

export default ChirpMedia
