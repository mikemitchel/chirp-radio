// CrModal.stories.tsx
import React from 'react'
import CrModal from './CrModal'
import CrButton from './CrButton'
import { PiMusicNotes, PiArrowRight } from 'react-icons/pi'

export default {
  title: 'Molecules/CrModal',
  component: CrModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Built from CrButton atoms, CrMenuButton atom for close action, CrScrim atom for backdrop overlay, and content area. Modal dialog component with customizable content, close button, and backdrop overlay using CrScrim. Supports different sizes and content types with proper focus management and keyboard navigation. Uses React Portal to render at document.body level, ensuring it appears above all other content. Dark mode adapts through [data-theme="dark"] CSS selectors. To use the modal, manage its visibility with useState: create an isOpen state, pass it to the isOpen prop, and provide onClose and scrimOnClick handlers that set the state to false. Trigger the modal by setting isOpen to true (e.g., via a button click).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: false,
      description: 'Controls modal visibility - manage with useState in your component',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
      description: 'Modal size variant',
    },
    showDjInfo: {
      control: 'boolean',
      description: 'Show DJ information in header',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button (uses CrMenuButton with close variant)',
    },
    scrimOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Backdrop opacity',
    },
    onClose: {
      action: 'modal closed',
      description: 'Callback when modal is closed via CrMenuButton',
    },
    scrimOnClick: {
      action: 'scrim clicked',
      description: 'Callback when scrim/backdrop is clicked',
    },
  },
}

export const Default = {
  args: {
    title: 'Basic Modal',
    showDjInfo: false,
    showCloseButton: true,
    scrimOpacity: 0.75,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return React.createElement(
      'div',
      {
        style: {
          padding: 'var(--cr-space-4)',
          background: 'var(--cr-background)',
        },
      },
      [
        React.createElement('h1', { key: 'title' }, 'Page Content'),
        React.createElement(
          'p',
          { key: 'desc' },
          'This is the background content that appears behind the modal.'
        ),
        React.createElement(
          CrButton,
          {
            key: 'open-button',
            variant: 'solid',
            color: 'primary',
            onClick: () => setIsOpen(true),
          },
          'Open Modal'
        ),
        // Modal overlay
        React.createElement(
          CrModal,
          {
            key: 'modal',
            ...args,
            isOpen: isOpen,
            onClose: () => setIsOpen(false),
            scrimOnClick: () => setIsOpen(false),
          },
          React.createElement('div', { key: 'modal-content', className: 'cr-modal__body' }, [
            React.createElement(
              'p',
              { key: 'p1', className: 'cr-modal__text' },
              'This is a basic modal without DJ information.'
            ),
            React.createElement(
              'p',
              { key: 'p2', className: 'cr-modal__text' },
              'You can put any content here including forms, images, and interactive elements.'
            ),
            React.createElement(
              'p',
              { key: 'p3', className: 'cr-modal__text' },
              'The close button now uses CrMenuButton with the close variant for consistency.'
            ),
            React.createElement(
              'div',
              {
                key: 'actions',
                className: 'cr-modal__actions',
              },
              React.createElement(
                CrButton,
                {
                  key: 'action',
                  variant: 'solid',
                  color: 'primary',
                  onClick: () => setIsOpen(false),
                },
                'Take Action'
              )
            ),
          ])
        ),
      ]
    )
  },
}

export const WithDjInfo = {
  args: {
    title: 'DJ Modal Example',
    showDjInfo: true,
    djName: 'DJ Sarah',
    showName: 'Morning Mixtape',
    isOnAir: true,
    statusText: 'On-Air',
    showCloseButton: true,
    scrimOpacity: 0.75,
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          height: '100vh',
          position: 'relative',
          background: 'var(--cr-background)',
        },
      },
      [
        // Background content
        React.createElement(
          'div',
          {
            key: 'bg-content-dj',
            style: {
              padding: 'var(--cr-space-4)',
              height: '100vh',
            },
          },
          [
            React.createElement('h1', { key: 'title' }, 'CHIRP Radio'),
            React.createElement(
              'p',
              { key: 'desc' },
              'Modal with DJ information in the header area.'
            ),
          ]
        ),
        // Modal overlay
        React.createElement(
          CrModal,
          {
            key: 'modal-dj',
            ...args,
            isOpen: true,
          },
          React.createElement('div', { key: 'modal-content-dj', className: 'cr-modal__body' }, [
            React.createElement(
              'p',
              { key: 'intro', className: 'cr-modal__text' },
              'This modal includes DJ information in the header, showing the current DJ and show details.'
            ),
            React.createElement(
              'p',
              { key: 'desc', className: 'cr-modal__text' },
              'This is useful for modals that appear during live broadcasts or show-specific interactions.'
            ),
            React.createElement(
              'div',
              {
                key: 'actions',
                className: 'cr-modal__actions cr-modal__actions--space-between cr-modal__actions--gap',
              },
              [
                React.createElement(
                  CrButton,
                  {
                    key: 'cancel',
                    variant: 'outline',
                    color: 'default',
                  },
                  'Cancel'
                ),
                React.createElement(
                  CrButton,
                  {
                    key: 'submit',
                    variant: 'solid',
                    color: 'primary',
                  },
                  'Submit'
                ),
              ]
            ),
          ])
        ),
      ]
    )
  },
}

