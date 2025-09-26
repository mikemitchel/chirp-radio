// CrLogo.stories.js
import React from 'react';
import CrLogo from './CrLogo';

export default {
  title: 'Atoms/CrLogo',
  component: CrLogo,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['className']
    },
    docs: {
      description: {
        component: 'CHIRP Radio brand logo component with multiple layout variants for different contexts. Supports horizontal, horizontal-reversed, vertical, record, and bird-only variants in both primary and white color schemes. The horizontal variant works best in headers and wide layouts, vertical for narrow spaces, record for music-related contexts, and bird icon for compact applications like avatars and favicons. Automatically loads the appropriate SVG asset based on variant selection. Includes proper alt text and ARIA labels for accessibility. Dark mode uses the same logo variants but may switch between primary and white colors based on background contrast needs through [data-theme="dark"] CSS selectors.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'horizontal-reversed', 'vertical', 'record', 'bird'],
      description: 'Logo variant - each loads a different SVG file'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'white'],
      description: 'Logo color - applies CSS filter to make logos white when set to white'
    }
  },
};

// Default - horizontal red logo
export const Default = {
  args: {
    variant: 'horizontal',
    color: 'primary'
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'primary', value: '#ea1c2c' }
      ]
    }
  }
};

// Horizontal white logo - for dark backgrounds  
export const HorizontalReversed = {
  args: {
    variant: 'horizontal',
    color: 'white'
  },
  parameters: {
    backgrounds: {
      default: 'primary',
      values: [
        { name: 'primary', value: '#ea1c2c' },
        { name: 'dark', value: '#1a1a1a' }
      ]
    }
  }
};

// Horizontal red logo - for light backgrounds
export const HorizontalPrimary = {
  args: {
    variant: 'horizontal',
    color: 'primary'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

// Horizontal reversed variant
export const HorizontalReversedVariant = {
  args: {
    variant: 'horizontal-reversed',
    color: 'primary'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

// Vertical variant
export const Vertical = {
  args: {
    variant: 'vertical',
    color: 'primary'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

// Record variant
export const Record = {
  args: {
    variant: 'record',
    color: 'primary'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

// Bird variant (just the bird icon)
export const Bird = {
  args: {
    variant: 'bird',
    color: 'primary'
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};