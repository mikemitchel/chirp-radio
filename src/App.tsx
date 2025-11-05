import { useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, useNavigate } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { CMSProvider } from './contexts/CMSContext'
import { UserProvider } from './contexts/UserContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { AudioPlayerProvider } from './contexts/AudioPlayerContext'
import { on } from './utils/eventBus'
import ScrollToTop from './components/ScrollToTop'
import RedirectChecker from './components/RedirectChecker'
import ProtectedRoute from './components/ProtectedRoute'
import OnboardingTour from './components/OnboardingTour'
import './utils/devTools' // Load development tools
import './utils/debugAlbumArt' // Load album art debug utilities
import MobileApp from './layouts/MobileApp'
import WebLayout from './layouts/WebLayout'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import NowPlaying from './pages/NowPlaying'
import RecentlyPlayed from './pages/RecentlyPlayed'
import YourCollection from './pages/YourCollection'
import MakeRequest from './pages/MakeRequest'
import AccountSettings from './pages/AccountSettings'
import LandingPage from './pages/LandingPage'
import PlaylistPage from './pages/PlaylistPage'
import VolunteerCalendarPage from './pages/VolunteerCalendarPage'
import CarDonationPage from './pages/CarDonationPage'
import AboutPage from './pages/AboutPage'
import VolunteerDirectoryPage from './pages/VolunteerDirectoryPage'
import ShopCheckoutPage from './pages/ShopCheckoutPage'
import EventsPage from './pages/EventsPage'
import ArticlesPage from './pages/ArticlesPage'
import ContactPage from './pages/ContactPage'
import OtherWaysToGivePage from './pages/OtherWaysToGivePage'
import OtherWaysToListenPage from './pages/OtherWaysToListenPage'
import BecomeVolunteerPage from './pages/BecomeVolunteerPage'
import RequestSongPage from './pages/RequestSongPage'
import DJPage from './pages/DJPage'
import DJSchedulePage from './pages/DJSchedulePage'
import DJDetailPage from './pages/DJDetailPage'
import EventDetailPage from './pages/EventDetailPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import PodcastPage from './pages/PodcastPage'
import PodcastDetailPage from './pages/PodcastDetailPage'
import ShopPage from './pages/ShopPage'
import ThankYouPage from './pages/ThankYouPage'
import ShopDetailPage from './pages/ShopDetailPage'
import DonatePage from './pages/DonatePage'
import VinylCirclePage from './pages/VinylCirclePage'
import ListenPage from './pages/ListenPage'
import LeadershipDirectoryPage from './pages/LeadershipDirectoryPage'
import VolunteerDownloadsPage from './pages/VolunteerDownloadsPage'
import WebsitesToRememberPage from './pages/WebsitesToRememberPage'
import NotFoundPage from './pages/NotFoundPage'
import ServerErrorPage from './pages/ServerErrorPage'
import ForbiddenPage from './pages/ForbiddenPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import SitemapPage from './pages/SitemapPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AdvertisementPreviewPage from './pages/AdvertisementPreviewPage'
import PageDetailPage from './pages/PageDetailPage'
import { AndroidAutoPage } from './pages/AndroidAutoPage'
import UserTypeSwitcher from './components/UserTypeSwitcher'

// Redirect component to route mobile app users to /app or /android-auto
function RootRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkPlatform = async () => {
      // If running in Capacitor (native mobile app)
      if (Capacitor.isNativePlatform()) {
        const isAndroid = Capacitor.getPlatform() === 'android'

        if (isAndroid) {
          try {
            // Check if Android Automotive
            const NowPlayingPlugin = (await import('./plugins/NowPlayingPlugin')).default
            const result = await NowPlayingPlugin.isAutomotive()

            if (result.isAutomotive) {
              navigate('/android-auto', { replace: true })
              return
            }
          } catch (error) {
            console.error('[RootRedirect] Failed to detect Android Automotive:', error)
          }
        }

        // Regular mobile app
        navigate('/app', { replace: true })
      }
    }

    checkPlatform()
  }, [navigate])

  // For web browsers, show the web landing page
  if (Capacitor.isNativePlatform()) {
    return null // Redirect happening
  }

  return <LandingPage />
}

