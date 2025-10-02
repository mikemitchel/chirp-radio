import { HashRouter, Routes, Route } from 'react-router';
import MobileApp from './layouts/MobileApp';
import NowPlaying from './pages/NowPlaying';
import RecentlyPlayed from './pages/RecentlyPlayed';
import YourCollection from './pages/YourCollection';
import MakeRequest from './pages/MakeRequest';
import AccountSettings from './pages/AccountSettings';

function App() {
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
