// CrTrackInfo.stories.tsx
import React from 'react'
import CrTrackInfo from './CrTrackInfo'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Molecules/CrTrackInfo',
  component: CrTrackInfo,
  decorators: [
    (Story) => React.createElement(BrowserRouter, null, React.createElement(AuthProvider, null, React.createElement(Story))),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Built from CrChip atom for LOCAL indicator and CrButton atoms for add/remove actions. Track information display component with artist, song, album, and label details. Supports different layouts (full, minimal, stacked) and interactive states. Handles text scrolling for overflow content. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'minimal', 'stacked'],
      description: 'Layout variant for track information display',
    },
    trackName: {
      control: 'text',
      description: 'Name of the track/song',
    },
    artistName: {
      control: 'text',
      description: 'Name of the artist',
    },
    albumName: {
      control: 'text',
      description: 'Name of the album',
    },
    labelName: {
      control: 'text',
      description: 'Name of the record label',
    },
    isAdded: {
      control: 'boolean',
      description: 'Whether the track is added to playlist/favorites',
    },
    isLocal: {
      control: 'boolean',
      description: 'Whether to show the LOCAL chip next to artist name',
    },
    onToggleAdd: {
      action: 'toggled',
      description: 'Callback when add/remove button is clicked',
    },
  },
}

// VARIANT 1: Full (title → artist → album • label)
export const FullVariant = {
  args: {
    trackName: 'Kind of Blue',
    artistName: 'Miles Davis',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    variant: 'full',
    isAdded: false,
    isLocal: false,
  },
}

// VARIANT 2: Minimal (title → artist)
export const MinimalVariant = {
  args: {
    trackName: 'Kind of Blue',
    artistName: 'Miles Davis',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    variant: 'minimal',
    isAdded: false,
    isLocal: false,
  },
}

// VARIANT 3: Stacked (title → artist → album → label)
export const StackedVariant = {
  args: {
    trackName: 'Kind of Blue',
    artistName: 'Miles Davis',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    variant: 'stacked',
    isAdded: false,
    isLocal: false,
  },
}

// LOCAL ARTIST EXAMPLES
export const LocalArtistFull = {
  args: {
    trackName: 'Chicago Blues',
    artistName: 'Local Band Name',
    albumName: 'Debut Album',
    labelName: 'Independent Records',
    variant: 'full',
    isAdded: false,
    isLocal: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full variant with LOCAL chip showing next to artist name.',
      },
    },
  },
}

export const LocalArtistMinimal = {
  args: {
    trackName: 'Chicago Blues',
    artistName: 'Local Band Name',
    variant: 'minimal',
    isAdded: false,
    isLocal: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal variant with LOCAL chip - shows only track name, artist, and LOCAL chip.',
      },
    },
  },
}

export const LongTitles = {
  args: {
    trackName: 'An Extremely Long Song Title That Should Truncate Properly When It Gets Too Long',
    artistName: 'A Really Long Artist Name That Might Overflow',
    albumName: 'A Very Long Album Name That Should Also Truncate',
    labelName: 'A Record Label With An Extraordinarily Long Name',
    variant: 'full',
    isAdded: false,
    isLocal: false,
  },
}

export const LongTitlesWithLocal = {
  args: {
    trackName: 'An Extremely Long Song Title That Should Scroll When It Gets Too Long',
    artistName: 'A Really Long Local Artist Name That Might Overflow But Has LOCAL Chip',
    albumName: 'A Very Long Album Name That Should Also Truncate',
    labelName: 'A Record Label With An Extraordinarily Long Name',
    variant: 'full',
    isAdded: false,
    isLocal: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the LOCAL chip works with long artist names that trigger scrolling.',
      },
    },
  },
}

export const WithoutOptionalFields = {
  args: {
    trackName: 'Single Track',
    artistName: 'Solo Artist',
    albumName: '',
    labelName: '',
    variant: 'full',
    isAdded: false,
    isLocal: false,
  },
}

export const AddedState = {
  args: {
    trackName: 'Kind of Blue',
    artistName: 'Miles Davis',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    variant: 'full',
    isAdded: true,
    isLocal: false,
  },
}
