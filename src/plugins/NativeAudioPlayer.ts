import { registerPlugin } from '@capacitor/core'

export interface NativeAudioPlayerPlugin {
  /**
   * Set the stream URL
   */
  setStreamUrl(options: { url: string }): Promise<void>

  /**
   * Start playback
   */
  play(): Promise<{ isPlaying: boolean }>

  /**
   * Pause playback
   */
  pause(): Promise<{ isPlaying: boolean }>

  /**
   * Stop playback and reset position
   */
  stop(): Promise<void>

  /**
   * Update Now Playing metadata
   */
  updateMetadata(options: {
    title: string
    artist: string
    album: string
    albumArt?: string
  }): Promise<void>

  /**
   * Get current playback state
   */
  getPlaybackState(): Promise<{
    isPlaying: boolean
    currentTime: number
  }>
}

const NativeAudioPlayer = registerPlugin<NativeAudioPlayerPlugin>('NativeAudioPlayer')

export default NativeAudioPlayer
