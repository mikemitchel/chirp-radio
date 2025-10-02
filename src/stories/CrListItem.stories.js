// CrListItem.stories.tsx
import React from 'react'
import CrListItem from './CrListItem'

export default {
  title: 'Molecules/CrListItem',
  component: CrListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built from CrButton atom for add action. Individual ranking list item showing position number, song title, artist, and record label with optional add button. Used within rating lists and music charts. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    ranking: {
      control: 'number',
      description: 'The ranking number for this item',
    },
    songName: {
      control: 'text',
      description: 'Name of the song (displayed in bold)',
    },
    artistName: {
      control: 'text',
      description: 'Name of the artist',
    },
    recordCompany: {
      control: 'text',
      description: 'Name of the record company',
    },
    showAddButton: {
      control: 'boolean',
      description: 'Whether to show the Add button',
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    ranking: 1,
    songName: 'Song Name',
    artistName: 'Artist Name',
    recordCompany: 'Record Company',
    showAddButton: true,
  },
}

export const RealSong = {
  args: {
    ranking: 5,
    songName: 'Take Five',
    artistName: 'Dave Brubeck Quartet',
    recordCompany: 'Columbia Records',
    showAddButton: true,
  },
}

export const LongNames = {
  args: {
    ranking: 12,
    songName: 'This Is A Very Long Song Title That Might Wrap',
    artistName: 'The Super Long Band Name That Goes On Forever',
    recordCompany: 'Really Long Record Company Name Inc.',
    showAddButton: true,
  },
}

export const NoAddButton = {
  args: {
    ranking: 3,
    songName: 'Blue in Green',
    artistName: 'Miles Davis',
    recordCompany: 'Columbia Records',
    showAddButton: false,
  },
}

export const MultipleItems = {
  render: () => {
    return React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          border: '1px solid var(--cr-default-300)',
          borderRadius: 'var(--cr-space-2)',
          padding: 'var(--cr-space-md)',
        },
      },
      [
        React.createElement(CrListItem, {
          key: 'item1',
          ranking: 1,
          songName: 'Take Five',
          artistName: 'Dave Brubeck Quartet',
          recordCompany: 'Columbia Records',
          showAddButton: true,
        }),
        React.createElement(CrListItem, {
          key: 'item2',
          ranking: 2,
          songName: 'So What',
          artistName: 'Miles Davis',
          recordCompany: 'Columbia Records',
          showAddButton: true,
        }),
        React.createElement(CrListItem, {
          key: 'item3',
          ranking: 3,
          songName: 'Giant Steps',
          artistName: 'John Coltrane',
          recordCompany: 'Atlantic Records',
          showAddButton: true,
        }),
        React.createElement(CrListItem, {
          key: 'item4',
          ranking: 4,
          songName: 'A Love Supreme',
          artistName: 'John Coltrane',
          recordCompany: 'Impulse! Records',
          showAddButton: true,
        }),
        React.createElement(CrListItem, {
          key: 'item5',
          ranking: 5,
          songName: 'Blue in Green',
          artistName: 'Miles Davis',
          recordCompany: 'Columbia Records',
          showAddButton: true,
        }),
      ]
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple rating list items displayed in a list format.',
      },
    },
  },
}
