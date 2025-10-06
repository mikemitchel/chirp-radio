// src/layouts/WebLayout.tsx
import React from 'react'
import CrAppHeader from '../stories/CrAppHeader'
import CrFooter from '../stories/CrFooter'
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
      <CrAppHeader />
      <main>{children}</main>
      <CrFooter />
    </AudioPlayerProvider>
  )
}

export default WebLayout
