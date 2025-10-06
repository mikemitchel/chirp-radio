// CrPageHeader.stories.tsx
import React from 'react'
import CrPageHeader from './CrPageHeader'
import { PiPencilSimple, PiPlus, PiGear } from 'react-icons/pi'

export default {
  title: 'Molecules/CrPageHeader',
  component: CrPageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built from CrButton atom for action button. Page header component with eyebrow text, main title, and optional action button. Used for content sections and page tops. Supports showing/hiding different elements. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    eyebrowText: {
      control: 'text',
      description: 'Small text above the title',
    },
    title: {
      control: 'text',
      description: 'Main page title',
    },
    titleTag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML heading tag to use for the title',
    },
    titleSize: {
      control: 'select',
      options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'Typography size (applies cr-title-* class)',
    },
    showEyebrow: {
      control: 'boolean',
      description: 'Whether to show the eyebrow text',
    },
    showActionButton: {
      control: 'boolean',
      description: 'Whether to show the action button',
    },
    actionButtonText: {
      control: 'text',
      description: 'Text for the action button',
    },
    actionButtonIcon: {
      control: false,
      description: 'Icon for the action button (React element)',
    },
    onActionClick: {
      action: 'clicked',
      description: 'Action button click handler',
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    eyebrowText: 'CHIRP Radio',
    title: 'Profile - Edit',
    showEyebrow: true,
    showActionButton: true,
    actionButtonText: 'Edit',
    actionButtonIcon: React.createElement(PiPencilSimple),
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      React.createElement(CrPageHeader, {
        ...args,
        onActionClick: () => {
          console.log('Action button clicked')
        },
      })
    )
  },
}

export const WithoutEyebrow = {
  args: {
    eyebrowText: 'CHIRP Radio',
    title: 'Dashboard',
    showEyebrow: false,
    showActionButton: true,
    actionButtonText: 'Settings',
    actionButtonIcon: React.createElement(PiGear),
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      React.createElement(CrPageHeader, {
        ...args,
        onActionClick: () => {
          console.log('Settings clicked')
        },
      })
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Page header without eyebrow text, showing just the title and action button.',
      },
    },
  },
}

export const WithoutButton = {
  args: {
    eyebrowText: 'CHIRP Radio',
    title: 'Dashboard',
    showEyebrow: true,
    showActionButton: false,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      React.createElement(CrPageHeader, args)
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Page header without action button, showing just the eyebrow text and title.',
      },
    },
  },
}

export const TitleOnly = {
  args: {
    eyebrowText: 'CHIRP Radio',
    title: 'Simple Page Title',
    showEyebrow: false,
    showActionButton: false,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      React.createElement(CrPageHeader, args)
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal page header with just the title, no eyebrow text or action button.',
      },
    },
  },
}

export const AddAction = {
  args: {
    eyebrowText: 'CHIRP Radio',
    title: 'Music Library',
    showEyebrow: true,
    showActionButton: true,
    actionButtonText: 'Add Track',
    actionButtonIcon: React.createElement(PiPlus),
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      React.createElement(CrPageHeader, {
        ...args,
        onActionClick: () => {
          console.log('Add track clicked')
        },
      })
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Page header with add action button and plus icon.',
      },
    },
  },
}

export const SettingsAction = {
  args: {
    eyebrowText: 'CHIRP Radio',
    title: 'User Management',
    showEyebrow: true,
    showActionButton: true,
    actionButtonText: 'Settings',
    actionButtonIcon: React.createElement(PiGear),
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      React.createElement(CrPageHeader, {
        ...args,
        onActionClick: () => {
          console.log('Settings clicked')
        },
      })
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Page header with settings action button and gear icon.',
      },
    },
  },
}

export const LongTitle = {
  args: {
    eyebrowText: 'CHIRP Radio',
    title: 'Very Long Page Title That Might Wrap On Mobile Devices',
    showEyebrow: true,
    showActionButton: true,
    actionButtonText: 'Action',
    actionButtonIcon: React.createElement(PiPencilSimple),
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      React.createElement(CrPageHeader, {
        ...args,
        onActionClick: () => {
          console.log('Long title action clicked')
        },
      })
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Page header with a long title to demonstrate responsive behavior.',
      },
    },
  },
}
