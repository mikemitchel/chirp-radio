import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar, type StatusBarInfo } from '@capacitor/status-bar'
import NavigationBarInfo from './plugins/NavigationBarPlugin'
import App from './App.tsx'
import './styles/index.css'
import './styles/accessibility.css'

// Set up safe area insets for Android
// iOS handles this natively via env(safe-area-inset-*), but Android needs manual setup
const platform = Capacitor.getPlatform()

if (platform === 'android') {
  // Add platform class for Android-specific CSS
  document.body.classList.add('platform-android')

  const setupSafeAreaInsets = async () => {
    try {
      const info = await StatusBar.getInfo()
      // StatusBarInfo type doesn't include height, but Android API returns it
      const statusBarHeight = (info as StatusBarInfo & { height?: number }).height ?? 24

      // Get navigation bar height from native Android API (system insets)
      const detectNavBarHeight = async () => {
        try {
          const result = await NavigationBarInfo.getNavigationBarHeight()
          return result.height
        } catch (error) {
          console.error('[CHIRP_3BTN] Failed to get nav bar height from native:', error)
          return 0
        }
      }

      const updateInsets = async () => {
        const navBarHeight = await detectNavBarHeight()
        document.documentElement.style.setProperty('--safe-area-inset-top', `${statusBarHeight}px`)
        document.documentElement.style.setProperty('--safe-area-inset-bottom', `${navBarHeight}px`)
        document.documentElement.style.setProperty('--safe-area-inset-left', '0px')
        document.documentElement.style.setProperty('--safe-area-inset-right', '0px')

        // Add class to body based on navigation mode
        // Three-button mode: navBarHeight > 100px (typically 126px on high-density screens)
        // Gestural mode: navBarHeight <= 100px (small gesture bar ~42-63px on high-density screens)
        if (navBarHeight > 100) {
          document.body.classList.add('nav-three-button')
          document.body.classList.remove('nav-gestural')
          console.log('[CHIRP_3BTN] ✓ THREE-BUTTON MODE DETECTED')
          console.log('[CHIRP_3BTN] System inset bottom (from Android API):', navBarHeight + 'px')
          console.log('[CHIRP_3BTN] Using system inset directly for padding and background')
        } else {
          document.body.classList.add('nav-gestural')
          document.body.classList.remove('nav-three-button')
          console.log('[CHIRP_3BTN] ✓ GESTURAL MODE DETECTED')
          console.log('[CHIRP_3BTN] System inset bottom (from Android API):', navBarHeight + 'px')
          console.log('[CHIRP_3BTN] Minimal or no navigation bar')
        }

        console.log('[CHIRP_3BTN] Screen height:', window.screen.height)
        console.log('[CHIRP_3BTN] Window height:', window.innerHeight)
        console.log('[CHIRP_3BTN] Status bar height:', statusBarHeight)
        console.log(
          '[CHIRP_3BTN] CSS --safe-area-inset-top:',
          getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')
        )
        console.log(
          '[CHIRP_3BTN] CSS --safe-area-inset-bottom:',
          getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')
        )
      }

      updateInsets()

      // Re-check insets on window/viewport resize
      const handleResize = () => updateInsets()
      window.addEventListener('resize', handleResize)
      window.visualViewport?.addEventListener('resize', handleResize)
    } catch (error) {
      console.error('Failed to setup safe area insets:', error)
    }
  }

  setupSafeAreaInsets()
}

console.log('[SPLASH] main.tsx: Starting React render at', Date.now())
createRoot(document.getElementById('root')!).render(<App />)
