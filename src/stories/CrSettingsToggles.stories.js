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
      control: 'boolean',
      description: 'Dark mode enabled state',
    },
    onDarkModeChange: {
      action: 'darkModeChanged',
    },
  },
}

export const Default = {
  render: (args) => React.createElement(CrSettingsToggles, args),
  args: {
    streamingQuality: '128',
    pushNotifications: false,
    darkMode: false,
  },
}

export const AllEnabled = {
  render: (args) => React.createElement(CrSettingsToggles, args),
  args: {
    streamingQuality: '128',
    pushNotifications: true,
    darkMode: true,
  },
}

export const LowQuality = {
  render: (args) => React.createElement(CrSettingsToggles, args),
  args: {
    streamingQuality: '64',
    pushNotifications: false,
    darkMode: false,
  },
}

export const WithHandlers = {
  render: (args) =>
    React.createElement(CrSettingsToggles, {
      ...args,
      onStreamingQualityChange: (quality) => console.log('Streaming quality changed to:', quality),
      onPushNotificationsChange: (enabled) => console.log('Push notifications:', enabled),
      onDarkModeChange: (enabled) => console.log('Dark mode:', enabled),
    }),
  args: {
    streamingQuality: '128',
    pushNotifications: false,
    darkMode: false,
  },
}
