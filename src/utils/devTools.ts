// src/utils/devTools.ts
// Development tools for testing - attach functions to window object

import type { UserRole } from '../hooks/useAuth'

// Define the devTools that will be available in the console
export const devTools = {
  switchProfile: (role: UserRole) => {
    // Dispatch a custom event that the app can listen to
    window.dispatchEvent(new CustomEvent('chirp-switch-profile', { detail: role }))
  },

  logout: () => {
    // Dispatch a custom event to log out
    window.dispatchEvent(new CustomEvent('chirp-logout'))
  },

  showProfiles: () => {
    console.log(`
🎭 Available Test Profiles
==========================

Commands:
  switchProfile('listener')   - Regular listener (no volunteer button)
  switchProfile('volunteer')  - Volunteer (has volunteer dropdown)
  switchProfile('dj')         - DJ (volunteer dropdown + DJ permissions)
  logout()                    - Log out (show logged out state)

Profiles:
  • Listener:  Jane Listener   (listener@chirpradio.org)
  • Volunteer: Sam Volunteer   (volunteer@chirpradio.org)
  • DJ:        DJ Awesome      (dj@chirpradio.org)

Example usage:
  switchProfile('volunteer')
  logout()
    `)
  },

  simulateAPIStream: () => {
    const mockTracks = [
      {
        artist: 'The Beatles',
        track: 'Here Comes The Sun',
        album: 'Abbey Road',
        albumArt:
          'https://coverartarchive.org/release/72db542f-9bcc-4fc4-9191-6a487c1d4853/front-500.jpg',
      },
      {
        artist: 'Pink Floyd',
        track: 'Time',
        album: 'The Dark Side of the Moon',
        albumArt:
          'https://coverartarchive.org/release/12fb801c-5903-4a99-a10c-7af599fe3986/front-500.jpg',
      },
      {
        artist: 'Radiohead',
        track: 'Karma Police',
        album: 'OK Computer',
        albumArt:
          'https://coverartarchive.org/release/a736eb98-ba6b-3e42-ad80-a65f648910a3/front-500.jpg',
      },
      {
        artist: 'Fleetwood Mac',
        track: 'Dreams',
        album: 'Rumours',
        albumArt:
          'https://coverartarchive.org/release/7ba2862e-9431-4368-8fc7-9eb3e7fcf42e/front-500.jpg',
      },
      {
        artist: 'David Bowie',
        track: 'Heroes',
        album: 'Heroes',
        albumArt:
          'https://coverartarchive.org/release/bdba3f99-52c8-434c-968d-b30b93dbc01e/front-500.jpg',
      },
    ]

    let currentIndex = 0

    const cycle = () => {
      const track = mockTracks[currentIndex]

      // Create TrackData format (same as AudioPlayerContext stores)
      const trackData = {
        dj: 'Test DJ',
        show: 'Test Show',
        artist: track.artist,
        track: track.track,
        album: track.album,
        label: 'Test Label',
        albumArt: track.albumArt,
        isLocal: false,
        playedAtGmt: new Date().toISOString(),
        detailsUpdatedAt: new Date().toISOString(),
        timestamp: Date.now(),
      }

      // Store in sessionStorage (same format as real API)
      sessionStorage.setItem('chirp-now-playing', JSON.stringify(trackData))

      // Dispatch custom event to trigger AudioPlayerContext refresh
      window.dispatchEvent(new CustomEvent('chirp-force-refresh'))

      console.log(
        `🎵 Track ${currentIndex + 1}/${mockTracks.length}:`,
        track.artist,
        '-',
        track.track
      )

      currentIndex = (currentIndex + 1) % mockTracks.length
    }

    console.log('🎵 Starting API stream simulation (5 second intervals)')
    console.log('🛑 Stop with: stopAPIStream()')

    // Enable simulation mode
    sessionStorage.setItem('chirp-simulation-mode', 'true')

    cycle() // Run immediately
    const intervalId = window.setInterval(cycle, 5000) as unknown as number

    // Store interval ID for stopping
    interface WindowWithDevTools extends Window {
      __apiSimulationInterval?: number;
    }
    (window as WindowWithDevTools).__apiSimulationInterval = intervalId

    return intervalId
  },

  stopAPIStream: () => {
    interface WindowWithDevTools extends Window {
      __apiSimulationInterval?: number;
    }
    const intervalId = (window as WindowWithDevTools).__apiSimulationInterval
    if (intervalId) {
      clearInterval(intervalId)
      delete (window as WindowWithDevTools).__apiSimulationInterval

      // Disable simulation mode
      sessionStorage.removeItem('chirp-simulation-mode')
      sessionStorage.removeItem('chirp-now-playing')

      console.log('🛑 API stream simulation stopped')
      console.log('   Refresh page to resume normal API polling')
    } else {
      console.log('⚠️  No simulation running')
    }
  },

  testImageLoad: (url: string) => {
    console.log('🖼️  Testing image load:', url)

    const img = new Image()
    const startTime = performance.now()

    img.onload = () => {
      const loadTime = Math.round(performance.now() - startTime)
      console.log(`✅ Image loaded in ${loadTime}ms`)
      console.log(`   Size: ${img.width} x ${img.height}`)
    }

    img.onerror = (e) => {
      const loadTime = Math.round(performance.now() - startTime)
      console.log(`❌ Image failed after ${loadTime}ms`)
      console.error('   Error:', e)
    }

    img.src = url
  },

  showHelp: () => {
    console.log(`
🛠️  CHIRP DevTools
=================

Profile Management:
  showProfiles()              - Show available test profiles
  switchProfile('listener')   - Switch to listener profile
  switchProfile('volunteer')  - Switch to volunteer profile
  switchProfile('dj')         - Switch to DJ profile
  logout()                    - Log out

API Stream Simulation:
  simulateAPIStream()         - Start simulating track changes
  stopAPIStream()             - Stop simulation

Image Testing:
  testImageLoad(url)          - Test image loading performance
  `)
  },
}

// Attach to window in development mode
if (process.env.NODE_ENV === 'development') {
  interface WindowWithDevTools extends Window {
    switchProfile: typeof devTools.switchProfile;
    logout: typeof devTools.logout;
    showProfiles: typeof devTools.showProfiles;
    simulateAPIStream: typeof devTools.simulateAPIStream;
    stopAPIStream: typeof devTools.stopAPIStream;
    testImageLoad: typeof devTools.testImageLoad;
    showHelp: typeof devTools.showHelp;
  }
  const w = window as unknown as WindowWithDevTools
  w.switchProfile = devTools.switchProfile
  w.logout = devTools.logout
  w.showProfiles = devTools.showProfiles
  w.simulateAPIStream = devTools.simulateAPIStream
  w.stopAPIStream = devTools.stopAPIStream
  w.testImageLoad = devTools.testImageLoad
  w.showHelp = devTools.showHelp

  console.log('🛠️  DevTools loaded! Type showHelp() for commands')
}

export default devTools
