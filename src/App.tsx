import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import MobileApp from './layouts/MobileApp';
import NowPlaying from './pages/NowPlaying';
import RecentlyPlayed from './pages/RecentlyPlayed';
import YourCollection from './pages/YourCollection';
import MakeRequest from './pages/MakeRequest';
import AccountSettings from './pages/AccountSettings';

function App() {
  // Apply dark mode preference on app initialization
  useEffect(() => {
    // Check both localStorage (logged in) and sessionStorage (logged out)
    const darkMode = localStorage.getItem('chirp-dark-mode') === 'true' ||
                     sessionStorage.getItem('chirp-dark-mode') === 'true';
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Listen for storage changes (when dark mode is toggled in another component)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chirp-dark-mode') {
        if (e.newValue === 'true') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MobileApp />}>
          <Route index element={<NowPlaying />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="recently-played" element={<RecentlyPlayed />} />
          <Route path="collection" element={<YourCollection />} />
          <Route path="request" element={<MakeRequest />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App
