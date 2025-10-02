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
    const savedMode = localStorage.getItem('chirp-dark-mode') ||
                      sessionStorage.getItem('chirp-dark-mode') ||
                      'device';

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
