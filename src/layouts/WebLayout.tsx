// src/layouts/WebLayout.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import CrAppHeader from '../stories/CrAppHeader'
import CrFooter from '../stories/CrFooter'
import CrSupportWithAds from '../stories/CrSupportWithAds'
import CrSidebar from '../stories/CrSidebar'
import CrScrim from '../stories/CrScrim'
import CrStreamingMusicPlayer from '../stories/CrStreamingMusicPlayer'
import GlobalNotifications from '../components/GlobalNotifications'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { NotificationProvider, useNotification } from '../contexts/NotificationContext'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../hooks/useAuth'
import { useCurrentShow } from '../hooks/useData'
import type { UserRole } from '../hooks/useAuth'
import '../styles/layout.css'

interface LayoutProps {
  children: React.ReactNode
}

const WebLayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const { isLoggedIn, user, switchProfile, logout } = useAuth()
  const { showToast } = useNotification()
  const { data: currentShow } = useCurrentShow()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showBottomPlayer, setShowBottomPlayer] = useState(false)

  const cartItemCount = getTotalItems()

  // Scroll detection for bottom player
  useEffect(() => {
    const handleScroll = () => {
      // Get the header height (CrAppHeader)
      const header = document.querySelector('.cr-app-header')
      const headerHeight = header ? header.offsetHeight : 200

      // Show player when scrolled past header, hide when at top
      if (window.scrollY > headerHeight) {
        setShowBottomPlayer(true)
      } else {
        setShowBottomPlayer(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show toast if flags are set (for post-reload toasts)
  useEffect(() => {
    const showLogoutToast = sessionStorage.getItem('chirp-show-logout-toast')
    const showLoginToast = sessionStorage.getItem('chirp-show-login-toast')
    const showSignupToast = sessionStorage.getItem('chirp-show-signup-toast')

    if (showLogoutToast === 'true') {
      sessionStorage.removeItem('chirp-show-logout-toast')
      showToast({
        message: 'Successfully logged out',
        type: 'success',
        duration: 3000,
      })
    }

    if (showLoginToast === 'true') {
      sessionStorage.removeItem('chirp-show-login-toast')
      showToast({
        message: 'Successfully logged in',
        type: 'success',
        duration: 3000,
      })
    }

    if (showSignupToast === 'true') {
      sessionStorage.removeItem('chirp-show-signup-toast')
      showToast({
        message: 'Account created successfully',
        type: 'success',
        duration: 3000,
      })
    }
  }, [showToast])

  // Listen for profile switch events from console
  useEffect(() => {
    const handleProfileSwitch = (event: CustomEvent<UserRole>) => {
      switchProfile(event.detail)
      sessionStorage.setItem('chirp-show-login-toast', 'true')
      window.location.reload()
    }

    const handleLogout = () => {
      logout()
      sessionStorage.setItem('chirp-show-logout-toast', 'true')
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
    sessionStorage.setItem('chirp-show-login-toast', 'true')
    window.location.reload()
  }

  const handleSignUpClick = () => {
    // Simulate signup for demo - switch to listener by default
    switchProfile('listener')
    sessionStorage.setItem('chirp-show-signup-toast', 'true')
    window.location.reload()
  }

  // User menu handlers
  const handleProfileClick = () => navigate('/profile')
  const handleFavoritesClick = () => navigate('/collection')
  const handleSignOutClick = () => {
    logout()
    // Store toast flag for after redirect
    sessionStorage.setItem('chirp-show-logout-toast', 'true')
    window.location.href = '/#/'
  }

  // Volunteer menu handlers
  const handleVolunteerDirectoryClick = () => navigate('/volunteer-directory')
  const handleLeadershipDirectoryClick = () => navigate('/leadership-directory')
  const handleVolunteerCalendarClick = () => navigate('/volunteer-calendar')
  const handleWebsitesClick = () => navigate('/websites-to-remember')
  const handleDownloadsClick = () => navigate('/volunteer-downloads')

  return (
    <AudioPlayerProvider
      autoFetch={true}
      streamUrl="https://peridot.streamguys1.com:5185/live"
      apiUrl="https://chirpradio.appspot.com/api/current_playlist"
    >
      <CrAppHeader
        autoFetch={false}
        djName={currentShow?.djName}
        showName={currentShow?.showName}
        onMenuClick={handleMenuClick}
        storeBadgeCount={cartItemCount}
        showStoreBadge={true}
        isLoggedIn={isLoggedIn}
        isVolunteer={user?.role === 'volunteer' || user?.role === 'dj'}
        userName={user?.name}
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
        onLogoClick={() => {
          navigate('/')
          handleCloseSidebar()
        }}
        onHomeClick={() => {
          navigate('/')
          handleCloseSidebar()
        }}
        onListenClick={() => {
          navigate('/listen')
          handleCloseSidebar()
        }}
        onPlaylistClick={() => {
          navigate('/playlist')
          handleCloseSidebar()
        }}
        onPodcastClick={() => {
          navigate('/podcasts')
          handleCloseSidebar()
        }}
        onDjsClick={() => {
          navigate('/djs')
          handleCloseSidebar()
        }}
        onScheduleClick={() => {
          navigate('/schedule')
          handleCloseSidebar()
        }}
        onEventsClick={() => {
          navigate('/events')
          handleCloseSidebar()
        }}
        onArticlesClick={() => {
          navigate('/articles')
          handleCloseSidebar()
        }}
        onDonateClick={() => {
          navigate('/donate')
          handleCloseSidebar()
        }}
        onWaysToGiveClick={() => {
          navigate('/other-ways-to-give')
          handleCloseSidebar()
        }}
        onVinylCircleClick={() => {
          navigate('/vinyl-circle')
          handleCloseSidebar()
        }}
        onShopClick={() => {
          navigate('/shop')
          handleCloseSidebar()
        }}
        onAboutClick={() => {
          navigate('/about')
          handleCloseSidebar()
        }}
        onOtherWaysToListenClick={() => {
          navigate('/other-ways-to-listen')
          handleCloseSidebar()
        }}
        onContactClick={() => {
          navigate('/contact')
          handleCloseSidebar()
        }}
        onBecomeVolunteerClick={() => {
          navigate('/volunteer')
          handleCloseSidebar()
        }}
        onRequestClick={() => {
          navigate('/request-song')
          handleCloseSidebar()
        }}
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

      {/* Fixed Bottom Player - slides up when scrolling past header */}
      <div
        className={`web-layout-bottom-player ${showBottomPlayer ? 'web-layout-bottom-player--visible' : ''}`}
      >
        <CrStreamingMusicPlayer variant="mini-player" autoFetch={true} />
      </div>

      {/* Global Notifications - Toasts & Modals */}
      <GlobalNotifications />
    </AudioPlayerProvider>
  )
}

// Wrapper to provide NotificationProvider context
const WebLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <WebLayoutContent>{children}</WebLayoutContent>
    </NotificationProvider>
  )
}

export default WebLayout
