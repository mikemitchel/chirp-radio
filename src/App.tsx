import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router';
import { CartProvider } from './contexts/CartContext';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import './utils/devTools'; // Load development tools
import MobileApp from './layouts/MobileApp';
import WebLayout from './layouts/WebLayout';
import { Capacitor } from '@capacitor/core';
import NowPlaying from './pages/NowPlaying';
import RecentlyPlayed from './pages/RecentlyPlayed';
import YourCollection from './pages/YourCollection';
import MakeRequest from './pages/MakeRequest';
import AccountSettings from './pages/AccountSettings';
import LandingPage from './pages/LandingPage';
import PlaylistPage from './pages/PlaylistPage';
import VolunteerCalendarPage from './pages/VolunteerCalendarPage';
import CarDonationPage from './pages/CarDonationPage';
import AboutPage from './pages/AboutPage';
import VolunteerDirectoryPage from './pages/VolunteerDirectoryPage';
import ShopCheckoutPage from './pages/ShopCheckoutPage';
import EventsPage from './pages/EventsPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import OtherWaysToGivePage from './pages/OtherWaysToGivePage';
import OtherWaysToListenPage from './pages/OtherWaysToListenPage';
import VolunteerResourcesPage from './pages/VolunteerResourcesPage';
import BecomeVolunteerPage from './pages/BecomeVolunteerPage';
import RequestSongPage from './pages/RequestSongPage';
import DJPage from './pages/DJPage';
import DJSchedulePage from './pages/DJSchedulePage';
import DJDetailPage from './pages/DJDetailPage';
import EventDetailPage from './pages/EventDetailPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import PodcastPage from './pages/PodcastPage';
import PodcastDetailPage from './pages/PodcastDetailPage';
import ShopPage from './pages/ShopPage';
import ThankYouPage from './pages/ThankYouPage';
import ShopDetailPage from './pages/ShopDetailPage';
import DonatePage from './pages/DonatePage';
import VinylCirclePage from './pages/VinylCirclePage';
import ListenPage from './pages/ListenPage';
import LeadershipDirectoryPage from './pages/LeadershipDirectoryPage';
import VolunteerDownloadsPage from './pages/VolunteerDownloadsPage';
import WebsitesToRememberPage from './pages/WebsitesToRememberPage';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';
import ForbiddenPage from './pages/ForbiddenPage';

// Redirect component to route mobile app users to /app
function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // If running in Capacitor (native mobile app), redirect to /app
    if (Capacitor.isNativePlatform()) {
      navigate('/app', { replace: true });
    }
  }, [navigate]);

  // For web browsers, show the web landing page
  if (Capacitor.isNativePlatform()) {
    return null; // Redirect happening
  }

  return <WebLayout><LandingPage /></WebLayout>;
}

