import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'org.chirpradio.app',
  appName: 'chirp-radio',
  webDir: 'dist',
  server: {
    // Allow the app to make requests to external APIs
    allowNavigation: ['chirpradio.appspot.com', 'peridot.streamguys1.com'],
    // Configure proxy for API requests
    // Note: Capacitor doesn't support proxying like Vite does
    // We need to handle this differently in the app code
  },
  ios: {
    contentInset: 'automatic',
    // Allow cleartext (HTTP) for audio streaming if needed
  },
}

export default config
