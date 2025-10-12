// src/layouts/WebLayout.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import CrAppHeader from '../stories/CrAppHeader'
import CrFooter from '../stories/CrFooter'
import CrSupportWithAds from '../stories/CrSupportWithAds'
import CrSidebar from '../stories/CrSidebar'
import CrScrim from '../stories/CrScrim'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { useCart } from '../contexts/CartContext'
import '../styles/layout.css'

interface LayoutProps {
  children: React.ReactNode
}

const WebLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const cartItemCount = getTotalItems()

  const handleMenuClick = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <AudioPlayerProvider
      autoFetch={true}
      streamUrl="https://peridot.streamguys1.com:5185/live"
      apiUrl="https://chirpradio.appspot.com/api/current_playlist"
    >
      <CrAppHeader
        autoFetch={true}
        apiUrl="https://chirpradio.appspot.com/api/current_playlist"
        onMenuClick={handleMenuClick}
        storeBadgeCount={cartItemCount}
        showStoreBadge={true}
      />

      <CrSidebar
        variant="web"
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onLogoClick={() => { navigate('/web'); handleCloseSidebar(); }}
        onHomeClick={() => { navigate('/web'); handleCloseSidebar(); }}
        onListenClick={() => { navigate('/listen'); handleCloseSidebar(); }}
        onPlaylistClick={() => { navigate('/playlist'); handleCloseSidebar(); }}
        onPodcastClick={() => { navigate('/podcasts'); handleCloseSidebar(); }}
        onDjsClick={() => { navigate('/djs'); handleCloseSidebar(); }}
        onScheduleClick={() => { navigate('/schedule'); handleCloseSidebar(); }}
        onEventsClick={() => { navigate('/events'); handleCloseSidebar(); }}
        onArticlesClick={() => { navigate('/articles'); handleCloseSidebar(); }}
        onDonateClick={() => { navigate('/donate'); handleCloseSidebar(); }}
        onWaysToGiveClick={() => { navigate('/other-ways-to-give'); handleCloseSidebar(); }}
        onVinylCircleClick={() => { navigate('/vinyl-circle'); handleCloseSidebar(); }}
        onShopClick={() => { navigate('/shop'); handleCloseSidebar(); }}
        onAboutClick={() => { navigate('/about'); handleCloseSidebar(); }}
        onOtherWaysToListenClick={() => { navigate('/other-ways-to-listen'); handleCloseSidebar(); }}
        onContactClick={() => { navigate('/contact'); handleCloseSidebar(); }}
        onBecomeVolunteerClick={() => { navigate('/volunteer'); handleCloseSidebar(); }}
        onRequestClick={() => { navigate('/request-song'); handleCloseSidebar(); }}
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
    </AudioPlayerProvider>
  )
}

export default WebLayout
