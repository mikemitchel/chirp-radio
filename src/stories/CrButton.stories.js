import React from 'react'
import CrButton from './CrButton'
import {
  PiHandHeartLight,
  PiCaretLeft,
  PiCaretRight,
  PiUserCircle,
  PiGear,
  PiChatCircleTextLight,
  PiMusicNotes,
  PiPlayFill,
  PiPauseFill,
} from 'react-icons/pi'

export default {
  title: 'Atoms/CrButton',
  component: CrButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Flexible button component for all interactive actions in the CHIRP Radio interface. Supports multiple variants (solid, outline, text), sizes (xsmall through large), and color themes (primary, secondary, default, light). Can include left or right icons, loading states with spinners, and disabled states. Maintains full keyboard navigation and ARIA compliance for accessibility. Use solid buttons for primary actions, outline for secondary actions, and text buttons for tertiary or subtle actions. Dark mode styling adapts automatically through [data-theme="dark"] CSS selectors while maintaining proper contrast ratios and visual hierarchy.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'text'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'default', 'light'],
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Toggle left arrow icon',
      defaultValue: true,
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Toggle right arrow icon',
      defaultValue: true,
    },
  },
}

export const Default = {
  render: (args) => {
    const { showLeftIcon, showRightIcon, ...buttonArgs } = args
    const leftIcon = showLeftIcon ? React.createElement(PiCaretLeft) : null
    const rightIcon = showRightIcon ? React.createElement(PiCaretRight) : null

    return React.createElement(CrButton, {
      ...buttonArgs,
      leftIcon: leftIcon,
      rightIcon: rightIcon,
    })
  },
  args: {
    children: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
  },
}

export const Large = {
  args: {
    children: 'Large',
    size: 'large',
  },
}

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const CommunityButton = {
  render: (args) => {
    const heartIcon = React.createElement(PiHandHeartLight)
    return React.createElement(CrButton, {
      ...args,
      leftIcon: heartIcon,
      children: 'Community',
      variant: 'solid',
      color: 'secondary',
    })
  },
  args: {},
}

export const UserAccount = {
  render: (args) => {
    const userIcon = React.createElement(PiUserCircle)
    return React.createElement(CrButton, {
      ...args,
      leftIcon: userIcon,
      children: 'Account',
      variant: 'outline',
      color: 'default',
    })
  },
  args: {},
}

export const Settings = {
  render: (args) => {
    const settingsIcon = React.createElement(PiGear)
    return React.createElement(CrButton, {
      ...args,
      rightIcon: settingsIcon,
      children: 'Settings',
      variant: 'text',
      color: 'primary',
    })
  },
  args: {},
}

export const RequestButton = {
  render: (args) => {
    const chatIcon = React.createElement(PiChatCircleTextLight)
    return React.createElement(CrButton, {
      ...args,
      leftIcon: chatIcon,
      children: 'Request',
      variant: 'solid',
      color: 'primary',
      size: 'small',
    })
  },
  args: {},
}

export const MusicCollection = {
  render: (args) => {
    const musicIcon = React.createElement(PiMusicNotes)
    return React.createElement(CrButton, {
      ...args,
      leftIcon: musicIcon,
      children: 'Your Collection',
      variant: 'text',
      color: 'secondary',
      size: 'medium',
    })
  },
  args: {},
}

export const PlayButton = {
  render: (args) => {
    const playIcon = React.createElement(PiPlayFill)
    return React.createElement(CrButton, {
      ...args,
      leftIcon: playIcon,
      children: 'Play',
      variant: 'solid',
      color: 'primary',
      size: 'large',
    })
  },
  args: {},
}

export const LightSettings = {
  render: (args) => {
    const lightGearIcon = React.createElement(PiGear)
    return React.createElement(CrButton, {
      ...args,
      rightIcon: lightGearIcon,
      children: 'Account Settings',
      variant: 'text',
      color: 'default',
      size: 'xsmall',
    })
  },
  args: {},
}

export const WithArrowIcons = {
  render: (args) => {
    const { showLeftIcon, showRightIcon, ...buttonArgs } = args
    const leftIcon = showLeftIcon ? React.createElement(PiCaretLeft) : null
    const rightIcon = showRightIcon ? React.createElement(PiCaretRight) : null

    return React.createElement(CrButton, {
      ...buttonArgs,
      leftIcon: leftIcon,
      rightIcon: rightIcon,
    })
  },
  args: {
    children: 'Navigation',
    variant: 'text',
    color: 'primary',
    size: 'large',
    showLeftIcon: true,
    showRightIcon: true,
  },
}

export const AllSizesShowcase = {
  render: () => {
    const heartIcon = React.createElement(PiHandHeartLight)
    const rightArrow = React.createElement(PiCaretRight)

    return React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--cr-space-4)',
          alignItems: 'center',
        },
      },
      [
        React.createElement(CrButton, {
          key: 'xl-btn',
          leftIcon: heartIcon,
          rightIcon: rightArrow,
          children: 'Large Button',
          size: 'large',
          variant: 'solid',
          color: 'primary',
        }),
        React.createElement(CrButton, {
          key: 'md-btn',
          leftIcon: heartIcon,
          rightIcon: rightArrow,
          children: 'Medium Button',
          size: 'medium',
          variant: 'outline',
          color: 'secondary',
        }),
        React.createElement(CrButton, {
          key: 'sm-btn',
          leftIcon: heartIcon,
          rightIcon: rightArrow,
          children: 'Small Button',
          size: 'small',
          variant: 'text',
          color: 'default',
        }),
        React.createElement(CrButton, {
          key: 'xs-btn',
          rightIcon: rightArrow,
          children: 'XSmall',
          size: 'xsmall',
          variant: 'text',
          color: 'primary',
        }),
      ]
    )
  },
  args: {},
}