// OnboardingWrapper to check for new users
function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Show onboarding tour if user is logged in and hasn't completed onboarding
    if (user && user.onboardingCompleted === false) {
      setShowOnboarding(true)
    } else {
      setShowOnboarding(false)
    }
  }, [user])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  return (
    <>
      {children}
      <OnboardingTour isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
    </>
  )
}

function App() {
  // Apply dark mode preference on app initialization and when it changes
  useEffect(() => {
    const applyTheme = async (mode: string) => {
      const isDark =
        mode === 'device'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : mode === 'dark'

      console.log('[App.tsx] applyTheme called - mode:', mode, 'isDark:', isDark)

      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }

      // Update status bar for native apps based on calculated isDark value
      // Android interprets these opposite to iOS:
      // Style.Dark = light status bar text (for dark app backgrounds)
      // Style.Light = dark status bar text (for light app backgrounds)
      if (Capacitor.isNativePlatform()) {
        const targetStyle = isDark ? Style.Dark : Style.Light
        console.log('[App.tsx] Setting status bar style to:', targetStyle, '(isDark:', isDark, ')')
        try {
          await StatusBar.setStyle({ style: targetStyle })
          console.log('[App.tsx] Status bar style set successfully')
        } catch (error) {
          console.warn('Failed to update status bar style:', error)
        }
      }
    }

    // Check both localStorage (logged in) and sessionStorage (logged out)
    const savedMode =
      localStorage.getItem('chirp-dark-mode') ||
      sessionStorage.getItem('chirp-dark-mode') ||
      'light'

    applyTheme(savedMode)

    // Listen for dark mode changes via typed event bus
    const unsubscribeDarkMode = on('chirp-dark-mode-change', (mode) => {
      applyTheme(mode)
    })

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      const currentMode =
        localStorage.getItem('chirp-dark-mode') ||
        sessionStorage.getItem('chirp-dark-mode') ||
        'light'
      if (currentMode === 'device') {
        applyTheme('device')
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange)

    return () => {
      unsubscribeDarkMode()
      mediaQuery.removeEventListener('change', handleSystemChange)
    }
  }, [])

  // Detect Android Automotive OS and add body class
  useEffect(() => {
    const detectAndroidAutomotive = async () => {
      const isAndroid = Capacitor.getPlatform() === 'android'

      if (!isAndroid) {
        console.log('[App.tsx] Not Android platform')
        return
      }

      try {
        // Use native API to detect Android Automotive OS
        const NowPlayingPlugin = (await import('./plugins/NowPlayingPlugin')).default
        const result = await NowPlayingPlugin.isAutomotive()
        const isAutomotive = result.isAutomotive

        console.log(`[App.tsx] Android Automotive detection: isAutomotive=${isAutomotive}`)

        if (isAutomotive) {
          document.body.classList.add('android-automotive')
          console.log('[App.tsx] ✅ Android Automotive OS detected - applying car-optimized UI')
        } else {
          document.body.classList.remove('android-automotive')
          console.log('[App.tsx] ❌ Not Android Automotive OS')
        }
      } catch (error) {
        console.error('[App.tsx] Failed to detect Android Automotive:', error)
      }
    }

    // Initial detection
    detectAndroidAutomotive()
  }, [])

  // Use HashRouter for Capacitor (file:// protocol), BrowserRouter for web
  const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter

  return (
    <HelmetProvider>
      <CMSProvider>
        <UserProvider>
          <AuthProvider>
            <OnboardingWrapper>
              <CartProvider>
                <AudioPlayerProvider
                  autoFetch={true}
                  streamUrl="https://peridot.streamguys1.com:5185/live"
                >
                  <Router>
                    <ScrollToTop />
                    <RedirectChecker />
                    <Routes>
                      {/* Android Automotive route (standalone, no layout) */}
                      <Route path="/android-auto" element={<AndroidAutoPage />} />

                      {/* Mobile app routes (Capacitor only) */}
                      <Route path="/app" element={<MobileApp />}>
                        <Route index element={<NowPlaying />} />
                        <Route path="now-playing" element={<NowPlaying />} />
                        <Route path="recently-played" element={<RecentlyPlayed />} />
                        <Route path="my-collection" element={<YourCollection />} />
                        <Route path="request" element={<MakeRequest />} />
                        <Route path="settings" element={<AccountSettings />} />
                      </Route>

                      {/* Preview pages (standalone, no layout) */}
                      <Route
                        path="/preview/advertisement/:id"
                        element={<AdvertisementPreviewPage />}
                      />

                      {/* Web layout routes */}
                      <Route element={<WebLayout />}>
                        {/* Root route - web landing for browsers, auto-redirects to /app for mobile */}
                        <Route index element={<RootRedirect />} />
                        <Route path="playlist" element={<PlaylistPage />} />
                        <Route path="listen" element={<ListenPage />} />
                        <Route path="other-ways-to-listen" element={<OtherWaysToListenPage />} />
                        <Route path="events" element={<EventsPage />} />
                        <Route path="events/:slug" element={<EventDetailPage />} />
                        <Route path="articles" element={<ArticlesPage />} />
                        <Route path="articles/:slug" element={<ArticleDetailPage />} />
                        <Route path="podcasts" element={<PodcastPage />} />
                        <Route path="podcasts/:slug" element={<PodcastDetailPage />} />
                        <Route path="djs" element={<DJPage />} />
                        <Route path="djs/:id" element={<DJDetailPage />} />
                        <Route path="schedule" element={<DJSchedulePage />} />
                        <Route path="shop" element={<ShopPage />} />
                        <Route path="shop/:id" element={<ShopDetailPage />} />
                        <Route path="shop/checkout" element={<ShopCheckoutPage />} />
                        <Route path="donate" element={<DonatePage />} />
                        <Route path="vinyl-circle" element={<VinylCirclePage />} />
                        <Route path="other-ways-to-give" element={<OtherWaysToGivePage />} />
                        <Route path="car-donation" element={<CarDonationPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="volunteer" element={<BecomeVolunteerPage />} />
                        <Route
                          path="volunteer-directory"
                          element={
                            <ProtectedRoute requiredRoles={['volunteer', 'dj']}>
                              <VolunteerDirectoryPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="volunteer-calendar"
                          element={
                            <ProtectedRoute requiredRoles={['volunteer', 'dj']}>
                              <VolunteerCalendarPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="leadership-directory"
                          element={
                            <ProtectedRoute requiredRoles={['volunteer', 'dj']}>
                              <LeadershipDirectoryPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="websites-to-remember"
                          element={
                            <ProtectedRoute requiredRoles={['volunteer', 'dj']}>
                              <WebsitesToRememberPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="volunteer-downloads"
                          element={
                            <ProtectedRoute requiredRoles={['volunteer', 'dj']}>
                              <VolunteerDownloadsPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="profile" element={<AccountSettings />} />
                        <Route path="collection" element={<YourCollection />} />
                        <Route path="request-song" element={<RequestSongPage />} />
                        <Route path="thank-you" element={<ThankYouPage />} />

                        {/* Legal pages */}
                        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="terms-of-service" element={<TermsOfServicePage />} />
                        <Route path="sitemap" element={<SitemapPage />} />
                        <Route path="reset-password" element={<ResetPasswordPage />} />

                        {/* Error pages */}
                        <Route path="403" element={<ForbiddenPage />} />
                        <Route path="500" element={<ServerErrorPage />} />

                        {/* Dynamic CMS pages - must come before 404 catch-all */}
                        <Route path=":slug" element={<PageDetailPage />} />

                        {/* 404 catch-all route - must be last */}
                        <Route path="*" element={<NotFoundPage />} />
                      </Route>
                    </Routes>
                  </Router>
                </AudioPlayerProvider>
                {import.meta.env.DEV && <UserTypeSwitcher />}
              </CartProvider>
            </OnboardingWrapper>
          </AuthProvider>
        </UserProvider>
      </CMSProvider>
    </HelmetProvider>
  )
}

export default App
