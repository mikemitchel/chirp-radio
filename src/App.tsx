import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { CartProvider } from './contexts/CartContext';
import ScrollToTop from './components/ScrollToTop';
import MobileApp from './layouts/MobileApp';
import WebLayout from './layouts/WebLayout';
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
import WaysToGivePage from './pages/WaysToGivePage';
import VolunteerResourcesPage from './pages/VolunteerResourcesPage';
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
      <HashRouter>
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<MobileApp />}>
          <Route index element={<NowPlaying />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="recently-played" element={<RecentlyPlayed />} />
          <Route path="collection" element={<YourCollection />} />
          <Route path="request" element={<MakeRequest />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>
        <Route path="/web" element={<WebLayout><LandingPage /></WebLayout>} />
        <Route path="/playlist" element={<WebLayout><PlaylistPage /></WebLayout>} />
        <Route path="/listen" element={<WebLayout><ListenPage /></WebLayout>} />
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
        <Route path="/ways-to-give" element={<WebLayout><WaysToGivePage /></WebLayout>} />
        <Route path="/car-donation" element={<WebLayout><CarDonationPage /></WebLayout>} />
        <Route path="/about" element={<WebLayout><AboutPage /></WebLayout>} />
        <Route path="/contact" element={<WebLayout><ContactPage /></WebLayout>} />
        <Route path="/volunteer" element={<WebLayout><VolunteerDirectoryPage /></WebLayout>} />
        <Route path="/volunteer/calendar" element={<WebLayout><VolunteerCalendarPage /></WebLayout>} />
        <Route path="/volunteer/resources" element={<WebLayout><VolunteerResourcesPage /></WebLayout>} />
        <Route path="/thank-you" element={<WebLayout><ThankYouPage /></WebLayout>} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

export default App
