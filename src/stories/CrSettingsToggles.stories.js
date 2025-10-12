// CrSettingsToggles.stories.js
import React from 'react'
import CrSettingsToggles from './CrSettingsToggles'

export default {
  title: 'Molecules/CrSettingsToggles',
  component: CrSettingsToggles,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Settings toggles component containing Dark Mode, Streaming Quality, and Push Notifications controls. Used in both CrAccountSettingsPage and CrProfileCard.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    streamingQuality: {
      control: { type: 'select' },
      options: ['64', '128'],
      description: 'Current streaming quality selection',
    },
    onStreamingQualityChange: {
      action: 'streamingQualityChanged',
    },
    pushNotifications: {
      control: 'boolean',
      description: 'Push notifications enabled state',
    },
    onPushNotificationsChange: {
      action: 'pushNotificationsChanged',
    },
    darkMode: {
      control: { type: 'select' },
      options: ['light', 'dark', 'device'],
      description: 'Dark mode selection',
    },
    onDarkModeChange: {
      action: 'darkModeChanged',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Toggle size',
    },
  },
}

export const Default = {
  render: (args) => React.createElement(CrSettingsToggles, args),
  args: {
    streamingQuality: '128',
    pushNotifications: false,
    darkMode: 'device',
    size: 'large',
  },
}

export const SmallSize = {
  render: (args) => React.createElement(CrSettingsToggles, args),
  args: {
    streamingQuality: '128',
    pushNotifications: true,
    darkMode: 'device',
    size: 'small',
  },
}

export const MediumSize = {
  render: (args) => React.createElement(CrSettingsToggles, args),
  args: {
    streamingQuality: '64',
    pushNotifications: false,
    darkMode: 'light',
    size: 'medium',
  },
}

export const LargeSize = {
  render: (args) => React.createElement(CrSettingsToggles, args),
  args: {
    streamingQuality: '128',
    pushNotifications: true,
    darkMode: 'dark',
    size: 'large',
  },
}

export const WithHandlers = {
  render: (args) =>
    React.createElement(CrSettingsToggles, {
      ...args,
      onStreamingQualityChange: (quality) => console.log('Streaming quality changed to:', quality),
      onPushNotificationsChange: (enabled) => console.log('Push notifications:', enabled),
      onDarkModeChange: (mode) => console.log('Dark mode:', mode),
    }),
  args: {
    streamingQuality: '128',
    pushNotifications: false,
    darkMode: 'device',
    size: 'large',
  },
}
