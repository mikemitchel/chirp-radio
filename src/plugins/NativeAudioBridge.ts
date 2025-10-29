import { registerPlugin } from '@capacitor/core'
import type { PluginListenerHandle } from '@capacitor/core'

export interface NativeAudioBridgePlugin {
  /**
   * Start playback using native audio player
   */
  play(): Promise<void>

  /**
   * Pause playback
   */
  pause(): Promise<void>

  /**
   * Stop playback
   */
  stop(): Promise<void>

  /**
   * Check if native audio is currently playing
   */
  isPlaying(): Promise<{ isPlaying: boolean }>

  /**
   * Listen for playback state changes from the service
   */
  addListener(
    eventName: 'playbackStateChanged',
    listenerFunc: (data: { isPlaying: boolean }) => void
  ): Promise<PluginListenerHandle>
}

const NativeAudioBridge = registerPlugin<NativeAudioBridgePlugin>('NativeAudioBridge', {
  web: () => {
    // Web fallback - no-op implementation
    return {
      play: async () => {},
      pause: async () => {},
      stop: async () => {},
      isPlaying: async () => ({ isPlaying: false }),
      addListener: () => ({ remove: () => {} }),
    }
  },
})

export default NativeAudioBridge
