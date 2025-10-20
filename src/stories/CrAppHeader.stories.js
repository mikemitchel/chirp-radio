// CrAppHeader.stories.tsx
import React from 'react'
import CrAppHeader from './CrAppHeader'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Organisms/CrAppHeader',
  component: CrAppHeader,
  decorators: [
    (Story) => React.createElement(BrowserRouter, null, React.createElement(AuthProvider, null, React.createElement(AudioPlayerProvider, null, React.createElement(Story)))),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CrAppHeader uses the CrTopBanner molecule, the CrBrandBanner molecule, and the CrMainNav molecule. This component provides the complete application header combining user account info, current DJ display, CHIRP logo with music player, and main navigation. This complex header composition makes it a proper Organism. Supports logged-in/out states, store badge counts, and responsive behavior. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Account props
    isLoggedIn: {
      control: 'boolean',
      description: 'Whether the user is logged in',
    },
    isVolunteer: {
      control: 'boolean',
      description: 'Whether the user is a volunteer',
    },
    userName: {
      control: 'text',
      description: 'User display name',
    },
    userAvatar: {
      control: 'text',
      description: 'URL for user avatar image',
    },

    // DJ/Show props
    djName: {
      control: 'text',
      description: 'Name of the current DJ',
    },
    showName: {
      control: 'text',
      description: 'Name of the current show',
    },
    isOnAir: {
      control: 'boolean',
      description: 'Whether to show the on-air status',
    },
    statusText: {
      control: 'text',
      description: 'Text to display in the status chip',
    },

    // API props
    autoFetch: {
      control: 'boolean',
      description: 'Whether to fetch live data from API',
    },
    apiUrl: {
      control: 'text',
      description: 'API URL for fetching live data',
    },

    // Navigation props
    storeBadgeCount: {
      control: { type: 'number', min: 0, max: 99 },
      description: 'Number to display in store badge',
    },
    showStoreBadge: {
      control: 'boolean',
      description: 'Whether to show the store badge',
    },
  },
}

// Default state - logged in volunteer
export const Default = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Johanna Dough',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air',
    storeBadgeCount: 5,
    showStoreBadge: true,
    streamingPlayerProps: {
      variant: 'slim-player',
      trackName: 'Take Five',
      artistName: 'Dave Brubeck Quartet',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Time_out_album_cover.jpg',
      isTrackAdded: false,
      autoFetch: false,
    },
  },
}

// Logged out user
export const LoggedOut = {
  args: {
    isLoggedIn: false,
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air',
    storeBadgeCount: 3,
    showStoreBadge: true,
    streamingPlayerProps: {
      variant: 'slim-player',
      trackName: 'Blue Train',
      artistName: 'John Coltrane',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg',
      isTrackAdded: false,
      autoFetch: false,
    },
  },
}

// Regular user (not volunteer)
export const RegularUser = {
  args: {
    isLoggedIn: true,
    isVolunteer: false,
    userName: 'Music Lover',
    userAvatar: 'https://images.unsplash.com/photo-1524666041070-9d87656c25bb',
    djName: 'DJ Sarah',
    showName: 'Morning Jazz',
    isOnAir: true,
    statusText: 'On-Air',
    storeBadgeCount: 8,
    showStoreBadge: true,
    streamingPlayerProps: {
      variant: 'slim-player',
      trackName: 'So What',
      artistName: 'Miles Davis',
      albumArt:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Kind_of_Blue_%281959%2C_CL_1355%29_album_cover.jpg/500px-Kind_of_Blue_%281959%2C_CL_1355%29_album_cover.jpg',
      isTrackAdded: true,
      autoFetch: false,
    },
  },
}

// No store badge
export const NoStoreBadge = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Johanna Dough',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air',
    showStoreBadge: false,
    streamingPlayerProps: {
      variant: 'slim-player',
      trackName: 'Giant Steps',
      artistName: 'John Coltrane',
      albumArt:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Coltrane_Giant_Steps.jpg/500px-Coltrane_Giant_Steps.jpg',
      isTrackAdded: false,
      autoFetch: false,
    },
  },
}

// Live API Data Example
export const WithLiveData = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Live Demo User',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    djName: 'DJ Current', // Will be overridden by API data
    showName: 'The Current Show', // Will be overridden by API data if available
    isOnAir: true,
    statusText: 'On-Air',
    storeBadgeCount: 5,
    showStoreBadge: true,
    // Enable API fetching for TopBanner
    autoFetch: true,
    apiUrl: 'https://chirpradio.appspot.com/api/current_playlist',
    streamingPlayerProps: {
      variant: 'slim-player',
      autoFetch: true,
      apiUrl: 'https://chirpradio.appspot.com/api/current_playlist',
      streamUrl: 'https://peridot.streamguys1.com:5185/live',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'CrAppHeader with live API data fetching enabled. Both the top banner DJ info and the streaming player will automatically fetch current data from the CHIRP Radio API. The DJ name will come from the API, and show name will be displayed if available in the API response.',
      },
    },
  },
}
