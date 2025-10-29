// CrSidebar.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { PiHandHeartLight, PiChatCircleTextLight, PiGear } from 'react-icons/pi'
import CrButton from './CrButton'
import CrLogo from './CrLogo'
import CrMenuButton from './CrMenuButton'
import './CrSidebar.css'

interface CrSidebarProps {
  isOpen?: boolean
  variant?: 'web' | 'mobile'
  onClose?: () => void
  onLogoClick?: () => void
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

export default function CrSidebar({
  isOpen = false,
  variant = 'web', // 'web' or 'mobile'
  onClose,
  onLogoClick,
  onHomeClick,

  // Mobile-specific handlers
  onNowPlayingClick,
  onRecentPlaylistClick,
  onYourCollectionClick,

  // Shared navigation handlers
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
}: CrSidebarProps) {
  // Try to use location, but handle case where Router isn't available (e.g., Storybook)
  // Note: Hook must be called unconditionally (Rules of Hooks)
  let location: { pathname: string } | null = null
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation()
  } catch {
    // Router not available (e.g., Storybook)
    location = null
  }

  // Disable body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (variant === 'mobile') {
    return (
      <>
        {/* Backdrop overlay */}
        {isOpen && <div className="cr-sidebar__backdrop" onClick={onClose} />}

        {/* Mobile Sidebar */}
        <div
          className={`cr-sidebar cr-sidebar--mobile ${isOpen ? 'cr-sidebar--open' : 'cr-sidebar--closed'}`}
        >
          <div className="cr-sidebar__content">
            {/* Mobile Close Button */}
            <div className="cr-sidebar__close-button">
              <CrMenuButton variant="close" layout="icon-right" text="CLOSE" onClick={onClose} />
            </div>

            {/* Header Section */}
            <div className="cr-sidebar__header">
              <div
                className="cr-sidebar__logo-section"
                onClick={() => {
                  if (onLogoClick) onLogoClick()
                  onClose?.()
                }}
              >
                <CrLogo variant="horizontal" color="primary" />
              </div>

              {/* Mobile-specific top sections */}
              <div className="cr-sidebar__mobile-sections">
                <button
                  className={`cr-sidebar__mobile-nav-item ${location?.pathname === '/app' ? 'cr-sidebar__mobile-nav-item--active' : ''}`}
                  onClick={() => {
                    onNowPlayingClick?.()
                    onClose?.()
                  }}
                >
                  Now Playing
                </button>
                <button
                  className={`cr-sidebar__mobile-nav-item ${location?.pathname === '/app/recently-played' ? 'cr-sidebar__mobile-nav-item--active' : ''}`}
                  onClick={() => {
                    onRecentPlaylistClick?.()
                    onClose?.()
                  }}
                >
                  Recently Played
                </button>
                <button
                  className={`cr-sidebar__mobile-nav-item ${location?.pathname === '/app/my-collection' ? 'cr-sidebar__mobile-nav-item--active' : ''}`}
                  onClick={() => {
                    onYourCollectionClick?.()
                    onClose?.()
                  }}
                >
                  Your Collection
                </button>
              </div>

              <div className="cr-sidebar__divider"></div>
            </div>

            {/* Main Navigation */}
            <div className="cr-sidebar__mobile-nav">
              <button
                className="cr-sidebar__mobile-nav-link"
                onClick={() => window.open('https://chirpradio.org/podcasts', '_blank')}
              >
                Podcast
              </button>
              <button
                className="cr-sidebar__mobile-nav-link"
                onClick={() => window.open('https://chirpradio.org/schedule', '_blank')}
              >
                DJs
              </button>
              <button
                className="cr-sidebar__mobile-nav-link"
                onClick={() => window.open('https://chirpradio.org/schedule', '_blank')}
              >
                Schedule
              </button>
              <button
                className="cr-sidebar__mobile-nav-link"
                onClick={() => window.open('https://chirpradio.org/events', '_blank')}
              >
                Events
              </button>
              <button
                className="cr-sidebar__mobile-nav-link"
                onClick={() => window.open('https://chirpradio.org/blog', '_blank')}
              >
                Articles
              </button>
              <button
                className="cr-sidebar__mobile-nav-link"
                onClick={() => window.open('https://chirpradio.org/store', '_blank')}
              >
                Store
              </button>
              <button
                className="cr-sidebar__mobile-nav-link"
                onClick={() => window.open('https://chirpradio.org/donations', '_blank')}
              >
                Ways to Give
              </button>

              {/* Donate Button */}
              <div className="cr-sidebar__donate-section">
                <CrButton
                  size="medium"
                  variant="solid"
                  color="primary"
                  leftIcon={<PiHandHeartLight />}
                  onClick={() =>
                    window.open('https://chirpradio.app.neoncrm.com/forms/18', '_blank')
                  }
                >
                  Support Chirp Radio
                </CrButton>
              </div>

              {/* Request Button */}
              <div className="cr-sidebar__request-section">
                <CrButton
                  size="medium"
                  variant="solid"
                  color="secondary"
                  leftIcon={<PiChatCircleTextLight />}
                  onClick={() => {
                    onRequestClick?.()
                    onClose?.()
                  }}
                >
                  Make a Request
                </CrButton>
              </div>
            </div>

            {/* Footer section */}
            <div className="cr-sidebar__footer cr-sidebar__footer--mobile">
              {/* Account Settings button */}
              <CrButton
                size="xsmall"
                variant="text"
                color="default"
                leftIcon={<PiGear />}
                onClick={() => {
                  onAccountSettingsClick?.()
                  onClose?.()
                }}
              >
                Account Settings
              </CrButton>

              {/* CHIRPRADIO.ORG link with bird logo */}
              <button
                className="cr-sidebar__footer-chirp"
                onClick={() => window.open('https://chirpradio.org/', '_blank')}
              >
                <CrLogo variant="bird" color="primary" className="cr-sidebar__footer-bird" />
                <span className="cr-sidebar__footer-chirp-text">Chirpradio.org</span>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Web version (original)
  return (
    <>
      {/* Sidebar */}
      <div className={`cr-sidebar ${isOpen ? 'cr-sidebar--open' : 'cr-sidebar--closed'}`}>
        <div className="cr-sidebar__content">
          {/* Close Button */}
          <div className="cr-sidebar__close-button">
            <CrMenuButton variant="close" layout="icon-right" text="CLOSE" onClick={onClose} />
          </div>

          {/* Header Section */}
          <div className="cr-sidebar__header">
            <div className="cr-sidebar__logo-section" onClick={onLogoClick}>
              <CrLogo variant="vertical" color="primary" />
              <span className="cr-sidebar__home-text" onClick={onHomeClick}>
                Home
              </span>
            </div>
            <div className="cr-sidebar__divider"></div>
          </div>

          {/* Main Navigation */}
          <div className="cr-sidebar__main-nav">
            {/* Listen Section */}
            <div className="cr-sidebar__nav-section">
              <button
                className={`cr-sidebar__nav-title ${location?.pathname === '/listen' ? 'cr-sidebar__nav-title--active' : ''}`}
                onClick={onListenClick}
              >
                Listen
              </button>
              <div className="cr-sidebar__nav-items">
                <button
                  className={`cr-sidebar__nav-item ${location?.pathname === '/playlist' ? 'cr-sidebar__nav-item--active' : ''}`}
                  onClick={onPlaylistClick}
                >
                  Playlist
                </button>
                <button
                  className={`cr-sidebar__nav-item ${location?.pathname === '/podcast' ? 'cr-sidebar__nav-item--active' : ''}`}
                  onClick={onPodcastClick}
                >
                  Podcast
                </button>
                <button
                  className={`cr-sidebar__nav-item ${location?.pathname === '/djs' ? 'cr-sidebar__nav-item--active' : ''}`}
                  onClick={onDjsClick}
                >
                  DJs
                </button>
                <button
                  className={`cr-sidebar__nav-item ${location?.pathname === '/schedule' ? 'cr-sidebar__nav-item--active' : ''}`}
                  onClick={onScheduleClick}
                >
                  Schedule
                </button>
              </div>
            </div>

            <div className="cr-sidebar__divider"></div>

            {/* Events and Articles */}
            <div className="cr-sidebar__nav-section">
              <button
                className={`cr-sidebar__nav-title ${location?.pathname === '/events' ? 'cr-sidebar__nav-title--active' : ''}`}
                onClick={onEventsClick}
              >
                Events
              </button>
              <button
                className={`cr-sidebar__nav-title ${location?.pathname === '/articles' ? 'cr-sidebar__nav-title--active' : ''}`}
                onClick={onArticlesClick}
              >
                Articles
              </button>
            </div>

            <div className="cr-sidebar__divider"></div>

            {/* Support Section */}
            <div className="cr-sidebar__nav-section">
              <div className="cr-sidebar__donate-section">
                <CrButton
                  size="medium"
                  variant="solid"
                  color="primary"
                  leftIcon={<PiHandHeartLight />}
                  onClick={onDonateClick}
                >
                  DONATE
                </CrButton>
              </div>

              <button
                className={`cr-sidebar__nav-subtitle ${location?.pathname === '/donate' || location?.pathname === '/car-donation' || location?.pathname === '/other-ways-to-give' ? 'cr-sidebar__nav-subtitle--active' : ''}`}
                onClick={onWaysToGiveClick}
              >
                Other Ways to Give
              </button>
              <button
                className={`cr-sidebar__nav-subtitle ${location?.pathname === '/vinyl-circle' ? 'cr-sidebar__nav-subtitle--active' : ''}`}
                onClick={onVinylCircleClick}
              >
                CHIRP Vinyl Circle
              </button>
              <button
                className={`cr-sidebar__nav-subtitle ${location?.pathname === '/shop' ? 'cr-sidebar__nav-subtitle--active' : ''}`}
                onClick={onShopClick}
              >
                Shop
              </button>
            </div>

            <div className="cr-sidebar__divider"></div>

            {/* About Section */}
            <div className="cr-sidebar__nav-section">
              <button
                className={`cr-sidebar__nav-subtitle ${location?.pathname === '/about' ? 'cr-sidebar__nav-subtitle--active' : ''}`}
                onClick={onAboutClick}
              >
                About
              </button>
              <button
                className={`cr-sidebar__nav-subtitle ${location?.pathname === '/other-ways-to-listen' ? 'cr-sidebar__nav-subtitle--active' : ''}`}
                onClick={onOtherWaysToListenClick}
              >
                Other Ways to Listen
              </button>
              <button
                className={`cr-sidebar__nav-subtitle ${location?.pathname === '/contact' ? 'cr-sidebar__nav-subtitle--active' : ''}`}
                onClick={onContactClick}
              >
                Contact
              </button>
              <button
                className={`cr-sidebar__nav-subtitle ${location?.pathname === '/become-volunteer' ? 'cr-sidebar__nav-subtitle--active' : ''}`}
                onClick={onBecomeVolunteerClick}
              >
                Become a Volunteer
              </button>
            </div>

            <div className="cr-sidebar__divider"></div>

            {/* Request Button */}
            <div className="cr-sidebar__request-section">
              <CrButton
                size="medium"
                variant="solid"
                color="secondary"
                leftIcon={<PiChatCircleTextLight />}
                onClick={onRequestClick}
              >
                Request a Song
              </CrButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
