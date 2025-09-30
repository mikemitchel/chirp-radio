// CrToast.stories.tsx
import React from 'react';
import CrToast from './CrToast';

// Image background decorator with better sizing
const withImageBackground = (Story) => React.createElement('div', {
  style: { 
    position: 'relative', 
    width: '100%', 
    maxHeight: '150px',
    height: '150px',
    backgroundImage: 'url("https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
}, React.createElement(Story));

// Text content background decorator
const withTextBackground = (Story) => React.createElement('div', {
  style: { 
    position: 'relative', 
    width: '100%', 
    maxHeight: '150px',
    height: '150px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
}, [
  React.createElement('div', {
    key: 'text-content',
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: '20px',
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#333'
    }
  }, [
    React.createElement('h2', { 
      key: 'title',
      style: { margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' } 
    }, 'CHIRP Radio - Now Playing'),
    React.createElement('p', { 
      key: 'p1',
      style: { margin: '0 0 10px 0' } 
    }, 'Welcome to CHIRP Radio, Chicago\'s independent voice for music discovery. We\'re currently playing an amazing mix of indie rock, electronic, and world music that you won\'t hear anywhere else.'),
    React.createElement('p', { 
      key: 'p2',
      style: { margin: '0 0 10px 0' } 
    }, 'Our DJs are passionate about bringing you the latest and greatest from emerging artists alongside classics from established acts. Tune in 24/7 for commercial-free listening.'),
    React.createElement('p', { 
      key: 'p3',
      style: { margin: '0' } 
    }, 'Support independent radio by becoming a member today. Your contribution helps us continue our mission of musical discovery and community engagement.')
  ]),
  React.createElement('div', {
    key: 'toast-container',
    style: {
      position: 'relative',
      zIndex: 10
    }
  }, React.createElement(Story))
]);

export default {
  title: 'Molecules/CrToast',
  component: CrToast,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Built from CrMenuButton atom for dismiss action. Notification toast component for displaying temporary messages and alerts. Auto-dismisses after timeout or via close button. Supports different message types and positioning. Dark mode adapts through [data-theme="dark"] CSS selectors.'
      }
    }
  },
  decorators: [withImageBackground],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Type of toast notification'
    },
    title: {
      control: 'text',
      description: 'Main title text'
    },
    message: {
      control: 'text',
      description: 'Descriptive message text'
    },
    linkText: {
      control: 'text',
      description: 'Text for clickable link within message'
    },
    linkHref: {
      control: 'text',
      description: 'URL for the link'
    },
    showDismiss: {
      control: 'boolean',
      description: 'Whether to show the dismiss button'
    },
    onLinkClick: {
      action: 'link clicked',
      description: 'Callback when link is clicked'
    },
    onClose: {
      action: 'toast dismissed',
      description: 'Callback when toast is dismissed'
    }
  },
};

// Default story - Success type with dismiss button
export const Default = {
  args: {
    type: 'success',
    title: 'Song Added to Favorites',
    message: '"Song Name" added to Favorites.',
    linkText: 'View your Favorites list in your Account',
    linkHref: '/favorites',
    showDismiss: true
  },
};

// Success notification with dismiss
export const Success = {
  render: (args) => React.createElement(CrToast, args),
  args: {
    type: 'success',
    title: 'Settings Saved',
    message: 'Your preferences have been updated successfully.',
    linkText: 'View Settings',
    linkHref: '/settings',
    showDismiss: true
  },
};

// Info notification with dismiss
export const Info = {
  render: (args) => React.createElement(CrToast, args),
  args: {
    type: 'info',
    title: 'Profile Updated',
    message: 'Your profile information has been saved successfully.',
    linkText: 'View Profile',
    linkHref: '/profile',
    showDismiss: true
  },
};

// Warning notification with dismiss
export const Warning = {
  render: (args) => React.createElement(CrToast, args),
  args: {
    type: 'warning',
    title: 'Connection Issue',
    message: 'Stream quality may be affected by poor network connection.',
    linkText: 'Troubleshoot',
    linkHref: '/help/connection',
    showDismiss: true
  },
};

// Error notification with dismiss
export const Error = {
  render: (args) => React.createElement(CrToast, args),
  args: {
    type: 'error',
    title: 'Playback Error',
    message: 'Unable to play the requested song. Please try again.',
    linkText: 'Report Issue',
    linkHref: '/support',
    showDismiss: true
  },
};

// Toast over text content example
export const OverTextContent = {
  render: (args) => React.createElement(CrToast, args),
  decorators: [withTextBackground],
  args: {
    type: 'success',
    title: 'Song Added to Favorites',
    message: '"Midnight City" by M83 added to Favorites.',
    linkText: 'View your Favorites list',
    linkHref: '/favorites',
    showDismiss: true
  },
};

// Simple notification without link but with dismiss
export const WithoutLink = {
  render: (args) => React.createElement(CrToast, args),
  args: {
    type: 'success',
    title: 'Settings Saved',
    message: 'Your preferences have been updated successfully.',
    showDismiss: true
  },
};

// Title only with dismiss
export const TitleOnly = {
  render: (args) => React.createElement(CrToast, args),
  args: {
    type: 'info',
    title: 'Now Playing: Artist Name - Song Title',
    showDismiss: true
  },
};

// Without dismiss button (legacy behavior)
export const WithoutDismiss = {
  render: (args) => React.createElement(CrToast, args),
  args: {
    type: 'success',
    title: 'Auto-Dismissing Toast',
    message: 'This toast will auto-dismiss after timeout.',
    showDismiss: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast without dismiss button - relies on auto-dismiss timeout only.'
      }
    }
  }
};

// Story without glass effect for comparison
export const OnPlainBackground = {
  render: (args) => React.createElement(CrToast, args),
  decorators: [],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  args: {
    type: 'success',
    title: 'Song Added to Favorites',
    message: '"Song Name" added to Favorites.',
    linkText: 'View your Favorites list in your Account',
    linkHref: '/favorites',
    showDismiss: true
  },
};