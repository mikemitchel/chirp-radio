import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar } from '@capacitor/status-bar'
import App from './App.tsx'
import './styles/index.css'
import './styles/accessibility.css'

// Set up safe area insets for Android
// iOS handles this natively via env(safe-area-inset-*), but Android needs manual setup
const platform = Capacitor.getPlatform()

if (platform === 'android') {
  const setupSafeAreaInsets = async () => {
    try {
      const info = await StatusBar.getInfo()
      const statusBarHeight = info.height || 24
      const ANDROID_NAV_BAR_HEIGHT = 48

      const updateInsets = () => {
        document.documentElement.style.setProperty('--safe-area-inset-top', `${statusBarHeight}px`)
        document.documentElement.style.setProperty(
          '--safe-area-inset-bottom',
          `${ANDROID_NAV_BAR_HEIGHT}px`
        )
        document.documentElement.style.setProperty('--safe-area-inset-left', '0px')
        document.documentElement.style.setProperty('--safe-area-inset-right', '0px')
      }

      updateInsets()
      window.addEventListener('resize', updateInsets)
      window.visualViewport?.addEventListener('resize', updateInsets)
    } catch (error) {
      console.error('Failed to setup safe area insets:', error)
    }
  }

  setupSafeAreaInsets()
}

console.log('[SPLASH] main.tsx: Starting React render at', Date.now())
createRoot(document.getElementById('root')!).render(<App />)