function App() {
  // Apply dark mode preference on app initialization
  useEffect(() => {
    // Check both localStorage (logged in) and sessionStorage (logged out)
    const savedMode = localStorage.getItem('chirp-dark-mode') ||
                      sessionStorage.getItem('chirp-dark-mode') ||
                      'light';

    const applyTheme = (mode: string) => {
      if (mode === 'device') {
        // Follow system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      } else if (mode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    };

    applyTheme(savedMode);

    // Listen for system preference changes (only if mode is 'device')
    if (savedMode === 'device') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('device');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
        {/* Root route - web landing for browsers, auto-redirects to /app for mobile */}
        <Route index element={<RootRedirect />} />

        {/* Mobile app routes (Capacitor only) */}
        <Route path="/app" element={<MobileApp />}>
          <Route index element={<NowPlaying />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="recently-played" element={<RecentlyPlayed />} />
          <Route path="my-collection" element={<ProtectedRoute requireLogin={true}><YourCollection /></ProtectedRoute>} />
          <Route path="request" element={<MakeRequest />} />
          <Route path="settings" element={<ProtectedRoute requireLogin={true}><AccountSettings /></ProtectedRoute>} />
        </Route>
        <Route path="/playlist" element={<WebLayout><PlaylistPage /></WebLayout>} />
        <Route path="/listen" element={<WebLayout><ListenPage /></WebLayout>} />
        <Route path="/other-ways-to-listen" element={<WebLayout><OtherWaysToListenPage /></WebLayout>} />
        <Route path="/events" element={<WebLayout><EventsPage /></WebLayout>} />
        <Route path="/events/:id" element={<WebLayout><EventDetailPage /></WebLayout>} />
        <Route path="/articles" element={<WebLayout><ArticlesPage /></WebLayout>} />
        <Route path="/articles/:id" element={<WebLayout><ArticleDetailPage /></WebLayout>} />
        <Route path="/podcasts" element={<WebLayout><PodcastPage /></WebLayout>} />
        <Route path="/podcasts/:id" element={<WebLayout><PodcastDetailPage /></WebLayout>} />
        <Route path="/djs" element={<WebLayout><DJPage /></WebLayout>} />
        <Route path="/djs/:id" element={<WebLayout><DJDetailPage /></WebLayout>} />
        <Route path="/schedule" element={<WebLayout><DJSchedulePage /></WebLayout>} />
        <Route path="/shop" element={<WebLayout><ShopPage /></WebLayout>} />
        <Route path="/shop/:id" element={<WebLayout><ShopDetailPage /></WebLayout>} />
        <Route path="/shop/checkout" element={<WebLayout><ShopCheckoutPage /></WebLayout>} />
        <Route path="/donate" element={<WebLayout><DonatePage /></WebLayout>} />
        <Route path="/vinyl-circle" element={<WebLayout><VinylCirclePage /></WebLayout>} />
        <Route path="/other-ways-to-give" element={<WebLayout><OtherWaysToGivePage /></WebLayout>} />
        <Route path="/car-donation" element={<WebLayout><CarDonationPage /></WebLayout>} />
        <Route path="/about" element={<WebLayout><AboutPage /></WebLayout>} />
        <Route path="/contact" element={<WebLayout><ContactPage /></WebLayout>} />
        <Route path="/volunteer" element={<WebLayout><BecomeVolunteerPage /></WebLayout>} />
        <Route path="/volunteer-directory" element={<WebLayout><ProtectedRoute requiredRoles={['volunteer', 'dj']}><VolunteerDirectoryPage /></ProtectedRoute></WebLayout>} />
        <Route path="/volunteer-calendar" element={<WebLayout><ProtectedRoute requiredRoles={['volunteer', 'dj']}><VolunteerCalendarPage /></ProtectedRoute></WebLayout>} />
        <Route path="/volunteer/resources" element={<WebLayout><ProtectedRoute requiredRoles={['volunteer', 'dj']}><VolunteerResourcesPage /></ProtectedRoute></WebLayout>} />
        <Route path="/leadership-directory" element={<WebLayout><ProtectedRoute requiredRoles={['volunteer', 'dj']}><LeadershipDirectoryPage /></ProtectedRoute></WebLayout>} />
        <Route path="/websites-to-remember" element={<WebLayout><ProtectedRoute requiredRoles={['volunteer', 'dj']}><WebsitesToRememberPage /></ProtectedRoute></WebLayout>} />
        <Route path="/volunteer-downloads" element={<WebLayout><ProtectedRoute requiredRoles={['volunteer', 'dj']}><VolunteerDownloadsPage /></ProtectedRoute></WebLayout>} />
        <Route path="/profile" element={<WebLayout><ProtectedRoute requireLogin={true}><AccountSettings /></ProtectedRoute></WebLayout>} />
        <Route path="/collection" element={<WebLayout><ProtectedRoute requireLogin={true}><YourCollection /></ProtectedRoute></WebLayout>} />
        <Route path="/request-song" element={<WebLayout><RequestSongPage /></WebLayout>} />
        <Route path="/thank-you" element={<WebLayout><ThankYouPage /></WebLayout>} />

        {/* Error pages */}
        <Route path="/403" element={<WebLayout><ForbiddenPage /></WebLayout>} />
        <Route path="/500" element={<WebLayout><ServerErrorPage /></WebLayout>} />

        {/* 404 catch-all route - must be last */}
        <Route path="*" element={<WebLayout><NotFoundPage /></WebLayout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App
