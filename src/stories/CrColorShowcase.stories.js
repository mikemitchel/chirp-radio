// CrColorShowcase.stories.tsx
import CrColorShowcase from './CrColorShowcase';
import React from 'react';

export default {
  title: 'Style Guide/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete color palette documentation for the CHIRP Radio design system. Displays primary, secondary, and utility colors with their CSS variable names, hex values, and usage guidelines. Includes semantic color tokens and accessibility information. Dark mode colors are defined in the main CSS file and tied to the dark mode [data-theme="dark"]. For dark mode color examples, toggle the Storybook dark mode toggle in the toolbar above.'
      }
    }
  },
  tags: ['autodocs']
};

export const Documentation = {
  render: function() {
    return React.createElement(CrColorShowcase);
  }
};