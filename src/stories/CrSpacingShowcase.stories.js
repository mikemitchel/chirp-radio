// CrSpacingShowcase.stories.tsx
import CrSpacingShowcase from './CrSpacingShowcase'
import React from 'react'

export default {
  title: 'Style Guide/Spacing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Spacing system documentation for the CHIRP Radio design system. Displays the complete scale of spacing tokens using CSS custom properties like --cr-space-xs, --cr-space-sm, --cr-space-md, etc. Shows visual examples of each spacing value with pixel measurements and demonstrates how spacing is applied for margins, padding, and gaps between elements. Dark mode spacing values remain consistent across themes - only colors change with [data-theme="dark"]. Includes usage guidelines for consistent spacing patterns and responsive design considerations. For dark mode examples, toggle the Storybook dark mode toggle in the toolbar above.',
      },
    },
  },
  tags: ['autodocs'],
}

export const Documentation = {
  render: function () {
    return React.createElement(CrSpacingShowcase)
  },
}
