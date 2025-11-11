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

  /**
   * Start background polling for now playing metadata
   * This runs natively on iOS to avoid JavaScript timer throttling in background
   */
  startBackgroundPolling(options: { apiUrl: string }): Promise<{ status: string }>

  /**
   * Stop background polling
   */
  stopBackgroundPolling(): Promise<{ status: string }>

  /**
   * Listen for track changes detected by native polling
   */
  addListener(
    eventName: 'trackChanged',
    listenerFunc: (data: { artist: string; track: string; album: string; albumArt: string }) => void
  ): Promise<{ remove: () => void }>
}

const NativeAudioPlayer = registerPlugin<NativeAudioPlayerPlugin>('NativeAudioPlayer')

export default NativeAudioPlayer
