// src/pages/Player.tsx
import WebLayout from '../layouts/WebLayout'
import MobileLayout from '../layouts/MobileLayout'
import DesktopLayout from '../layouts/DesktopLayout'
import { useEffect, useState } from 'react'
import AudioPlayerUI from '../components/AudioControls'

export default function PlayerPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const Layout = isMobile ? MobileLayout : DesktopLayout

  return (
    <WebLayout>
      <Layout>
        <h1 className="text-xl font-bold mb-4">Now Playing</h1>
        <AudioPlayerUI />
      </Layout>
    </WebLayout>
  )
}
