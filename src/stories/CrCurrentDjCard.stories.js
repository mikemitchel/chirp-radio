// CrCurrentDjCard.stories.tsx
import React from 'react'
import CrCurrentDjCard from './CrCurrentDjCard'

export default {
  title: 'Organisms/CrCurrentDjCard',
  component: CrCurrentDjCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CrCurrentDjCard uses the CrCurrentDj molecule, the CrButton atom, an image, and additional content elements. This component provides expanded DJ information display showing current DJ details with extended show information and description. More comprehensive than the basic CrCurrentDj molecule. Supports different display states and responsive layouts. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    djImage: {
      control: 'text',
      description: 'URL for the DJ image',
    },
    djImageAlt: {
      control: 'text',
      description: 'Alt text for the DJ image',
    },
    djName: {
      control: 'text',
      description: 'Name of the DJ',
    },
    showName: {
      control: 'text',
      description: 'Name of the show',
    },
    isOnAir: {
      control: 'boolean',
      description: 'Whether the show is currently on air',
    },
    statusText: {
      control: 'text',
      description: 'Text for the status chip',
    },
    header: {
      control: 'text',
      description: 'Header text above the title',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    metaText: {
      control: 'text',
      description: 'Meta text below the title',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    requestButtonText: {
      control: 'text',
      description: 'Text for the request button',
    },
    moreButtonText: {
      control: 'text',
      description: 'Text for the more button',
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    djImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    djImageAlt: 'DJ Current',
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air',
    header: 'THE CURRENT SHOW',
    title: 'DJ Current',
    metaText: 'THIS CONTENT IS 30 CHARACTERS.',
    description:
      'DJ Current is lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
    requestButtonText: 'REQUEST',
    moreButtonText: 'MORE',
  },
}

export const OffAir = {
  args: {
    ...Default.args,
    isOnAir: false,
    statusText: '',
  },
}

export const LongDescription = {
  args: {
    ...Default.args,
    description:
      'DJ Current brings you an eclectic mix of music spanning multiple genres and decades. From underground electronic beats to classic rock anthems, this show explores the full spectrum of musical expression. Tune in every week for carefully curated playlists and exclusive interviews with emerging artists.',
  },
}

export const DifferentDJ = {
  args: {
    ...Default.args,
    djImage: 'https://images.unsplash.com/photo-1524666041070-9d87656c25bb?w=400&h=400&fit=crop',
    djName: 'DJ Midnight',
    showName: 'After Dark Sessions',
    title: 'DJ Midnight',
    header: 'AFTER DARK SESSIONS',
    description:
      'Join DJ Midnight for a journey through the best in late-night electronic music and downtempo beats.',
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
