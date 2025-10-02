// CrMobileSplash.stories.js
import React from 'react'
import CrMobileSplash from './CrMobileSplash'

export default {
  title: 'Molecules/CrMobileSplash',
  component: CrMobileSplash,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Mobile splash screen that displays the CHIRP logo. Background is red (cr-primary-500) in light mode and dark gray (cr-default-900) in dark mode. Uses white vertical CHIRP logo.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
}

// Default splash screen
export const Default = {
  render: (args) => React.createElement(CrMobileSplash, args),
  args: {},
}
