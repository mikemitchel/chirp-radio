// CrMobileAppFrame.tsx
import React, { useState } from 'react'
import CrMobileHeader from './CrMobileHeader'
import CrStreamingMusicPlayer from './CrStreamingMusicPlayer'
import CrSidebar from './CrSidebar'
import './CrMobileAppFrame.css'

interface CrMobileAppFrameProps {
  variant?: 'landing' | 'interior'
  pageTitle?: string
  headerActionButton?: React.ReactNode
  onLogoClick?: () => void
  streamingPlayerProps?: any
  children?: React.ReactNode
  contentTitle?: string
  contentSubtitle?: string
  onHomeClick?: () => void
  onNowPlayingClick?: () => void
  onRecentPlaylistClick?: () => void
  onYourCollectionClick?: () => void
  onListenClick?: () => void
  onPlaylistClick?: () => void
  onPodcastClick?: () => void
  onDjsClick?: () => void
  onScheduleClick?: () => void
  onEventsClick?: () => void
  onArticlesClick?: () => void
  onDonateClick?: () => void
  onWaysToGiveClick?: () => void
  onVinylCircleClick?: () => void
  onShopClick?: () => void
  onAboutClick?: () => void
  onOtherWaysToListenClick?: () => void
  onContactClick?: () => void
  onBecomeVolunteerClick?: () => void
  onRequestClick?: () => void
  onAccountSettingsClick?: () => void
}

export default function CrMobileAppFrame({
  variant = 'interior', // 'landing' or 'interior'
  pageTitle = 'CHIRP Radio',
  headerActionButton,
  onLogoClick,
  // Streaming player props
  streamingPlayerProps = {},
  // Content props for interior pages
  children,
  contentTitle = 'Welcome to CHIRP Radio',
  contentSubtitle = 'Chicago Independent Radio Project',
  // Sidebar navigation handlers
  onHomeClick,
  onNowPlayingClick,
  onRecentPlaylistClick,
  onYourCollectionClick,
  onListenClick,
  onPlaylistClick,
  onPodcastClick,
  onDjsClick,
  onScheduleClick,
  onEventsClick,
  onArticlesClick,
  onDonateClick,
  onWaysToGiveClick,
  onVinylCircleClick,
  onShopClick,
  onAboutClick,
  onOtherWaysToListenClick,
  onContactClick,
  onBecomeVolunteerClick,
  onRequestClick,
  onAccountSettingsClick,
}: CrMobileAppFrameProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setIsSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  const defaultStreamingProps = {
    variant: variant === 'landing' ? 'mobile-player' : 'slim-player',
    artistName: 'Loading...',
    trackName: 'Fetching current track...',
    albumName: 'Album Name',
    labelName: 'Label Name',
    djName: 'DJ Current',
    showName: 'Current Show',
    albumArt: '',
    autoFetch: true,
    apiUrl: 'https://chirpradio.appspot.com/api/current_playlist',
    streamUrl: 'https://peridot.streamguys1.com:5185/live',
    isTrackAdded: false,
    isLocal: false,
    ...streamingPlayerProps,
  }

  const renderLandingLayout = () => (
    <div className="cr-mobile-frame cr-mobile-frame--landing">
      {/* Header fixed at top */}
      <div className="cr-mobile-frame__header">
        <CrMobileHeader
          pageTitle={pageTitle}
          onMenuClick={handleMenuClick}
          onLogoClick={onLogoClick}
          variant="transparent"
          actionButton={headerActionButton}
        />
      </div>

      {/* Mobile player as background - fills entire screen */}
      <div className="cr-mobile-frame__background-player">
        <CrStreamingMusicPlayer {...defaultStreamingProps} />
      </div>
    </div>
  )

  const renderInteriorLayout = () => (
    <div className="cr-mobile-frame cr-mobile-frame--interior">
      {/* Header fixed at top */}
      <div className="cr-mobile-frame__header">
        <CrMobileHeader
          pageTitle={pageTitle}
          onMenuClick={handleMenuClick}
          onLogoClick={onLogoClick}
          actionButton={headerActionButton}
        />
      </div>

      {/* Main content area - scrollable between header and footer */}
      <div className="cr-mobile-frame__content">
        {children || (
          <div className="cr-mobile-frame__default-content">
            <div className="cr-mobile-frame__content-header">
              <h1 className="cr-mobile-frame__content-title">{contentTitle}</h1>
              {contentSubtitle && (
                <p className="cr-mobile-frame__content-subtitle">{contentSubtitle}</p>
              )}
            </div>

            <div className="cr-mobile-frame__content-sections">
              <div className="cr-mobile-frame__content-section">
                <h2>Featured Content</h2>
                <div className="cr-mobile-frame__placeholder">
                  <p>Featured shows, playlists, or highlighted content will appear here</p>
                </div>
              </div>

              <div className="cr-mobile-frame__content-section">
                <h2>Recent Shows</h2>
                <div className="cr-mobile-frame__placeholder">
                  <p>Recent show archives and on-demand content</p>
                </div>
              </div>

              <div className="cr-mobile-frame__content-section">
                <h2>Community</h2>
                <div className="cr-mobile-frame__placeholder">
                  <p>Community updates, volunteer opportunities, and announcements</p>
                </div>
              </div>

              <div className="cr-mobile-frame__content-section">
                <h2>About CHIRP</h2>
                <div className="cr-mobile-frame__placeholder">
                  <p>
                    Information about Chicago Independent Radio Project, our mission, and how to get
                    involved
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slim player fixed at bottom like a footer */}
      <div className="cr-mobile-frame__footer-player">
        <CrStreamingMusicPlayer {...defaultStreamingProps} />
      </div>
    </div>
  )

  return (
    <>
      {variant === 'landing' ? renderLandingLayout() : renderInteriorLayout()}

      {/* Mobile Sidebar - renders over everything */}
      <CrSidebar
        isOpen={isSidebarOpen}
        variant="mobile"
        onClose={handleSidebarClose}
        onLogoClick={onLogoClick}
        onHomeClick={onHomeClick}
        onNowPlayingClick={onNowPlayingClick}
        onRecentPlaylistClick={onRecentPlaylistClick}
        onYourCollectionClick={onYourCollectionClick}
        onListenClick={onListenClick}
        onPlaylistClick={onPlaylistClick}
        onPodcastClick={onPodcastClick}
        onDjsClick={onDjsClick}
        onScheduleClick={onScheduleClick}
        onEventsClick={onEventsClick}
        onArticlesClick={onArticlesClick}
        onDonateClick={onDonateClick}
        onWaysToGiveClick={onWaysToGiveClick}
        onVinylCircleClick={onVinylCircleClick}
        onShopClick={onShopClick}
        onAboutClick={onAboutClick}
        onOtherWaysToListenClick={onOtherWaysToListenClick}
        onContactClick={onContactClick}
        onBecomeVolunteerClick={onBecomeVolunteerClick}
        onRequestClick={onRequestClick}
        onAccountSettingsClick={onAccountSettingsClick}
      />
    </>
  )
}
