// CrModal.stories.js
import React from 'react';
import CrModal from './CrModal';
import CrButton from './CrButton';
import { PiMusicNotes, PiArrowRight } from 'react-icons/pi';

export default {
  title: 'Molecules/CrModal',
  component: CrModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Built from CrButton atoms, CrMenuButton atom for close action, CrScrim atom for backdrop overlay, and content area. Modal dialog component with customizable content, close button, and backdrop overlay using CrScrim. Supports different sizes and content types with proper focus management and keyboard navigation. Always visible in Storybook for design review. Dark mode adapts through [data-theme="dark"] CSS selectors.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
      description: 'Modal size variant'
    },
    showDjInfo: {
      control: 'boolean',
      description: 'Show DJ information in header'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button (uses CrMenuButton with close variant)'
    },
    scrimOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Backdrop opacity'
    },
    onClose: {
      action: 'modal closed',
      description: 'Callback when modal is closed via CrMenuButton'
    }
  }
};

export const Default = {
  args: {
    title: 'Basic Modal',
    showDjInfo: false,
    showCloseButton: true,
    scrimOpacity: 0.5
  },
  render: (args) => {
    return React.createElement('div', {
      style: { height: '100vh', position: 'relative', background: 'var(--cr-background)' }
    }, [
      // Background content
      React.createElement('div', {
        key: 'bg-content',
        style: { 
          padding: 'var(--cr-space-4)',
          height: '100vh'
        }
      }, [
        React.createElement('h1', { key: 'title' }, 'Page Content'),
        React.createElement('p', { key: 'desc' }, 'This is the background content that appears behind the modal.')
      ]),
      // Modal overlay
      React.createElement(CrModal, {
        key: 'modal',
        ...args
      }, 
        React.createElement('div', { key: 'modal-content' }, [
          React.createElement('p', { key: 'p1' }, 'This is a basic modal without DJ information.'),
          React.createElement('p', { key: 'p2' }, 'You can put any content here including forms, images, and interactive elements.'),
          React.createElement('p', { key: 'p3' }, 'The close button now uses CrMenuButton with the close variant for consistency.'),
          React.createElement('div', {
            key: 'actions',
            style: { 
              display: 'flex', 
              justifyContent: 'flex-end',
              marginTop: 'var(--cr-space-4)' 
            }
          }, 
            React.createElement(CrButton, {
              key: 'action',
              variant: 'solid',
              color: 'primary'
            }, 'Take Action')
          )
        ])
      )
    ]);
  }
};

export const WithDjInfo = {
  args: {
    title: 'DJ Modal Example',
    showDjInfo: true,
    djName: 'DJ Sarah',
    showName: 'Morning Mixtape',
    isOnAir: true,
    statusText: 'On-Air',
    showCloseButton: true,
    scrimOpacity: 0.5
  },
  render: (args) => {
    return React.createElement('div', {
      style: { height: '100vh', position: 'relative', background: 'var(--cr-background)' }
    }, [
      // Background content
      React.createElement('div', {
        key: 'bg-content-dj',
        style: { 
          padding: 'var(--cr-space-4)',
          height: '100vh'
        }
      }, [
        React.createElement('h1', { key: 'title' }, 'CHIRP Radio'),
        React.createElement('p', { key: 'desc' }, 'Modal with DJ information in the header area.')
      ]),
      // Modal overlay
      React.createElement(CrModal, {
        key: 'modal-dj',
        ...args
      }, 
        React.createElement('div', { key: 'modal-content-dj' }, [
          React.createElement('p', { key: 'intro' }, 'This modal includes DJ information in the header, showing the current DJ and show details.'),
          React.createElement('p', { key: 'desc' }, 'This is useful for modals that appear during live broadcasts or show-specific interactions.'),
          React.createElement('div', {
            key: 'actions',
            style: { 
              display: 'flex', 
              justifyContent: 'space-between',
              gap: 'var(--cr-space-2)',
              marginTop: 'var(--cr-space-4)' 
            }
          }, [
            React.createElement(CrButton, {
              key: 'cancel',
              variant: 'outline',
              color: 'default'
            }, 'Cancel'),
            React.createElement(CrButton, {
              key: 'submit',
              variant: 'solid',
              color: 'primary'
            }, 'Submit')
          ])
        ])
      )
    ]);
  }
};

export const SmallSize = {
  args: {
    title: 'Confirmation',
    size: 'small',
    showDjInfo: false,
    showCloseButton: true,
    scrimOpacity: 0.5
  },
  render: (args) => {
    return React.createElement('div', {
      style: { height: '100vh', position: 'relative', background: 'var(--cr-background)' }
    }, [
      // Background content
      React.createElement('div', {
        key: 'bg-content-small',
        style: { 
          padding: 'var(--cr-space-4)',
          height: '100vh'
        }
      }, [
        React.createElement('h1', { key: 'title' }, 'Application'),
        React.createElement('p', { key: 'desc' }, 'Small modal for confirmations and quick actions.')
      ]),
      // Modal overlay
      React.createElement(CrModal, {
        key: 'modal-small',
        ...args
      }, 
        React.createElement('div', { key: 'modal-content-small' }, [
          React.createElement('p', { key: 'confirm' }, 'Are you sure you want to delete this item? This action cannot be undone.'),
          React.createElement('div', {
            key: 'actions',
            style: { 
              display: 'flex', 
              justifyContent: 'space-between', 
              gap: 'var(--cr-space-2)',
              marginTop: 'var(--cr-space-4)' 
            }
          }, [
            React.createElement(CrButton, {
              key: 'cancel',
              variant: 'outline',
              color: 'default'
            }, 'Cancel'),
            React.createElement(CrButton, {
              key: 'delete',
              variant: 'solid',
              color: 'primary'
            }, 'Delete')
          ])
        ])
      )
    ]);
  }
};

