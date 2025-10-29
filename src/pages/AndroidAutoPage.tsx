import CrStreamingMusicPlayer from '../stories/CrStreamingMusicPlayer'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'

export const AndroidAutoPage = () => {
  return (
    <AudioPlayerProvider
      autoFetch={true}
      apiUrl="https://chirpradio.appspot.com/api/current_playlist"
    >
      <CrStreamingMusicPlayer variant="android-auto" autoFetch={true} />
    </AudioPlayerProvider>
  )
}
