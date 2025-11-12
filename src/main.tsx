import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar } from '@capacitor/status-bar'
import App from './App.tsx'
import './styles/index.css'
import './styles/accessibility.css'

// Set up safe area insets for Android
// iOS handles this natively via env(safe-area-inset-*), but Android needs manual setup
const platform = Capacitor.getPlatform()
console.log('🔍 Platform detected:', platform)

if (platform === 'android') {
  console.log('🤖 Setting up Android safe area insets...')

  const setupSafeAreaInsets = async () => {
    try {
      console.log('📊 Getting status bar info...')
      // Get status bar info
      const info = await StatusBar.getInfo()
      console.log('📊 StatusBar info:', info)
      const statusBarHeight = info.height || 24 // fallback to 24px
      console.log('📊 Status bar height:', statusBarHeight)

      // Android navigation bar height
      // Most devices have either:
      // - Gesture navigation: ~16-20px
      // - 3-button navigation: ~48px
      // We'll use 48px as a safe default since edge-to-edge mode makes detection unreliable
      const ANDROID_NAV_BAR_HEIGHT = 48

      const updateInsets = () => {
        const navBarHeight = ANDROID_NAV_BAR_HEIGHT
        console.log('📊 Navigation bar height (default):', navBarHeight)

        // Set CSS custom properties that match iOS env() variable names
        document.documentElement.style.setProperty('--safe-area-inset-top', `${statusBarHeight}px`)
        document.documentElement.style.setProperty('--safe-area-inset-bottom', `${navBarHeight}px`)
        document.documentElement.style.setProperty('--safe-area-inset-left', '0px')
        document.documentElement.style.setProperty('--safe-area-inset-right', '0px')

        console.log('✅ Android Safe Areas SET:', {
          top: statusBarHeight,
          bottom: navBarHeight,
        })
        console.log('✅ CSS variables:', {
          top: getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top'),
          bottom: getComputedStyle(document.documentElement).getPropertyValue(
            '--safe-area-inset-bottom'
          ),
        })
      }

      // Initial setup
      updateInsets()

      // Update on resize/orientation change
      window.addEventListener('resize', updateInsets)
      window.visualViewport?.addEventListener('resize', updateInsets)
    } catch (error) {
      console.error('Failed to setup safe area insets:', error)
    }
  }

  setupSafeAreaInsets()
}

createRoot(document.getElementById('root')!).render(<App />)
