import { registerPlugin } from '@capacitor/core'

export interface NowPlayingPlugin {
  updateNowPlaying(options: {
    title: string
    artist: string
    album: string
    albumArt?: string
  }): Promise<void>

  setPlaybackState(options: { isPlaying: boolean }): Promise<void>

  addListener(
    eventName: 'mediaCommand',
    listenerFunc: (data: { command: string }) => void
  ): any
}

const NowPlaying = registerPlugin<NowPlayingPlugin>('NowPlayingPlugin')

export default NowPlaying
