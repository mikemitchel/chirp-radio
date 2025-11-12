import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'org.chicagoindependentradio.chirpradio-v1',
  appName: 'CHIRP Radio',
  webDir: 'dist',
  server: {
    // Allow the app to make requests to external APIs
    allowNavigation: [
      'https://chirpradio.appspot.com/*',
      'https://peridot.streamguys1.com/*',
      'https://*.lastfm.freetls.fastly.net/*',
    ],
    // Disable caching to always load fresh JavaScript on rebuild
    cleartext: true,
    androidScheme: 'http',
  },
  ios: {
    contentInset: 'never',
  },
  plugins: {
    StatusBar: {
      style: 'dark', // Dark content = dark text/icons (for light mode app)
      overlay: true, // Make status bar transparent/overlay
    },
    SplashScreen: {
      launchShowDuration: 0, // Don't auto-hide - let app control
      launchAutoHide: false, // Manual control
      launchFadeOutDuration: 300, // Fast 300ms fade
      backgroundColor: '#ea1c2c', // CHIRP red
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: false,
    },
  },
}

export default config
