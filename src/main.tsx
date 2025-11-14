import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar, type StatusBarInfo } from '@capacitor/status-bar'
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

      // Detect navigation bar height by comparing screen height to window height
      const detectNavBarHeight = () => {
        // Get the actual screen height vs viewport height
        const screenHeight = window.screen.height
        const windowHeight = window.innerHeight
        const statusBarPx = statusBarHeight

        // Calculate the difference (this should be nav bar if present)
        // Account for status bar and any other chrome
        const diff = screenHeight - windowHeight - statusBarPx

        // If difference is significant (>20px), there's likely a nav bar
        // Typical nav bar heights: 48px (default), 56px (large), 0 (gesture nav)
        const navBarHeight = diff > 20 ? diff : 0

        console.log(
          '[SafeArea] Screen:',
          screenHeight,
          'Window:',
          windowHeight,
          'StatusBar:',
          statusBarPx,
          'NavBar:',
          navBarHeight
        )
        return navBarHeight
      }

      const updateInsets = () => {
        const navBarHeight = detectNavBarHeight()
        document.documentElement.style.setProperty('--safe-area-inset-top', `${statusBarHeight}px`)
        document.documentElement.style.setProperty('--safe-area-inset-bottom', `${navBarHeight}px`)
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
