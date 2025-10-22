import { registerPlugin } from '@capacitor/core'

export interface NowPlayingPlugin {
  updateNowPlaying(options: {
    title: string
    artist: string
    album: string
    albumArt?: string
  }): Promise<void>

  setPlaybackState(options: { isPlaying: boolean }): Promise<void>
}

const NowPlaying = registerPlugin<NowPlayingPlugin>('NowPlayingPlugin')

export default NowPlaying
