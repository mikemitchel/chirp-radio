// src/layouts/MobileApp.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router'
import CrMobileSplash from '../stories/CrMobileSplash'
import CrMobileAppFrame from '../stories/CrMobileAppFrame'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'

// Preload now playing data and cache it
const preloadNowPlayingData = async () => {
  // Always use proxy path to avoid CORS issues
  const fetchUrl = `/api/current_playlist?t=${Date.now()}`

  try {
    const response = await fetch(fetchUrl)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

    const parsedData = await response.json()

    if (!parsedData || !parsedData.now_playing) throw new Error('Invalid API response')

    const nowPlaying = parsedData.now_playing
    const cachedData = {
      dj: nowPlaying.dj?.trim() || 'Unknown DJ',
      show: nowPlaying.show?.trim() || '',
      artist: nowPlaying.artist?.trim() || 'Unknown Artist',
      track: nowPlaying.track?.trim() || 'Unknown Track',
      album: nowPlaying.release?.trim() || 'Unknown Release',
      label: nowPlaying.label?.trim() || 'Unknown Label',
      albumArt:
        nowPlaying.lastfm_urls?.large_image ||
        nowPlaying.lastfm_urls?.med_image ||
        nowPlaying.lastfm_urls?.sm_image ||
        '',
      isLocal: nowPlaying.artist_is_local || false,
      timestamp: Date.now(),
    }

    // Cache the data
    sessionStorage.setItem('chirp-now-playing', JSON.stringify(cachedData))
    return cachedData
  } catch (error) {
    console.error('Error preloading now playing data:', error)
    return null
  }
}

export default function MobileApp() {
  // Check if splash has already been shown this session
  const hasShownSplash = sessionStorage.getItem('chirp-splash-shown') === 'true'

  const [showSplash, setShowSplash] = useState(!hasShownSplash)
  const [splashAnimationState, setSplashAnimationState] = useState<
    'fade-in' | 'visible' | 'fade-out' | 'hidden'
  >('visible')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Skip splash animation if already shown this session
    if (hasShownSplash) {
      return
    }

    // Navigate to Now Playing page on first load
    navigate('/')

    let hideTimer: NodeJS.Timeout

    // Start preloading data immediately and wait for it
    const initializeApp = async () => {
      // Start preloading
      const preloadPromise = preloadNowPlayingData()

      // Animation sequence while data loads:
      // 1. Visible immediately (splash blocks content)
      // 2. Stay visible (at least 2s, but wait for data if needed)
      // 3. Fade out (500ms)

      // Wait at least 2s for the visible state, but also wait for data
      await Promise.all([new Promise((resolve) => setTimeout(resolve, 2000)), preloadPromise])

      // Now start fade out
      setSplashAnimationState('fade-out')

      // Hide after fade out completes
      hideTimer = setTimeout(() => {
        setSplashAnimationState('hidden')
        setShowSplash(false)
        // Mark splash as shown for this session
        sessionStorage.setItem('chirp-splash-shown', 'true')
      }, 500)
    }

    initializeApp()

    return () => {
      clearTimeout(hideTimer)
    }
  }, [hasShownSplash])

  // Determine if we're on the landing page (Now Playing)
  const isLandingPage = location.pathname === '/' || location.pathname === '/now-playing'

  // Get dynamic page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/now-playing':
        return 'Now Playing'
      case '/recently-played':
        return 'Recently Played'
      case '/collection':
        return 'Your Collection'
      case '/request':
        return 'Make a Request'
      case '/settings':
        return 'Account Settings'
      default:
        return 'CHIRP Radio'
    }
  }

  // Navigation handlers for sidebar
  const handleHomeClick = () => navigate('/')
  const handleNowPlayingClick = () => navigate('/')
  const handleRecentlyPlayedClick = () => navigate('/recently-played')
  const handleYourCollectionClick = () => navigate('/collection')
  const handleRequestClick = () => navigate('/request')
  const handleAccountSettingsClick = () => navigate('/settings')

  // External link handlers for web app features
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank')
  }

  const handleListenClick = () => handleExternalLink('https://chirpradio.org/listen')
  const handlePlaylistClick = () => handleExternalLink('https://chirpradio.org/playlist')
  const handlePodcastClick = () => handleExternalLink('https://chirpradio.org/podcast')
  const handleDjsClick = () => handleExternalLink('https://chirpradio.org/djs')
  const handleScheduleClick = () => handleExternalLink('https://chirpradio.org/schedule')
  const handleEventsClick = () => handleExternalLink('https://chirpradio.org/events')
  const handleArticlesClick = () => handleExternalLink('https://chirpradio.org/articles')
  const handleDonateClick = () => handleExternalLink('https://chirpradio.org/donate')
  const handleWaysToGiveClick = () => handleExternalLink('https://chirpradio.org/ways-to-give')
  const handleVinylCircleClick = () => handleExternalLink('https://chirpradio.org/vinyl-circle')
  const handleShopClick = () => handleExternalLink('https://chirpradio.org/shop')
  const handleAboutClick = () => handleExternalLink('https://chirpradio.org/about')
  const handleOtherWaysToListenClick = () =>
    handleExternalLink('https://chirpradio.org/other-ways-to-listen')
  const handleContactClick = () => handleExternalLink('https://chirpradio.org/contact')
  const handleBecomeVolunteerClick = () => handleExternalLink('https://chirpradio.org/volunteer')

  return (
    <AudioPlayerProvider
      autoFetch={true}
      streamUrl="https://peridot.streamguys1.com:5185/live"
      apiUrl="https://chirpradio.appspot.com/api/current_playlist"
    >
      {/* Always render the app frame so it's ready */}
      <CrMobileAppFrame
        variant={isLandingPage ? 'landing' : 'interior'}
        pageTitle={getPageTitle()}
        onLogoClick={handleHomeClick}
        onHomeClick={handleHomeClick}
        onNowPlayingClick={handleNowPlayingClick}
        onRecentPlaylistClick={handleRecentlyPlayedClick}
        onYourCollectionClick={handleYourCollectionClick}
        onRequestClick={handleRequestClick}
        onAccountSettingsClick={handleAccountSettingsClick}
        onListenClick={handleListenClick}
        onPlaylistClick={handlePlaylistClick}
        onPodcastClick={handlePodcastClick}
        onDjsClick={handleDjsClick}
        onScheduleClick={handleScheduleClick}
        onEventsClick={handleEventsClick}
        onArticlesClick={handleArticlesClick}
        onDonateClick={handleDonateClick}
        onWaysToGiveClick={handleWaysToGiveClick}
        onVinylCircleClick={handleVinylCircleClick}
        onShopClick={handleShopClick}
        onAboutClick={handleAboutClick}
        onOtherWaysToListenClick={handleOtherWaysToListenClick}
        onContactClick={handleContactClick}
        onBecomeVolunteerClick={handleBecomeVolunteerClick}
      >
        <Outlet />
      </CrMobileAppFrame>

      {/* Render splash on top when needed */}
      {showSplash && (
        <CrMobileSplash className={`splash-animation splash-animation--${splashAnimationState}`} />
      )}
    </AudioPlayerProvider>
  )
}