export const SmallSize = {
  args: {
    title: 'Confirmation',
    size: 'small',
    showDjInfo: false,
    showCloseButton: true,
    scrimOpacity: 0.75,
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          height: '100vh',
          position: 'relative',
          background: 'var(--cr-background)',
        },
      },
      [
        // Background content
        React.createElement(
          'div',
          {
            key: 'bg-content-small',
            style: {
              padding: 'var(--cr-space-4)',
              height: '100vh',
            },
          },
          [
            React.createElement('h1', { key: 'title' }, 'Application'),
            React.createElement(
              'p',
              { key: 'desc' },
              'Small modal for confirmations and quick actions.'
            ),
          ]
        ),
        // Modal overlay
        React.createElement(
          CrModal,
          {
            key: 'modal-small',
            ...args,
            isOpen: true,
          },
          React.createElement('div', { key: 'modal-content-small', className: 'cr-modal__body' }, [
            React.createElement(
              'p',
              { key: 'confirm', className: 'cr-modal__text' },
              'Are you sure you want to delete this item? This action cannot be undone.'
            ),
            React.createElement(
              'div',
              {
                key: 'actions',
                className: 'cr-modal__actions cr-modal__actions--space-between cr-modal__actions--gap',
              },
              [
                React.createElement(
                  CrButton,
                  {
                    key: 'cancel',
                    variant: 'outline',
                    color: 'default',
                  },
                  'Cancel'
                ),
                React.createElement(
                  CrButton,
                  {
                    key: 'delete',
                    variant: 'solid',
                    color: 'primary',
                  },
                  'Delete'
                ),
              ]
            ),
          ])
        ),
      ]
    )
  },
}

export const LargeSize = {
  args: {
    title: 'Large Content Modal',
    size: 'large',
    showDjInfo: false,
    showCloseButton: true,
    scrimOpacity: 0.75,
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          height: '100vh',
          position: 'relative',
          background: 'var(--cr-background)',
        },
      },
      [
        // Background content
        React.createElement(
          'div',
          {
            key: 'bg-content-large',
            style: {
              padding: 'var(--cr-space-4)',
              height: '100vh',
            },
          },
          [
            React.createElement('h1', { key: 'title' }, 'Page Content'),
            React.createElement(
              'p',
              { key: 'desc' },
              'Large modal with extensive content example.'
            ),
          ]
        ),
        // Modal overlay
        React.createElement(
          CrModal,
          {
            key: 'modal-large',
            ...args,
            isOpen: true,
          },
          React.createElement('div', { key: 'modal-content-large', className: 'cr-modal__body' }, [
            React.createElement(
              'p',
              { key: 'intro', className: 'cr-modal__text' },
              'This is a large modal that can contain more extensive content.'
            ),
            React.createElement('h3', { key: 'section1' }, 'Section One'),
            React.createElement(
              'p',
              { key: 'content1', className: 'cr-modal__text' },
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            ),
            React.createElement('h3', { key: 'section2' }, 'Section Two'),
            React.createElement(
              'p',
              { key: 'content2', className: 'cr-modal__text' },
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            ),
            React.createElement('h3', { key: 'section3' }, 'Section Three'),
            React.createElement(
              'p',
              { key: 'content3', className: 'cr-modal__text' },
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            ),
            React.createElement(
              'div',
              {
                key: 'actions',
                className: 'cr-modal__actions',
              },
              React.createElement(
                CrButton,
                {
                  key: 'close',
                  variant: 'solid',
                  color: 'primary',
                },
                'Done'
              )
            ),
          ])
        ),
      ]
    )
  },
}

export const NoCloseButton = {
  args: {
    title: 'System Message',
    showDjInfo: false,
    showCloseButton: false,
    scrimOpacity: 0.6,
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          height: '100vh',
          position: 'relative',
          background: 'var(--cr-background)',
        },
      },
      [
        // Background content
        React.createElement(
          'div',
          {
            key: 'bg-content-noclose',
            style: {
              padding: 'var(--cr-space-4)',
              height: '100vh',
            },
          },
          [
            React.createElement('h1', { key: 'title' }, 'System Page'),
            React.createElement(
              'p',
              { key: 'desc' },
              'Important system message modal without close button.'
            ),
          ]
        ),
        // Modal overlay
        React.createElement(
          CrModal,
          {
            key: 'modal-noclose',
            ...args,
            isOpen: true,
          },
          React.createElement('div', { key: 'modal-content-noclose', className: 'cr-modal__body' }, [
            React.createElement(
              'div',
              {
                key: 'icon',
                className: 'cr-modal__icon',
              },
              React.createElement(PiMusicNotes, {
                style: { color: 'var(--cr-primary-500)' },
              })
            ),
            React.createElement(
              'p',
              {
                key: 'message',
                className: 'cr-modal__text cr-modal__text--center',
              },
              'This modal has no close button in the header. Users must use the action buttons to proceed.'
            ),
            React.createElement(
              'div',
              {
                key: 'actions',
                className: 'cr-modal__actions cr-modal__actions--space-between cr-modal__actions--gap',
              },
              [
                React.createElement(
                  CrButton,
                  {
                    key: 'later',
                    variant: 'outline',
                    color: 'default',
                  },
                  'Maybe Later'
                ),
                React.createElement(
                  CrButton,
                  {
                    key: 'continue',
                    variant: 'solid',
                    color: 'primary',
                  },
                  'Continue'
                ),
              ]
            ),
          ])
        ),
      ]
    )
  },
}
