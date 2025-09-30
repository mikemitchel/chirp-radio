// CrAccountSettingsPage.stories.tsx
import React from 'react';
import CrAccountSettingsPage from './CrAccountSettingsPage';

export default {
  title: 'Templates/CrAccountSettingsPage',
  component: CrAccountSettingsPage,
  parameters: {
    layout: 'fullscreen',
docs: {
  description: {
    component: 'CrAccountSettingsPage uses the CrToggle atom and the CrButton atom. This component provides complete account settings interface with user preferences, streaming quality toggle, push notifications toggle, and app-specific actions like app support and terms/privacy access. Handles both logged-in and logged-out states with appropriate authentication options. Complex settings management makes it a proper Template. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Whether the user is logged in'
    },
    userEmail: {
      control: 'text',
      description: 'User email to display when logged in'
    },
    streamingQuality: {
      control: { type: 'select' },
      options: ['128', '64'],
      description: 'Streaming quality setting'
    },
    pushNotifications: {
      control: 'boolean',
      description: 'Push notifications toggle state'
    }
  },
};

// Not logged in state (default)
export const NotLoggedIn = {
  render: (args) => React.createElement(CrAccountSettingsPage, args),
  args: {
    isLoggedIn: false,
    streamingQuality: '128',
    pushNotifications: false,
    onStreamingQualityChange: (quality) => console.log('Streaming quality:', quality),
    onPushNotificationsChange: (checked) => console.log('Push notifications:', checked),
    onLogin: () => console.log('Login clicked'),
    onSignUp: () => console.log('Sign up clicked'),
    onForgotPassword: () => console.log('Forgot password clicked'),
    onShareApp: () => console.log('Share app clicked'),
    onLikeAppStore: () => console.log('Like app store clicked'),
    onAppSupport: () => console.log('App support clicked'),
    onTermsPrivacy: () => console.log('Terms & privacy clicked')
  },
};

// Logged in state
export const LoggedIn = {
  render: (args) => React.createElement(CrAccountSettingsPage, args),
  args: {
    isLoggedIn: true,
    userEmail: 'account@gmail.com',
    streamingQuality: '128',
    pushNotifications: false,
    onStreamingQualityChange: (quality) => console.log('Streaming quality:', quality),
    onPushNotificationsChange: (checked) => console.log('Push notifications:', checked),
    onLogout: () => console.log('Logout clicked'),
    onShareApp: () => console.log('Share app clicked'),
    onLikeAppStore: () => console.log('Like app store clicked'),
    onAppSupport: () => console.log('App support clicked'),
    onTermsPrivacy: () => console.log('Terms & privacy clicked')
  },
};

// All notifications enabled
export const AllNotificationsEnabled = {
  render: (args) => React.createElement(CrAccountSettingsPage, args),
  args: {
    isLoggedIn: true,
    userEmail: 'user@example.com',
    streamingQuality: '64',
    pushNotifications: true,
    onStreamingQualityChange: (quality) => console.log('Streaming quality:', quality),
    onPushNotificationsChange: (checked) => console.log('Push notifications:', checked),
    onLogout: () => console.log('Logout clicked'),
    onShareApp: () => console.log('Share app clicked'),
    onLikeAppStore: () => console.log('Like app store clicked'),
    onAppSupport: () => console.log('App support clicked'),
    onTermsPrivacy: () => console.log('Terms & privacy clicked')
  },
};

// Low quality streaming
export const LowQualityStreaming = {
  render: (args) => React.createElement(CrAccountSettingsPage, args),
  args: {
    isLoggedIn: false,
    streamingQuality: '64',
    pushNotifications: true,
    onStreamingQualityChange: (quality) => console.log('Streaming quality:', quality),
    onPushNotificationsChange: (checked) => console.log('Push notifications:', checked),
    onLogin: () => console.log('Login clicked'),
    onSignUp: () => console.log('Sign up clicked'),
    onForgotPassword: () => console.log('Forgot password clicked'),
    onShareApp: () => console.log('Share app clicked'),
    onLikeAppStore: () => console.log('Like app store clicked'),
    onAppSupport: () => console.log('App support clicked'),
    onTermsPrivacy: () => console.log('Terms & privacy clicked')
  },
};