// CrPlaylistItem.stories.tsx
import React from 'react'
import CrPlaylistItem from './CrPlaylistItem'

export default {
  title: 'Molecules/CrPlaylistItem',
  component: CrPlaylistItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built using the CrButton atom, image elements, and CrTrackInfo info molecule with button interactions. Playlist track item showing album art, track details, and time played. This uses track info molecule - consider moving to Organisms category. Supports both default card and table row layouts. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    albumArt: {
      control: 'text',
      description: 'URL for album artwork',
    },
    albumArtAlt: {
      control: 'text',
      description: 'Alt text for album artwork',
    },
    artistName: {
      control: 'text',
      description: 'Name of the artist (passed to CrTrackInfo)',
    },
    trackName: {
      control: 'text',
      description: 'Name of the track (passed to CrTrackInfo)',
    },
    albumName: {
      control: 'text',
      description: 'Name of the album (passed to CrTrackInfo)',
    },
    labelName: {
      control: 'text',
      description: 'Name of the record label (passed to CrTrackInfo)',
    },
    timeAgo: {
      control: 'text',
      description: 'Time played (e.g., "2:01pm")',
    },
    showTime: {
      control: 'boolean',
      description: 'Whether to show the time display',
    },
    isAdded: {
      control: 'boolean',
      description: 'Whether the track has been added (passed to CrTrackInfo)',
    },
    isLocal: {
      control: 'boolean',
      description: 'Whether to show LOCAL chip (passed to CrTrackInfo)',
    },
    variant: {
      control: 'select',
      options: ['default', 'table', 'card'],
      description: 'Layout variant - default (horizontal), table (row layout), or card (vertical)',
    },
    currentlyPlaying: {
      control: 'boolean',
      description:
        'Whether this track is currently playing (shows primary-500 outline on card variant)',
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    albumArt:
      'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
    albumArtAlt: 'Kind of Blue album cover',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:01pm',
    showTime: true,
    isAdded: false,
    isLocal: false,
    variant: 'default',
  },
}

export const TableVariant = {
  args: {
    albumArt:
      'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
    albumArtAlt: 'Kind of Blue album cover',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:01pm',
    showTime: true,
    isAdded: false,
    isLocal: false,
    variant: 'table',
  },
}

export const TableVariantLocalArtist = {
  args: {
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    albumArtAlt: 'Local artist album cover',
    artistName: 'Chicago Local Band',
    trackName: 'Windy City Blues',
    albumName: 'Chicago Nights',
    labelName: 'Independent Records',
    timeAgo: '11:45am',
    showTime: true,
    isAdded: false,
    isLocal: true,
    variant: 'table',
  },
}

export const LocalArtist = {
  args: {
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    albumArtAlt: 'Local artist album cover',
    artistName: 'Chicago Local Band',
    trackName: 'Windy City Blues',
    albumName: 'Chicago Nights',
    labelName: 'Independent Records',
    timeAgo: '11:45am',
    showTime: true,
    isAdded: false,
    isLocal: true,
    variant: 'default',
  },
}

export const TablePlaylistExample = {
  render: () => {
    const items = [
      {
        albumArt:
          'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
        artistName: 'Miles Davis',
        trackName: 'So What',
        albumName: 'Kind of Blue',
        labelName: 'Columbia Records',
        timeAgo: '2:01pm',
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        artistName: 'John Coltrane',
        trackName: 'Giant Steps',
        albumName: 'Giant Steps',
        labelName: 'Atlantic Records',
        timeAgo: '1:45pm',
        isLocal: true,
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
        artistName: 'Dave Brubeck',
        trackName: 'Take Five',
        albumName: 'Time Out',
        labelName: 'Columbia Records',
        timeAgo: '1:30pm',
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
        artistName: 'Herbie Hancock',
        trackName: 'Watermelon Man',
        albumName: "Takin' Off",
        labelName: 'Blue Note Records',
        timeAgo: '1:15pm',
      },
    ]

    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '900px',
          backgroundColor: 'var(--cr-paper)',
          padding: 'var(--cr-space-4)',
          borderRadius: 'var(--cr-space-2)',
          border: '1px solid var(--cr-default-300)',
        },
      },
      [
        // Header row
        React.createElement(
          'div',
          {
            key: 'header',
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--cr-space-4)',
              padding: 'var(--cr-space-2) 0',
              borderBottom: '2px solid var(--cr-default-300)',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--cr-default-700)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
          },
          [
            React.createElement('div', {
              key: 'art',
              style: { width: '45px', flexShrink: 0 },
            }),
            React.createElement(
              'div',
              {
                key: 'grid',
                style: { display: 'flex', flex: 1, gap: 'var(--cr-space-8)' },
              },
              [
                React.createElement('div', { key: 'left', style: { flex: 1 } }, 'Artist / Track'),
                React.createElement('div', { key: 'right', style: { flex: 1 } }, 'Album / Label'),
              ]
            ),
            React.createElement(
              'div',
              {
                key: 'time',
                style: { width: '80px', textAlign: 'right', flexShrink: 0 },
              },
              'Time'
            ),
            React.createElement('div', {
              key: 'action',
              style: { width: '70px', flexShrink: 0 },
            }),
          ]
        ),
        // Items
        ...items.map((item, index) =>
          React.createElement(CrPlaylistItem, {
            key: index,
            variant: 'table',
            ...item,
          })
        ),
      ]
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple playlist items displayed in table row format with header, showing a more compact layout suitable for playlists and history views.',
      },
    },
  },
}

