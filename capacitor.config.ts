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
    // StatusBar: Removed - let native MainActivity.java handle it completely
    // The Capacitor StatusBar plugin was overriding our native navigation bar settings
    SplashScreen: {
      launchShowDuration: 3000, // Show for at least 3 seconds (app controls final hide)
      launchAutoHide: false, // Manual control via SplashScreen.hide() in app
      launchFadeOutDuration: 500, // Smooth 500ms fade when hiding
      backgroundColor: '#ea1c2c', // CHIRP red
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: false,
    },
  },
}

export default config
