// src/layouts/WebLayout.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import CrAppHeader from '../stories/CrAppHeader'
import CrFooter from '../stories/CrFooter'
import CrSupportWithAds from '../stories/CrSupportWithAds'
import CrSidebar from '../stories/CrSidebar'
import CrScrim from '../stories/CrScrim'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { NotificationProvider } from '../contexts/NotificationContext'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../hooks/useAuth'
import type { UserRole } from '../hooks/useAuth'
import '../styles/layout.css'

interface LayoutProps {
  children: React.ReactNode
}

const WebLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const { isLoggedIn, user, switchProfile, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const cartItemCount = getTotalItems()

  // Listen for profile switch events from console
  useEffect(() => {
    const handleProfileSwitch = (event: CustomEvent<UserRole>) => {
      switchProfile(event.detail)
      // Trigger a page reload or state update to reflect changes
      window.location.reload()
    }

    const handleLogout = () => {
      logout()
      window.location.reload()
    }

    window.addEventListener('chirp-switch-profile', handleProfileSwitch as EventListener)
    window.addEventListener('chirp-logout', handleLogout)
    return () => {
      window.removeEventListener('chirp-switch-profile', handleProfileSwitch as EventListener)
      window.removeEventListener('chirp-logout', handleLogout)
    }
  }, [switchProfile, logout])

  const handleMenuClick = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  // Login/Signup handlers
  const handleLoginClick = () => {
    // Simulate login for demo - switch to listener by default
    switchProfile('listener')
    window.location.reload()
  }

  const handleSignUpClick = () => {
    // Simulate signup for demo - switch to listener by default
    switchProfile('listener')
    window.location.reload()
  }

  // User menu handlers
  const handleProfileClick = () => navigate('/profile')
  const handleFavoritesClick = () => navigate('/collection')
  const handleSignOutClick = () => {
    logout()
    window.location.href = '/web'
  }

  // Volunteer menu handlers
  const handleVolunteerDirectoryClick = () => navigate('/volunteer-directory')
  const handleLeadershipDirectoryClick = () => navigate('/leadership-directory')
  const handleVolunteerCalendarClick = () => navigate('/volunteer-calendar')
  const handleWebsitesClick = () => navigate('/websites-to-remember')
  const handleDownloadsClick = () => navigate('/volunteer-downloads')

  return (
    <NotificationProvider>
      <AudioPlayerProvider
        autoFetch={true}
        streamUrl="https://peridot.streamguys1.com:5185/live"
        apiUrl="https://chirpradio.appspot.com/api/current_playlist"
      >
        <CrAppHeader
        autoFetch={true}
        apiUrl="https://chirpradio.appspot.com/api/current_playlist"
        onMenuClick={handleMenuClick}
        storeBadgeCount={cartItemCount}
        showStoreBadge={true}
        isLoggedIn={isLoggedIn}
        isVolunteer={user?.role === 'volunteer' || user?.role === 'dj'}
        userName={user?.djName || user?.name}
        userAvatar={user?.avatar}
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
        onProfileClick={handleProfileClick}
        onFavoritesClick={handleFavoritesClick}
        onSignOutClick={handleSignOutClick}
        onVolunteerDirectoryClick={handleVolunteerDirectoryClick}
        onLeadershipDirectoryClick={handleLeadershipDirectoryClick}
        onVolunteerCalendarClick={handleVolunteerCalendarClick}
        onWebsitesClick={handleWebsitesClick}
        onDownloadsClick={handleDownloadsClick}
      />

      <CrSidebar
        variant="web"
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onLogoClick={() => { navigate('/web'); handleCloseSidebar(); }}
        onHomeClick={() => { navigate('/web'); handleCloseSidebar(); }}
        onListenClick={() => { navigate('/listen'); handleCloseSidebar(); }}
        onPlaylistClick={() => { navigate('/playlist'); handleCloseSidebar(); }}
        onPodcastClick={() => { navigate('/podcasts'); handleCloseSidebar(); }}
        onDjsClick={() => { navigate('/djs'); handleCloseSidebar(); }}
        onScheduleClick={() => { navigate('/schedule'); handleCloseSidebar(); }}
        onEventsClick={() => { navigate('/events'); handleCloseSidebar(); }}
        onArticlesClick={() => { navigate('/articles'); handleCloseSidebar(); }}
        onDonateClick={() => { navigate('/donate'); handleCloseSidebar(); }}
        onWaysToGiveClick={() => { navigate('/other-ways-to-give'); handleCloseSidebar(); }}
        onVinylCircleClick={() => { navigate('/vinyl-circle'); handleCloseSidebar(); }}
        onShopClick={() => { navigate('/shop'); handleCloseSidebar(); }}
        onAboutClick={() => { navigate('/about'); handleCloseSidebar(); }}
        onOtherWaysToListenClick={() => { navigate('/other-ways-to-listen'); handleCloseSidebar(); }}
        onContactClick={() => { navigate('/contact'); handleCloseSidebar(); }}
        onBecomeVolunteerClick={() => { navigate('/volunteer'); handleCloseSidebar(); }}
        onRequestClick={() => { navigate('/request-song'); handleCloseSidebar(); }}
      />

      <CrScrim
        isVisible={isSidebarOpen}
        onClick={handleCloseSidebar}
        zIndex={999}
        center={false}
        padding={false}
      />

      <main>{children}</main>
      <div className="web-layout-footer-container">
        <div className="support-with-ads-wrapper">
          <CrSupportWithAds />
        </div>
        <CrFooter />
      </div>
      </AudioPlayerProvider>
    </NotificationProvider>
  )
}

export default WebLayout
