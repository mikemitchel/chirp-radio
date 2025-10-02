// CrBrandBanner.tsx
import CrLogo from './CrLogo'
import CrStreamingMusicPlayer from './CrStreamingMusicPlayer'
import './CrBrandBanner.css'

interface CrBrandBannerProps {
  streamingPlayerProps?: any
}

export default function CrBrandBanner({
  // CrStreamingMusicPlayer props
  streamingPlayerProps = {
    variant: 'slim-player',
    artistName: 'Artist Name',
    trackName: 'Song Name',
    isTrackAdded: false,
    autoFetch: false,
  },
}: CrBrandBannerProps) {
  return (
    <header className="cr-logo-banner">
      <div className="cr-logo-banner__container">
        {/* Logo Container */}
        <div className="cr-logo-banner__logo-container">
          <CrLogo variant="horizontal-reversed" color="white" />
        </div>

        {/* Player Container */}
        <div className="cr-logo-banner__player-container">
          <CrStreamingMusicPlayer {...streamingPlayerProps} />
        </div>
      </div>
    </header>
  )
}
