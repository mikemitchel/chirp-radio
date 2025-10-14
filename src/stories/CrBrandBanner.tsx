// CrBrandBanner.tsx
import { Link, useNavigate } from 'react-router'
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
  // Try to use navigate, but handle case where Router isn't available (e.g., Storybook)
  let navigate: ((path: string) => void) | null = null
  try {
    navigate = useNavigate()
  } catch (e) {
    // Router not available
  }

  return (
    <header className="cr-logo-banner">
      <div className="cr-logo-banner__container">
        {/* Logo Container */}
        {navigate ? (
          <Link to="/" className="cr-logo-banner__logo-container">
            <div className="cr-logo-banner__logo-horizontal">
              <CrLogo variant="horizontal-reversed" color="white" />
            </div>
            <div className="cr-logo-banner__logo-vertical">
              <CrLogo variant="vertical-reversed" color="white" />
            </div>
          </Link>
        ) : (
          <div className="cr-logo-banner__logo-container">
            <div className="cr-logo-banner__logo-horizontal">
              <CrLogo variant="horizontal-reversed" color="white" />
            </div>
            <div className="cr-logo-banner__logo-vertical">
              <CrLogo variant="vertical-reversed" color="white" />
            </div>
          </div>
        )}

        {/* Player Container */}
        <div className="cr-logo-banner__player-container">
          <CrStreamingMusicPlayer {...streamingPlayerProps} />
        </div>
      </div>
    </header>
  )
}