export const LargeSize = {
  args: {
    title: 'Large Content Modal',
    size: 'large',
    showDjInfo: false,
    showCloseButton: true,
    scrimOpacity: 0.5
  },
  render: (args) => {
    return React.createElement('div', {
      style: { height: '100vh', position: 'relative', background: 'var(--cr-background)' }
    }, [
      // Background content
      React.createElement('div', {
        key: 'bg-content-large',
        style: { 
          padding: 'var(--cr-space-4)',
          height: '100vh'
        }
      }, [
        React.createElement('h1', { key: 'title' }, 'Page Content'),
        React.createElement('p', { key: 'desc' }, 'Large modal with extensive content example.')
      ]),
      // Modal overlay
      React.createElement(CrModal, {
        key: 'modal-large',
        ...args
      }, 
        React.createElement('div', { key: 'modal-content-large' }, [
          React.createElement('p', { key: 'intro' }, 'This is a large modal that can contain more extensive content.'),
          React.createElement('h3', { key: 'section1' }, 'Section One'),
          React.createElement('p', { key: 'content1' }, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
          React.createElement('h3', { key: 'section2' }, 'Section Two'),
          React.createElement('p', { key: 'content2' }, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
          React.createElement('h3', { key: 'section3' }, 'Section Three'),
          React.createElement('p', { key: 'content3' }, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'),
          React.createElement('div', {
            key: 'actions',
            style: { 
              display: 'flex', 
              justifyContent: 'flex-end',
              marginTop: 'var(--cr-space-6)' 
            }
          }, 
            React.createElement(CrButton, {
              key: 'close',
              variant: 'solid',
              color: 'primary'
            }, 'Done')
          )
        ])
      )
    ]);
  }
};

export const LightScrim = {
  args: {
    title: 'Light Background Modal',
    showDjInfo: false,
    showCloseButton: true,
    scrimOpacity: 0.2
  },
  render: (args) => {
    return React.createElement('div', {
      style: { height: '100vh', position: 'relative', background: 'var(--cr-background)' }
    }, [
      // Background content
      React.createElement('div', {
        key: 'bg-content-light',
        style: { 
          padding: 'var(--cr-space-4)',
          height: '100vh'
        }
      }, [
        React.createElement('h1', { key: 'title' }, 'Background Content'),
        React.createElement('p', { key: 'desc1' }, 'This content is still visible behind the modal due to the lighter scrim.'),
        React.createElement('p', { key: 'desc2' }, 'The scrim opacity is set to 0.2 instead of the default 0.5.')
      ]),
      // Modal overlay
      React.createElement(CrModal, {
        key: 'modal-light',
        ...args
      }, 
        React.createElement('div', { key: 'modal-content-light' }, [
          React.createElement('p', { key: 'desc' }, 'This modal uses a lighter scrim opacity (0.2) to show more of the background content.'),
          React.createElement('p', { key: 'desc2' }, 'Adjust the scrimOpacity control to see different backdrop effects.'),
          React.createElement('div', {
            key: 'actions',
            style: { 
              display: 'flex', 
              justifyContent: 'flex-end',
              marginTop: 'var(--cr-space-4)' 
            }
          }, 
            React.createElement(CrButton, {
              key: 'close',
              variant: 'solid',
              color: 'primary'
            }, 'Close')
          )
        ])
      )
    ]);
  }
};

export const NoCloseButton = {
  args: {
    title: 'System Message',
    showDjInfo: false,
    showCloseButton: false,
    scrimOpacity: 0.6
  },
  render: (args) => {
    return React.createElement('div', {
      style: { height: '100vh', position: 'relative', background: 'var(--cr-background)' }
    }, [
      // Background content
      React.createElement('div', {
        key: 'bg-content-noclose',
        style: { 
          padding: 'var(--cr-space-4)',
          height: '100vh'
        }
      }, [
        React.createElement('h1', { key: 'title' }, 'System Page'),
        React.createElement('p', { key: 'desc' }, 'Important system message modal without close button.')
      ]),
      // Modal overlay
      React.createElement(CrModal, {
        key: 'modal-noclose',
        ...args
      }, 
        React.createElement('div', { key: 'modal-content-noclose' }, [
          React.createElement('div', {
            key: 'icon',
            style: { 
              textAlign: 'center', 
              marginBottom: 'var(--cr-space-4)',
              fontSize: '48px'
            }
          }, React.createElement(PiMusicNotes, { style: { color: 'var(--cr-primary-500)' } })),
          React.createElement('p', { 
            key: 'message',
            style: { textAlign: 'center' }
          }, 'This modal has no close button in the header. Users must use the action buttons to proceed.'),
          React.createElement('div', {
            key: 'actions',
            style: { 
              display: 'flex', 
              justifyContent: 'space-between',
              gap: 'var(--cr-space-2)',
              marginTop: 'var(--cr-space-6)' 
            }
          }, [
            React.createElement(CrButton, {
              key: 'later',
              variant: 'outline',
              color: 'default'
            }, 'Maybe Later'),
            React.createElement(CrButton, {
              key: 'continue',
              variant: 'solid',
              color: 'primary'
            }, 'Continue')
          ])
        ])
      )
    ]);
  }
};