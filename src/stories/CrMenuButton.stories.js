// CrMenuButton.stories.tsx
import React from 'react'
import CrMenuButton from './CrMenuButton'
import { PiHeart, PiMagnifyingGlass } from 'react-icons/pi'

export default {
  title: 'Atoms/CrMenuButton',
  component: CrMenuButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Specialized button component for menu and navigation toggles with icon-based variants. Supports menu (hamburger), close (X), and dots (more options) variants with flexible text and icon layouts. Can display with text on left or right of icon, or as icon-only for compact interfaces. Commonly used for mobile navigation toggles, sidebar controls, and overflow menus. Maintains consistent styling with other button components while providing specific iconography for navigation patterns. Includes proper ARIA labels for screen readers and keyboard navigation support. Dark mode styling adapts through [data-theme="dark"] CSS selectors while maintaining clear visual distinction between different menu states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['menu', 'close', 'dots'],
      description: 'Button variant - determines default icon and styling',
    },
    layout: {
      control: { type: 'select' },
      options: ['icon-left', 'icon-right', 'icon-only'],
      description: 'Icon position relative to text',
    },
    text: {
      control: 'text',
      description: 'Text label for the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
}

// Default menu button (icon left)
export const Default = {
  args: {
    variant: 'menu',
    layout: 'icon-left',
    text: 'MENU',
  },
}

// Menu button with icon on right
export const MenuIconRight = {
  args: {
    variant: 'menu',
    layout: 'icon-right',
    text: 'MENU',
  },
}

// Icon only menu button
export const MenuIconOnly = {
  args: {
    variant: 'menu',
    layout: 'icon-only',
  },
}

// Close button variations
export const CloseButton = {
  args: {
    variant: 'close',
    layout: 'icon-left',
    text: 'CLOSE',
  },
}

export const CloseIconOnly = {
  args: {
    variant: 'close',
    layout: 'icon-only',
  },
}

// Dots variant (for main nav)
export const DotsButton = {
  args: {
    variant: 'dots',
    layout: 'icon-left',
    text: 'MENU',
  },
}

export const DotsIconOnly = {
  args: {
    variant: 'dots',
    layout: 'icon-only',
  },
}

// Custom icon example
export const CustomIcon = {
  args: {
    variant: 'menu',
    layout: 'icon-left',
    text: 'SEARCH',
    icon: React.createElement(PiMagnifyingGlass),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a custom icon override using the icon prop.',
      },
    },
  },
}

// Disabled state
export const Disabled = {
  args: {
    variant: 'menu',
    layout: 'icon-left',
    text: 'MENU',
    disabled: true,
  },
}

// All variants showcase
export const AllVariants = {
  render: () =>
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'flex-start',
        },
      },
      [
        React.createElement('div', { key: 'menu' }, [
          React.createElement('h4', { key: 'title1' }, 'Menu Variants'),
          React.createElement(
            'div',
            {
              key: 'buttons1',
              style: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
            },
            [
              React.createElement(CrMenuButton, {
                key: 'menu1',
                variant: 'menu',
                layout: 'icon-left',
                text: 'MENU',
              }),
              React.createElement(CrMenuButton, {
                key: 'menu2',
                variant: 'menu',
                layout: 'icon-right',
                text: 'MENU',
              }),
              React.createElement(CrMenuButton, {
                key: 'menu3',
                variant: 'menu',
                layout: 'icon-only',
              }),
            ]
          ),
        ]),
        React.createElement('div', { key: 'close' }, [
          React.createElement('h4', { key: 'title2' }, 'Close Variants'),
          React.createElement(
            'div',
            {
              key: 'buttons2',
              style: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
            },
            [
              React.createElement(CrMenuButton, {
                key: 'close1',
                variant: 'close',
                layout: 'icon-left',
                text: 'CLOSE',
              }),
              React.createElement(CrMenuButton, {
                key: 'close2',
                variant: 'close',
                layout: 'icon-right',
                text: 'CLOSE',
              }),
              React.createElement(CrMenuButton, {
                key: 'close3',
                variant: 'close',
                layout: 'icon-only',
              }),
            ]
          ),
        ]),
        React.createElement('div', { key: 'dots' }, [
          React.createElement('h4', { key: 'title3' }, 'Dots Variants'),
          React.createElement(
            'div',
            {
              key: 'buttons3',
              style: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
            },
            [
              React.createElement(CrMenuButton, {
                key: 'dots1',
                variant: 'dots',
                layout: 'icon-left',
                text: 'MENU',
              }),
              React.createElement(CrMenuButton, {
                key: 'dots2',
                variant: 'dots',
                layout: 'icon-right',
                text: 'MENU',
              }),
              React.createElement(CrMenuButton, {
                key: 'dots3',
                variant: 'dots',
                layout: 'icon-only',
              }),
            ]
          ),
        ]),
      ]
    ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all button variants and layouts available.',
      },
    },
  },
}
