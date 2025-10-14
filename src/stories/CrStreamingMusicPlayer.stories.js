// CrStreamingMusicPlayer.stories.tsx
import React from 'react'
import CrStreamingMusicPlayer from './CrStreamingMusicPlayer'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { AuthProvider } from '../contexts/AuthContext'

export default {
  title: 'Templates/CrStreamingMusicPlayer',
  component: CrStreamingMusicPlayer,
  decorators: [
    (Story) =>
      React.createElement(
        AuthProvider,
        null,
        React.createElement(AudioPlayerProvider, null, React.createElement(Story))
      ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CrStreamingMusicPlayer uses the CrCurrentDj molecule, the CrTrackInfo molecule, the CrLogo atom, the CrButton atom, the CrChip atom, and the CrMobileHeader molecule. This component provides complete music streaming interface with multiple variants (full-player, slim-player, mobile-player). Includes play/pause controls, track information, DJ details, and collection management. This comprehensive audio player functionality with multiple molecules makes it a proper Template. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['full-player', 'slim-player', 'mini-player', 'mobile-player'],
      description: 'Player variant/size matching Figma design',
    },
    artistName: {
      control: 'text',
      description: 'Current artist name',
    },
    trackName: {
      control: 'text',
      description: 'Current track name',
    },
    albumName: {
      control: 'text',
      description: 'Album name',
    },
    labelName: {
      control: 'text',
      description: 'Label name',
    },
    albumArt: {
      control: 'text',
      description: 'Album art URL',
    },
    isTrackAdded: {
      control: 'boolean',
      description: 'Whether track is added to playlist',
    },
    isLocal: {
      control: 'boolean',
      description: 'Whether to show the LOCAL chip (when autoFetch is false)',
    },
    djName: {
      control: 'text',
      description: 'Current DJ name (mobile variant only)',
      if: { arg: 'variant', eq: 'mobile-player' },
    },
    showName: {
      control: 'text',
      description: 'Current show name (mobile variant only)',
      if: { arg: 'variant', eq: 'mobile-player' },
    },
  },
}

// Full player variant
export const FullPlayer = {
  args: {
    variant: 'full-player',
    artistName: 'Artist Name',
    trackName: 'Song Name',
    albumName: 'Album Name',
    labelName: 'Label Name',
    albumArt: 'https://e.snmc.io/i/300/w/edc39e408543b26904eb76748c2f1c4d/8819855',
    autoFetch: false,
    isTrackAdded: false,
    isLocal: false,
    streamUrl: null,
  },
}

// Slim player variant
export const SlimPlayer = {
  args: {
    variant: 'slim-player',
    artistName: 'Artist Name',
    trackName: 'Song Name',
    albumArt: 'https://e.snmc.io/i/300/w/edc39e408543b26904eb76748c2f1c4d/8819855',
    autoFetch: false,
    isTrackAdded: false,
    isLocal: false,
    streamUrl: null,
  },
}

// Mini player variant
export const MiniPlayer = {
  args: {
    variant: 'mini-player',
    artistName: 'Artist Name',
    trackName: 'Song Name',
    albumArt: 'https://e.snmc.io/i/300/w/edc39e408543b26904eb76748c2f1c4d/8819855',
    autoFetch: false,
    isTrackAdded: false,
    isLocal: false,
    streamUrl: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact 60px height player with 40px play button - ideal for fixed bottom corner placement.',
      },
    },
  },
}

// Mobile player variant - full screen
export const MobilePlayer = {
  args: {
    variant: 'mobile-player',
    djName: 'DJ Current',
    showName: 'Current Show',
    artistName: 'Artist Name',
    trackName: 'Song Name',
    albumName: 'Album Name',
    labelName: 'Label Name',
    albumArt: 'https://e.snmc.io/i/300/w/edc39e408543b26904eb76748c2f1c4d/8819855',
    autoFetch: false,
    isTrackAdded: false,
    isLocal: false,
    streamUrl: null,
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          '**Mobile player variant** - Full screen layout with DJ info, large album art, track info, and controls. **⚠️ View in Canvas mode for proper full-screen experience.** The Docs view constrains the viewport.',
      },
    },
  },
}

// Live data example
export const WithLiveData = {
  args: {
    variant: 'full-player',
    autoFetch: true,
    apiUrl: 'https://chirpradio.appspot.com/api/current_playlist',
    streamUrl: 'https://peridot.streamguys1.com:5185/live',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing the player with live data fetching enabled. Will show LOCAL chip when artist_is_local is true in the API response.',
      },
    },
  },
}

// Live data example mobile
export const WithLiveDataMobile = {
  args: {
    variant: 'mobile-player',
    autoFetch: true,
    apiUrl: 'https://chirpradio.appspot.com/api/current_playlist',
    streamUrl: 'https://peridot.streamguys1.com:5185/live',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          '**Mobile player with live data** - Shows live fetching from API with LOCAL chip support. **⚠️ View in Canvas mode for proper full-screen experience.** CORS errors in Storybook are expected and resolve in production.',
      },
    },
  },
}

// Missing album art example
export const NoAlbumArt = {
  args: {
    variant: 'full-player',
    artistName: 'Unknown Artist',
    trackName: 'Mystery Song',
    albumName: 'Unknown Album',
    labelName: 'Unknown Label',
    albumArt: '',
    autoFetch: false,
    isTrackAdded: false,
    isLocal: false,
    streamUrl: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing the CHIRP record logo fallback when no album art is provided.',
      },
    },
  },
}
