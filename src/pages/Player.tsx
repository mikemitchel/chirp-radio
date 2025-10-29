// src/pages/Player.tsx
import WebLayout from '../layouts/WebLayout'
import MobileApp from '../layouts/MobileApp'
import { useEffect, useState } from 'react'
import { AudioPlayerUI } from '../components/UseAudioPlayerUI'

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

  const Layout = isMobile ? MobileApp : WebLayout

  return (
    <Layout>
      <div>
        <h1 className="text-xl font-bold mb-4">Now Playing</h1>
        <AudioPlayerUI />
      </div>
    </Layout>
  )
}
