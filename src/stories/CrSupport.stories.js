// CrSupport.stories.tsx
import React from 'react'
import CrSupport from './CrSupport'

export default {
  title: 'Atoms/CrSupport',
  component: CrSupport,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The CrSupport component displays funding acknowledgments and supporter logos for CHIRP Radio. It includes the main DCASE and Illinois Arts Council logos with automatic light/dark mode switching, plus an optional section for additional supporter logos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showAdditionalLogos: {
      control: 'boolean',
      description: 'Show the additional logos section below main logos',
    },
    logoCount: {
      control: {
        type: 'select',
      },
      options: [1, 2, 3],
      description: 'Number of additional logos to display (1-3)',
      table: {
        defaultValue: { summary: '3' },
      },
    },
  },
}

// All available logos - swapped middle logo to logoipsum-360.svg
const allLogos = [
  {
    src: '/images/support-logos/logoipsum-343.svg',
    alt: 'Additional Supporter 1',
  },
  {
    src: '/images/support-logos/logoipsum-360.svg',
    alt: 'Additional Supporter 2',
  },
  {
    src: '/images/support-logos/logoipsum-358.svg',
    alt: 'Additional Supporter 3',
  },
]

export const Default = {
  args: {
    showAdditionalLogos: false,
    logoCount: 3,
  },
  render: (args) => {
    const additionalLogos = args.showAdditionalLogos ? allLogos.slice(0, args.logoCount) : []
    return React.createElement(CrSupport, {
      showAdditionalLogos: args.showAdditionalLogos,
      additionalLogos: additionalLogos,
    })
  },
}

export const WithAdditionalLogos = {
  args: {
    showAdditionalLogos: true,
    logoCount: 3,
  },
  render: (args) => {
    const additionalLogos = allLogos.slice(0, args.logoCount)
    return React.createElement(CrSupport, {
      showAdditionalLogos: args.showAdditionalLogos,
      additionalLogos: additionalLogos,
    })
  },
}

export const DarkMode = {
  args: {
    showAdditionalLogos: false,
    logoCount: 2,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1a1a' }],
    },
  },
  render: (args) => {
    const additionalLogos = args.showAdditionalLogos ? allLogos.slice(0, args.logoCount) : []
    return React.createElement(
      'div',
      {
        'data-theme': 'dark',
        style: {
          backgroundColor: '#1a1a1a',
          padding: '20px',
          color: 'white',
        },
      },
      React.createElement(CrSupport, {
        showAdditionalLogos: args.showAdditionalLogos,
        additionalLogos: additionalLogos,
      })
    )
  },
}

export const Mobile = {
  args: {
    showAdditionalLogos: true,
    logoCount: 2,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => {
    const additionalLogos = allLogos.slice(0, args.logoCount)
    return React.createElement(CrSupport, {
      showAdditionalLogos: args.showAdditionalLogos,
      additionalLogos: additionalLogos,
    })
  },
}
