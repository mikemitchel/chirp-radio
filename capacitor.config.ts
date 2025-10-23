import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'org.chirpradio.app',
  appName: 'chirp-radio',
  webDir: 'dist',
  server: {
    // Allow the app to make requests to external APIs
    allowNavigation: [
      'https://chirpradio.appspot.com/*',
      'https://peridot.streamguys1.com/*',
      'https://*.lastfm.freetls.fastly.net/*',
    ],
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
      launchShowDuration: 3000, // Show for 3 seconds
      launchAutoHide: true, // Auto-hide after duration
      backgroundColor: '#ea1c2c', // CHIRP red
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: false,
    },
  },
}

export default config
