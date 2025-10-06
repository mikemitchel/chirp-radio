// CrPlaylistTable.stories.tsx
import React from 'react'
import CrPlaylistTable from './CrPlaylistTable'

export default {
  title: 'Organisms/CrPlaylistTable',
  component: CrPlaylistTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CrPlaylistTable uses the CrPlaylistTableHeader atom, CrPlaylistItem molecules, and CrPlaylistHourBreak molecules. This component provides complete playlist display system with header, hour separators, and track listings. This combination of multiple molecules makes it a proper Organism. Supports grouping by time periods and interactive track actions. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of playlist items to display',
    },
    showHeader: {
      control: 'boolean',
      description: 'Whether to show the table header',
    },
    groupByHour: {
      control: 'boolean',
      description: 'Whether to group items by hour with collapsible breaks',
    },
  },
  tags: ['autodocs'],
}

const sampleItems = [
  {
    id: '1',
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    albumArtAlt: 'Kind of Blue album cover',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:01pm',
    isAdded: false,
    isLocal: false,
  },
  {
    id: '2',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    albumArtAlt: 'Giant Steps album cover',
    artistName: 'John Coltrane',
    trackName: 'Giant Steps',
    albumName: 'Giant Steps',
    labelName: 'Atlantic Records',
    timeAgo: '1:45pm',
    isAdded: false,
    isLocal: true,
  },
  {
    id: '3',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    albumArtAlt: 'Time Out album cover',
    artistName: 'Dave Brubeck',
    trackName: 'Take Five',
    albumName: 'Time Out',
    labelName: 'Columbia Records',
    timeAgo: '1:30pm',
    isAdded: false,
    isLocal: false,
  },
  {
    id: '4',
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    albumArtAlt: "Takin' Off album cover",
    artistName: 'Herbie Hancock',
    trackName: 'Watermelon Man',
    albumName: "Takin' Off",
    labelName: 'Blue Note Records',
    timeAgo: '1:15pm',
    isAdded: false,
    isLocal: false,
  },
  {
    id: '5',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    albumArtAlt: 'A Love Supreme album cover',
    artistName: 'John Coltrane',
    trackName: 'Acknowledgement',
    albumName: 'A Love Supreme',
    labelName: 'Impulse! Records',
    timeAgo: '1:00pm',
    isAdded: true,
    isLocal: false,
  },
]

// Sample data with hour grouping
const groupedSampleItems = [
  // 2pm hour
  {
    id: '1',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show',
    },
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:45pm',
    isLocal: false,
  },
  {
    id: '2',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show',
    },
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    artistName: 'John Coltrane',
    trackName: 'Giant Steps',
    albumName: 'Giant Steps',
    labelName: 'Atlantic Records',
    timeAgo: '2:30pm',
    isLocal: true,
  },
  {
    id: '3',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show',
    },
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    artistName: 'Dave Brubeck',
    trackName: 'Take Five',
    albumName: 'Time Out',
    labelName: 'Columbia Records',
    timeAgo: '2:15pm',
    isLocal: false,
  },
  // 1pm hour
  {
    id: '4',
    hourKey: '1pm',
    hourData: {
      startTime: '1:00pm',
      endTime: '2:00pm',
      djName: 'DJ Afternoon',
      djProfileUrl: '#',
      showName: 'Afternoon Vibes',
    },
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    artistName: 'Herbie Hancock',
    trackName: 'Watermelon Man',
    albumName: "Takin' Off",
    labelName: 'Blue Note Records',
    timeAgo: '1:45pm',
    isLocal: false,
  },
  {
    id: '5',
    hourKey: '1pm',
    hourData: {
      startTime: '1:00pm',
      endTime: '2:00pm',
      djName: 'DJ Afternoon',
      djProfileUrl: '#',
      showName: 'Afternoon Vibes',
    },
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    artistName: 'John Coltrane',
    trackName: 'Acknowledgement',
    albumName: 'A Love Supreme',
    labelName: 'Impulse! Records',
    timeAgo: '1:15pm',
    isLocal: false,
  },
]

export const Default = {
  args: {
    items: sampleItems,
    showHeader: true,
    groupByHour: false,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          backgroundColor: 'var(--cr-paper)',
          padding: 'var(--cr-space-4)',
          borderRadius: 'var(--cr-space-2)',
          border: '1px solid var(--cr-default-300)',
        },
      },
      React.createElement(CrPlaylistTable, args)
    )
  },
}

export const GroupedByHour = {
  args: {
    items: groupedSampleItems,
    showHeader: true,
    groupByHour: true,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          backgroundColor: 'var(--cr-paper)',
          padding: 'var(--cr-space-4)',
          borderRadius: 'var(--cr-space-2)',
          border: '1px solid var(--cr-default-300)',
        },
      },
      React.createElement(CrPlaylistTable, args)
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Playlist table with items grouped by hour. Click on hour breaks to collapse/expand the hour sections.',
      },
    },
  },
}

// ... keep other existing stories ...
