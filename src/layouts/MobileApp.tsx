// src/layouts/MobileApp.tsx
import { useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router'
import { Capacitor, CapacitorHttp } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import CrMobileAppFrame from '../stories/CrMobileAppFrame'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { NotificationProvider } from '../contexts/NotificationContext'
import GlobalNotifications from '../components/GlobalNotifications'
import { preloadFirstAvailable } from '../utils/imagePreloader'
import { upgradeImageQuality } from '../utils/imageOptimizer'
import { createLogger } from '../utils/logger'
import { useAuth, type UserRole } from '../contexts/AuthContext'

const log = createLogger('MobileApp')

// Preload now playing data and cache it
const preloadNowPlayingData = async () => {
  // For Capacitor (native apps), use full URL since proxy isn't available
  // For web, use proxy path to avoid CORS issues
  const isNative = Capacitor.isNativePlatform()
  const baseUrl = isNative ? 'https://chirpradio.appspot.com' : ''
  const fetchUrl = `${baseUrl}/api/current_playlist?t=${Date.now()}`

  log.log('Preloading data...')
  log.log('isNative:', isNative)
  log.log('fetchUrl:', fetchUrl)

  try {
    log.log('Starting fetch to:', fetchUrl)
    let parsedData

    // Use CapacitorHttp on native platforms
    if (isNative) {
      const httpResponse = await CapacitorHttp.get({ url: fetchUrl })
      log.log('Response received, status:', httpResponse.status)
      if (httpResponse.status !== 200) throw new Error(`HTTP error! Status: ${httpResponse.status}`)
      parsedData = httpResponse.data
    } else {
      const response = await fetch(fetchUrl)
      log.log('Response received, status:', response.status)
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      parsedData = await response.json()
    }

    if (!parsedData || !parsedData.now_playing) throw new Error('Invalid API response')

    const nowPlaying = parsedData.now_playing
    log.log('Loaded track:', nowPlaying.artist, '-', nowPlaying.track)

    // Collect all available image URLs and upgrade to 348s quality
    const imageUrls = [
      nowPlaying.lastfm_urls?.large_image,
      nowPlaying.lastfm_urls?.med_image,
      nowPlaying.lastfm_urls?.sm_image,
    ]
      .filter((url) => url && url.trim() !== '')
      .map((url) => upgradeImageQuality(url)) // Upgrade to 348s for better quality

    // Try to preload the first available image (now all upgraded to 348s)
    let albumArtUrl = ''
    if (imageUrls.length > 0) {
      try {
        const timestampedUrls = imageUrls.map((url) => `${url}?t=${Date.now()}`)
        albumArtUrl = await preloadFirstAvailable(timestampedUrls)
      } catch {
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
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    })
    return null
  }
}

export default function MobileApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const { switchProfile, logout } = useAuth()

  useEffect(() => {
    console.log('🚀 [SPLASH] MobileApp mounted at', new Date().toISOString())

    // Always navigate to Now Playing page on mount
    navigate('/app')

    // Check if splash has already been shown
    const hasShownSplash = sessionStorage.getItem('chirp-splash-shown') === 'true'
    console.log('🔍 [SPLASH] Has shown splash this session:', hasShownSplash)

    // Start preloading data immediately
    const initializeApp = async () => {
      console.log('⏱️ [SPLASH] Starting app initialization at', new Date().toISOString())

      // Start preloading
      const preloadPromise = preloadNowPlayingData()

      // Wait for data to load (no minimum time on subsequent loads)
      if (hasShownSplash) {
        console.log('⏭️ [SPLASH] Subsequent load - hide splash immediately after data')
        await preloadPromise
        console.log('✅ [SPLASH] Data preloaded, hiding Capacitor splash')
        if (Capacitor.isNativePlatform()) {
          await SplashScreen.hide().catch((err) => console.warn('❌ [SPLASH] Failed to hide splash screen:', err))
        }
        console.log('🏁 [SPLASH] Splash hidden')
      } else {
        // First load - show splash for at least 2 seconds
        console.log('⏳ [SPLASH] First load - waiting 2s and for data preload...')
        await Promise.all([new Promise((resolve) => setTimeout(resolve, 2000)), preloadPromise])
        console.log('✅ [SPLASH] Wait complete, data preloaded at', new Date().toISOString())

        // Hide Capacitor splash with fade
        if (Capacitor.isNativePlatform()) {
          console.log('🎬 [SPLASH] Hiding Capacitor splash with fade')
          await SplashScreen.hide().catch((err) => console.warn('❌ [SPLASH] Failed to hide splash screen:', err))
          console.log('✓ [SPLASH] Capacitor splash hidden')
        }

        // Mark splash as shown for this session
        sessionStorage.setItem('chirp-splash-shown', 'true')
        console.log('🏁 [SPLASH] All splash transitions complete')
      }
    }

    initializeApp()
  }, [])

  // Listen for profile switch events from console (devTools)
  useEffect(() => {
    const handleProfileSwitch = (event: CustomEvent<UserRole>) => {
      switchProfile(event.detail)
      sessionStorage.setItem('chirp-show-login-toast', 'true')
      window.location.reload()
    }

    const handleLogout = () => {
      logout()
      sessionStorage.setItem('chirp-show-logout-toast', 'true')
      // For mobile app, always navigate to app landing then reload
      window.location.href = '/app'
    }

    window.addEventListener('chirp-switch-profile', handleProfileSwitch as EventListener)
    window.addEventListener('chirp-logout', handleLogout)
    return () => {
      window.removeEventListener('chirp-switch-profile', handleProfileSwitch as EventListener)
      window.removeEventListener('chirp-logout', handleLogout)
    }
  }, [switchProfile, logout])

  // Determine if we're on the landing page (Now Playing)
  const isLandingPage = location.pathname === '/app' || location.pathname === '/app/now-playing'

  // Get dynamic page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/app':
      case '/app/now-playing':
        return 'Now Playing'
      case '/app/recently-played':
        return 'Recently Played'
      case '/app/my-collection':
        return 'Your Collection'
      case '/app/request':
        return 'Make a Request'
      case '/app/settings':
        return 'Account Settings'
      default:
        return 'CHIRP Radio'
    }
  }

  // Navigation handlers for sidebar
  const handleHomeClick = () => navigate('/app')
  const handleNowPlayingClick = () => navigate('/app')
  const handleRecentlyPlayedClick = () => navigate('/app/recently-played')
  const handleYourCollectionClick = () => navigate('/app/my-collection')
  const handleRequestClick = () => navigate('/app/request')
  const handleAccountSettingsClick = () => navigate('/app/settings')

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

        {/* Global notifications (modal and toast) */}
        <GlobalNotifications />
      </AudioPlayerProvider>
    </NotificationProvider>
  )
}