export const PlaylistExample = {
  render: () => {
    const items = [
      {
        albumArt:
          'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
        artistName: 'Miles Davis',
        trackName: 'So What',
        albumName: 'Kind of Blue',
        labelName: 'Columbia Records',
        timeAgo: '2:01pm',
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        artistName: 'John Coltrane',
        trackName: 'Giant Steps',
        albumName: 'Giant Steps',
        labelName: 'Atlantic Records',
        timeAgo: '1:45pm',
        isLocal: true,
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
        artistName: 'Dave Brubeck',
        trackName: 'Take Five',
        albumName: 'Time Out',
        labelName: 'Columbia Records',
        timeAgo: '1:30pm',
      },
    ]

    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '800px',
          backgroundColor: 'var(--cr-paper)',
          padding: 'var(--cr-space-4)',
          borderRadius: 'var(--cr-space-2)',
          border: '1px solid var(--cr-default-300)',
        },
      },
      items.map((item, index) =>
        React.createElement(CrPlaylistItem, {
          key: index,
          ...item,
        })
      )
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple playlist items displayed together in default layout.',
      },
    },
  },
}

export const AddedTrack = {
  args: {
    albumArt:
      'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
    albumArtAlt: 'Album cover',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '3:30pm',
    showTime: true,
    isAdded: true,
    isLocal: false,
    variant: 'default',
  },
}

export const NoTime = {
  args: {
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    albumArtAlt: 'Album cover',
    artistName: 'Dave Brubeck',
    trackName: 'Take Five',
    albumName: 'Time Out',
    labelName: 'Columbia Records',
    showTime: false,
    isAdded: false,
    isLocal: false,
    variant: 'default',
  },
}

export const LongNames = {
  args: {
    albumArt:
      'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
    albumArtAlt: 'Album cover',
    artistName: 'The Really Long Band Name That Goes On Forever',
    trackName: 'An Extremely Long Track Title That Should Scroll',
    albumName: 'The Album With A Very Long Name',
    labelName: 'Independent Records Label Company',
    timeAgo: '12:15pm',
    showTime: true,
    isAdded: false,
    isLocal: false,
    variant: 'default',
  },
}

export const Mobile = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const CardVariant = {
  args: {
    albumArt:
      'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
    albumArtAlt: 'Kind of Blue album cover',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:01pm',
    showTime: true,
    isAdded: false,
    isLocal: false,
    variant: 'card',
  },
}

export const CardVariantLocal = {
  args: {
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    albumArtAlt: 'Local artist album cover',
    artistName: 'Chicago Local Band',
    trackName: 'Windy City Blues',
    albumName: 'Chicago Nights',
    labelName: 'Independent Records',
    timeAgo: '11:45am',
    showTime: true,
    isAdded: false,
    isLocal: true,
    variant: 'card',
  },
}

export const CardVariantAdded = {
  args: {
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    albumArtAlt: 'Album cover',
    artistName: 'Dave Brubeck',
    trackName: 'Take Five',
    albumName: 'Time Out',
    labelName: 'Columbia Records',
    timeAgo: '1:30pm',
    showTime: true,
    isAdded: true,
    isLocal: false,
    variant: 'card',
  },
}

export const CardVariantCurrentlyPlaying = {
  args: {
    albumArt:
      'https://i.discogs.com/_PKd2Tx-U7jNurH8U1e9BQe435HV3QkMhhPDaTeCuGY/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NjAx/NzItMTQ3MTU0NzY5/Ni01NTg4LmpwZWc.jpeg',
    albumArtAlt: 'Kind of Blue album cover',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:01pm',
    showTime: true,
    isAdded: false,
    isLocal: false,
    variant: 'card',
    currentlyPlaying: true,
  },
}

export const CardGridExample = {
  render: () => {
    const items = [
      {
        albumArt:
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        artistName: 'Miles Davis',
        trackName: 'So What',
        albumName: 'Kind of Blue',
        labelName: 'Columbia Records',
        timeAgo: '2:01pm',
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        artistName: 'John Coltrane',
        trackName: 'Giant Steps',
        albumName: 'Giant Steps',
        labelName: 'Atlantic Records',
        timeAgo: '1:45pm',
        isLocal: true,
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
        artistName: 'Dave Brubeck',
        trackName: 'Take Five',
        albumName: 'Time Out',
        labelName: 'Columbia Records',
        timeAgo: '1:30pm',
      },
      {
        albumArt:
          'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        artistName: 'Herbie Hancock',
        trackName: 'Watermelon Man',
        albumName: "Takin' Off",
        labelName: 'Blue Note Records',
        timeAgo: '1:15pm',
        isAdded: true,
      },
    ]

    return React.createElement(
      'div',
      {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 200px)',
          gap: 'var(--cr-space-4)',
          padding: 'var(--cr-space-4)',
        },
      },
      items.map((item, index) =>
        React.createElement(CrPlaylistItem, {
          key: index,
          variant: 'card',
          ...item,
        })
      )
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple playlist items displayed in card format, suitable for grid layouts and store-like displays.',
      },
    },
  },
}
