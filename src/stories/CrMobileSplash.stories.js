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

// Static splash screen (no animation)
export const Static = {
  render: (args) => React.createElement(CrMobileSplash, args),
<<<<<<< Updated upstream
  args: {},
}
=======
  args: {}
};

// With fade-in animation
export const FadeIn = {
  render: (args) => React.createElement(CrMobileSplash, args),
  args: {
    className: 'splash-animation--fade-in'
  }
};

// Visible state
export const Visible = {
  render: (args) => React.createElement(CrMobileSplash, args),
  args: {
    className: 'splash-animation--visible'
  }
};
>>>>>>> Stashed changes
