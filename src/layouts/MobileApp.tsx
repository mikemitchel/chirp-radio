// src/layouts/MobileApp.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router'
import CrMobileSplash from '../stories/CrMobileSplash'
import CrMobileAppFrame from '../stories/CrMobileAppFrame'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { NotificationProvider } from '../contexts/NotificationContext'
import GlobalNotifications from '../components/GlobalNotifications'
import { preloadFirstAvailable } from '../utils/imagePreloader'
import { upgradeImageQuality } from '../utils/imageOptimizer'

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

    // Collect all available image URLs and upgrade to 348s quality
    const imageUrls = [
      nowPlaying.lastfm_urls?.large_image,
      nowPlaying.lastfm_urls?.med_image,
      nowPlaying.lastfm_urls?.sm_image
    ]
      .filter(url => url && url.trim() !== '')
      .map(url => upgradeImageQuality(url)) // Upgrade to 348s for better quality

    // Try to preload the first available image (now all upgraded to 348s)
    let albumArtUrl = ''
    if (imageUrls.length > 0) {
      try {
        const timestampedUrls = imageUrls.map(url => `${url}?t=${Date.now()}`)
        albumArtUrl = await preloadFirstAvailable(timestampedUrls)
      } catch (error) {
        console.warn('⚠️ [Album Art - Splash] All image URLs failed to load, using fallback')
        console.warn('API lastfm_urls:', nowPlaying.lastfm_urls)
        console.warn('Attempted URLs:', imageUrls)
      }
    } else {
      // No image URLs available at all
      if (nowPlaying.lastfm_urls && nowPlaying.lastfm_urls !== null) {
        console.warn('⚠️ [Album Art - Splash] No valid image URLs found, but lastfm_urls exists:')
        console.warn('API lastfm_urls:', nowPlaying.lastfm_urls)
      }
    }

    const cachedData = {
      dj: nowPlaying.dj?.trim() || 'Unknown DJ',
      show: nowPlaying.show?.trim() || '',
      artist: nowPlaying.artist?.trim() || 'Unknown Artist',
      track: nowPlaying.track?.trim() || 'Unknown Track',
      album: nowPlaying.release?.trim() || 'Unknown Release',
      label: nowPlaying.label?.trim() || 'Unknown Label',
      albumArt: albumArtUrl, // Will be empty string if preload failed
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
  const [showSplash, setShowSplash] = useState(() => {
    // Check sessionStorage on initial mount
    const splashShown = sessionStorage.getItem('chirp-splash-shown')
    return splashShown !== 'true'
  })
  const [splashAnimationState, setSplashAnimationState] = useState<
    'fade-in' | 'visible' | 'fade-out' | 'hidden'
  >('visible')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Always navigate to Now Playing page on mount
    navigate('/')

    // Check if splash has already been shown
    const hasShownSplash = sessionStorage.getItem('chirp-splash-shown') === 'true'

    // Skip splash animation if already shown this session
    if (hasShownSplash) {
      setShowSplash(false)
      return
    }

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
  }, [])

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
    <NotificationProvider>
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

        {/* Global notifications (modal and toast) */}
        <GlobalNotifications />
      </AudioPlayerProvider>
    </NotificationProvider>
  )
}
