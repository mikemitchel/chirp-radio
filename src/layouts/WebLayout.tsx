// src/layouts/WebLayout.tsx
import React from 'react'
import CrAppHeader from '../stories/CrAppHeader'
import CrFooter from '../stories/CrFooter'
import CrSupportWithAds from '../stories/CrSupportWithAds'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import '../styles/layout.css'

interface LayoutProps {
  children: React.ReactNode
}

const WebLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AudioPlayerProvider
      autoFetch={true}
      streamUrl="https://peridot.streamguys1.com:5185/live"
      apiUrl="https://chirpradio.appspot.com/api/current_playlist"
    >
      <CrAppHeader
        autoFetch={true}
        apiUrl="https://chirpradio.appspot.com/api/current_playlist"
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
