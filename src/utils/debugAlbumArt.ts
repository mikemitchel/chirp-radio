// Debug utilities for testing album art fallback chain
import { debugFlags } from './albumArtFallback'
import { emit } from './eventBus'

// Expose to window immediately
if (typeof window !== 'undefined') {
  (window as any).testAlbumArtFallback = {
    forceLastFmFail: () => {
      debugFlags.forceLastFmFail = true
      debugFlags.forceItunesFail = false
      debugFlags.forceMusicBrainzFail = false
      emit('chirp-force-refresh')
      console.log('🎨 Last.fm will fail → iTunes will be tried')
    },
    forceItunesFail: () => {
      debugFlags.forceLastFmFail = true
      debugFlags.forceItunesFail = true
      debugFlags.forceMusicBrainzFail = false
      emit('chirp-force-refresh')
      console.log('🎨 Last.fm + iTunes will fail → MusicBrainz will be tried')
    },
    forceMusicBrainzFail: () => {
      debugFlags.forceLastFmFail = true
      debugFlags.forceItunesFail = true
      debugFlags.forceMusicBrainzFail = true
      emit('chirp-force-refresh')
      console.log('🎨 All services will fail → CMS fallback images will be used')
    },
    reset: () => {
      debugFlags.forceLastFmFail = false
      debugFlags.forceItunesFail = false
      debugFlags.forceMusicBrainzFail = false
      emit('chirp-force-refresh')
      console.log('🎨 All services restored → Normal fallback chain')
    },
    help: () => {
      console.log(`
🎨 Album Art Fallback Testing
=============================

Available commands:
  testAlbumArtFallback.forceLastFmFail()      - Skip Last.fm, test iTunes
  testAlbumArtFallback.forceItunesFail()      - Skip Last.fm + iTunes, test MusicBrainz
  testAlbumArtFallback.forceMusicBrainzFail() - Skip all services, test CMS fallbacks
  testAlbumArtFallback.reset()                - Restore normal behavior
  testAlbumArtFallback.help()                 - Show this help

Fallback chain: Last.fm → iTunes → MusicBrainz → CMS Random Images
      `)
    },
  }

  console.log('💡 Type testAlbumArtFallback.help() to see album art testing commands')
}

export {}
