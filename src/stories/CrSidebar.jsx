// CrSidebar.jsx
import React from 'react';
import { 
  PiHandHeartLight, 
  PiChatCircleTextLight, 
  PiMusicNotes, 
  PiGearLight
} from 'react-icons/pi';
import CrButton from './CrButton';
import CrLogo from './CrLogo';
import CrMenuButton from './CrMenuButton';
import './CrSidebar.css';

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
  onAccountSettingsClick
}) {

  if (variant === 'mobile') {
    return (
      <>
        {/* Backdrop overlay */}
        {isOpen && <div className="cr-sidebar__backdrop" onClick={onClose} />}
        
        {/* Mobile Sidebar */}
        <div className={`cr-sidebar cr-sidebar--mobile ${isOpen ? 'cr-sidebar--open' : 'cr-sidebar--closed'}`}>
          <div className="cr-sidebar__content">
            
            {/* Mobile Close Button */}
            <div className="cr-sidebar__close-button">
              <CrMenuButton
                variant="close"
                layout="icon-right"
                text="CLOSE"
                onClick={onClose}
              />
            </div>
            
            {/* Header Section */}
            <div className="cr-sidebar__header">
              <div className="cr-sidebar__logo-section" onClick={onLogoClick}>
                <CrLogo 
                  variant="horizontal-reversed"
                  color="black"
                />
              </div>
              
              {/* Mobile-specific top sections */}
              <div className="cr-sidebar__mobile-sections">
                <button className="cr-sidebar__mobile-nav-item" onClick={onNowPlayingClick}>
                  Now Playing
                </button>
                <button className="cr-sidebar__mobile-nav-item" onClick={onRecentPlaylistClick}>
                  Recently Played
                </button>
                <button className="cr-sidebar__mobile-nav-item" onClick={onYourCollectionClick}>
                  Your Collection
                </button>
              </div>
              
              <div className="cr-sidebar__divider"></div>
            </div>

            {/* Main Navigation - Mobile Listen Section */}
            <div className="cr-sidebar__mobile-listen-section">
              <button className="cr-sidebar__nav-title" onClick={onListenClick}>
                Listen
              </button>
              <div className="cr-sidebar__nav-items">
                <button className="cr-sidebar__nav-item" onClick={onPlaylistClick}>
                  Playlist
                </button>
                <button className="cr-sidebar__nav-item" onClick={onPodcastClick}>
                  Podcast
                </button>
                <button className="cr-sidebar__nav-item" onClick={onDjsClick}>
                  DJs
                </button>
                <button className="cr-sidebar__nav-item" onClick={onScheduleClick}>
                  Schedule
                </button>
              </div>

              <div className="cr-sidebar__divider"></div>

              {/* Events and Articles */}
              <button className="cr-sidebar__nav-title" onClick={onEventsClick}>
                Events
              </button>
              <button className="cr-sidebar__nav-title" onClick={onArticlesClick}>
                Articles
              </button>

              <div className="cr-sidebar__divider"></div>

              {/* Donate Section */}
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

              <button className="cr-sidebar__nav-subtitle" onClick={onWaysToGiveClick}>
                Other Ways to Give
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onVinylCircleClick}>
                CHIRP Vinyl Circle
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onShopClick}>
                Shop
              </button>

              <div className="cr-sidebar__divider"></div>

              <button className="cr-sidebar__nav-subtitle" onClick={onAboutClick}>
                About
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onOtherWaysToListenClick}>
                Other Ways to Listen
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onContactClick}>
                Contact
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onBecomeVolunteerClick}>
                Become a Volunteer
              </button>

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
                  REQUEST A SONG
                </CrButton>
              </div>
            </div>

            {/* Footer section */}
            <div className="cr-sidebar__footer">
              {/* Account Settings button using CrButton */}
              <CrButton
                size="medium"
                variant="text"
                color="default"
                leftIcon={<PiGearLight />}
                onClick={onAccountSettingsClick}
              >
                ACCOUNT SETTINGS
              </CrButton>

              {/* Mobile CHIRPRADIO.ORG link with bird logo */}
              <button className="cr-sidebar__footer-logo" onClick={onLogoClick}>
                <CrLogo 
                  variant="bird"
                  color="black"
                />
                <span className="cr-sidebar__footer-url">CHIRPRADIO.ORG</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Web version (original)
  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && <div className="cr-sidebar__backdrop" />}
      
      {/* Sidebar */}
      <div className={`cr-sidebar ${isOpen ? 'cr-sidebar--open' : 'cr-sidebar--closed'}`}>
        <div className="cr-sidebar__content">
          
          {/* Header Section */}
          <div className="cr-sidebar__header">
            <div className="cr-sidebar__logo-section" onClick={onLogoClick}>
              <CrLogo 
                variant="vertical"
                color="black"
              />
              <span className="cr-sidebar__home-text" onClick={onHomeClick}>Home</span>
            </div>
            <div className="cr-sidebar__divider"></div>
          </div>

          {/* Main Navigation */}
          <div className="cr-sidebar__main-nav">
            
            {/* Listen Section */}
            <div className="cr-sidebar__nav-section">
              <button className="cr-sidebar__nav-title" onClick={onListenClick}>
                Listen
              </button>
              <div className="cr-sidebar__nav-items">
                <button className="cr-sidebar__nav-item" onClick={onPlaylistClick}>
                  Playlist
                </button>
                <button className="cr-sidebar__nav-item" onClick={onPodcastClick}>
                  Podcast
                </button>
                <button className="cr-sidebar__nav-item" onClick={onDjsClick}>
                  DJs
                </button>
                <button className="cr-sidebar__nav-item" onClick={onScheduleClick}>
                  Schedule
                </button>
              </div>
            </div>

            <div className="cr-sidebar__divider"></div>

            {/* Events and Articles */}
            <div className="cr-sidebar__nav-section">
              <button className="cr-sidebar__nav-title" onClick={onEventsClick}>
                Events
              </button>
              <button className="cr-sidebar__nav-title" onClick={onArticlesClick}>
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

              <button className="cr-sidebar__nav-subtitle" onClick={onWaysToGiveClick}>
                Other Ways to Give
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onVinylCircleClick}>
                CHIRP Vinyl Circle
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onShopClick}>
                Shop
              </button>
            </div>

            <div className="cr-sidebar__divider"></div>

            {/* About Section */}
            <div className="cr-sidebar__nav-section">
              <button className="cr-sidebar__nav-subtitle" onClick={onAboutClick}>
                About
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onOtherWaysToListenClick}>
                Other Ways to Listen
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onContactClick}>
                Contact
              </button>
              <button className="cr-sidebar__nav-subtitle" onClick={onBecomeVolunteerClick}>
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
                REQUEST A SONG
              </CrButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}