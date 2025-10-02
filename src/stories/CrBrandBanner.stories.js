// CrBrandBanner.stories.tsx
import React from 'react'
import CrBrandBanner from './CrBrandBanner'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'

export default {
  title: 'Molecules/CrBrandBanner',
  component: CrBrandBanner,
  decorators: [
    (Story) => React.createElement(AudioPlayerProvider, null, React.createElement(Story)),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Built from CrLogo atom and CrStreamingMusicPlayer Template. Header banner combining CHIRP logo with embedded music player. This uses complex music player molecule - consider moving to Organisms category. Responsive layout switching between horizontal and stacked arrangements. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
}

// Default header
export const Default = {
  args: {
    streamingPlayerProps: {
      variant: 'slim-player',
      trackName: 'Song Name',
      artistName: 'Artist Name',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
      isTrackAdded: false,
      autoFetch: false,
    },
  },
}

// Example with different player content
export const WithCustomContent = {
  args: {
    streamingPlayerProps: {
      variant: 'slim-player',
      trackName: 'Take Five',
      artistName: 'Dave Brubeck Quartet',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Time_out_album_cover.jpg',
      isTrackAdded: true,
      autoFetch: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Logo banner with custom track information and added track state.',
      },
    },
  },
}
