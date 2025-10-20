// CrRecentlyPlayed.stories.js
import React from 'react'
import CrRecentlyPlayed from './CrRecentlyPlayed'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Organisms/CrRecentlyPlayed',
  component: CrRecentlyPlayed,
  decorators: [
    (Story) => React.createElement(BrowserRouter, null, React.createElement(AuthProvider, null, React.createElement(Story))),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Recently Played section component that displays a horizontal scrollable list of recently played tracks using CrPlaylistItem cards. Features a gradient overlay on scroll and optional "View Playlist" button. Designed for the landing page to showcase current radio activity.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tracks: {
      control: 'object',
      description: 'Array of track objects to display',
    },
    showViewPlaylistButton: {
      control: 'boolean',
      description: 'Show or hide the "View Playlist" button',
    },
    maxItems: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of tracks to display',
    },
    onViewPlaylist: {
      action: 'view playlist clicked',
      description: 'Callback when "View Playlist" button is clicked',
    },
  },
}

const sampleTracks = [
  {
    albumArt: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Chance_the_rapper_acid_rap.jpg',
    artistName: 'Chance the Rapper',
    trackName: 'Pusha Man',
    albumName: 'Acid Rap',
    labelName: 'Chance the Rapper',
    isLocal: true,
    timeAgo: '10:36am',
  },
  {
    albumArt:
      'https://upload.wikimedia.org/wikipedia/en/c/ce/Alkaline_Trio_-_From_Here_to_Infirmary_cover.jpg',
    artistName: 'Alkaline Trio',
    trackName: 'Stupid Kid',
    albumName: 'From Here to Infirmary',
    labelName: 'Vagrant Records',
    isLocal: true,
    timeAgo: '10:30am',
  },
  {
    albumArt: 'https://f4.bcbits.com/img/a3263361162_16.jpg',
    artistName: 'Signals Midwest',
    trackName: 'Your New, Old Apartment',
    albumName: 'Pin',
    labelName: 'Lauren Records',
    timeAgo: '10:27am',
  },
  {
    albumArt: 'https://f4.bcbits.com/img/a1076606024_16.jpg',
    artistName: 'Into It. Over It.',
    trackName: 'Vis Major',
    albumName: 'Standards',
    labelName: 'Storchmasers',
    isLocal: true,
    timeAgo: '10:24am',
  },
  {
    albumArt: 'https://upload.wikimedia.org/wikipedia/en/9/95/Gukfmm.jpg',
    artistName: 'The Get Up Kids',
    trackName: 'Last Place You Look',
    albumName: 'Four Minute Mile',
    labelName: 'Doghouse Records',
    timeAgo: '10:21am',
  },
  {
    albumArt:
      'https://upload.wikimedia.org/wikipedia/en/2/23/Sugar_-_File_Under_Easy_Listening.jpg',
    artistName: 'Sugar',
    trackName: 'Gee Angel',
    albumName: 'File Under: Easy Listening',
    labelName: 'Creation Records',
    timeAgo: '10:17am',
  },
]

export const Default = {
  args: {
    tracks: sampleTracks,
    showViewPlaylistButton: true,
    maxItems: 6,
  },
}

export const WithoutButton = {
  args: {
    tracks: sampleTracks,
    showViewPlaylistButton: false,
    maxItems: 6,
  },
}

export const FewTracks = {
  args: {
    tracks: sampleTracks.slice(0, 3),
    showViewPlaylistButton: true,
    maxItems: 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          'With only a few tracks, the scroll gradient may not appear if content fits in viewport.',
      },
    },
  },
}

export const ManyTracks = {
  args: {
    tracks: [...sampleTracks, ...sampleTracks, ...sampleTracks],
    showViewPlaylistButton: true,
    maxItems: 12,
  },
  parameters: {
    docs: {
      description: {
        story:
          'With many tracks, the horizontal scroll gradient helps indicate more content is available.',
      },
    },
  },
}

export const NoTracks = {
  args: {
    tracks: [],
    showViewPlaylistButton: true,
    maxItems: 6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no tracks are available.',
      },
    },
  },
}

export const LimitedItems = {
  args: {
    tracks: sampleTracks,
    showViewPlaylistButton: true,
    maxItems: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Display limited number of tracks using maxItems prop.',
      },
    },
  },
}
