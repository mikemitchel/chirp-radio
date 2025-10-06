// CrTypographyShowcase.stories.tsx
import CrTypographyShowcase from './CrTypographyShowcase'
import React from 'react'

export default {
  title: 'Style Guide/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Typography system documentation for the CHIRP Radio design system. Displays the complete type scale using CSS custom properties like --cr-title-xl, --cr-body-reg, --cr-nav-support, etc. Shows all font families (Antonio, Roboto Serif, Roboto), font weights, sizes, and line heights with visual examples and CSS variable names. Includes title hierarchy from --cr-title-2xl down to --cr-title-eyebrow, body text variants, and specialized text styles for navigation and UI elements. Dark mode typography maintains the same sizing and hierarchy but adapts colors through [data-theme="dark"] CSS selectors. Demonstrates proper usage guidelines for readability, accessibility, and brand consistency. For dark mode typography examples, toggle the Storybook dark mode toggle in the toolbar above.',
      },
    },
  },
  tags: ['autodocs'],
}

export const Documentation = {
  render: function () {
    return React.createElement(CrTypographyShowcase)
  },
}
