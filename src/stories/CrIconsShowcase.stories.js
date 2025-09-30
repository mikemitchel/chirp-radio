// CrIconsShowcase.stories.tsx
import CrIconsShowcase from './CrIconsShowcase';
import React from 'react';

export default {
  title: 'Style Guide/Icons',
  component: CrIconsShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete documentation of React Icons (Phosphor) used in the CHIRP Radio WebApp project.'
      }
    }
  },
  tags: ['autodocs']
};

export const Documentation = {
  render: function() {
    return React.createElement(CrIconsShowcase);
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive documentation showing React Icons used in CHIRP components with live preview controls.'
      }
    }
  }
};