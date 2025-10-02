// CrTextureShowcase.stories.tsx
import CrTextureShowcase from './CrTextureShowcase'
import React from 'react'

export default {
  title: 'Style Guide/Textures',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Background texture documentation for the CHIRP Radio design system. Displays available texture patterns applied via CSS classes rather than CSS variables. All texture images are sourced from https://www.transparenttextures.com/ and integrated as background images. Shows how to apply textures using class names like .cr-bg-textured, .cr-texture-natural-light, etc. <br><br>Dark mode texture adaptations are defined in the main CSS file and tied to the dark mode [data-theme="dark"] attribute. Includes examples of textures on different background colors and usage guidelines for maintaining readability and accessibility. For dark mode texture examples, toggle the Storybook dark mode toggle in the toolbar above.',
      },
    },
  },
  tags: ['autodocs'],
}

export const Documentation = {
  render: function () {
    return React.createElement(CrTextureShowcase)
  },
}
