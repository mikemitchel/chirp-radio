// CrScrim.stories.tsx
import React, { useState } from 'react'
import CrScrim from './CrScrim'
import CrButton from './CrButton'
import CrModal from './CrModal'

export default {
  title: 'Atoms/CrScrim',
  component: CrScrim,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Backdrop overlay component that creates a semi-transparent layer over content. Used as the foundation for modals, sidebars, and other overlay UI elements. Supports customizable opacity, z-index positioning, centering, and padding. Provides consistent backdrop behavior with proper click handling and accessibility support. Dark mode automatically adjusts opacity for optimal contrast through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: 'Controls scrim visibility',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Background opacity (0-1)',
    },
    zIndex: {
      control: { type: 'number' },
      description: 'CSS z-index value',
    },
    center: {
      control: 'boolean',
      description: 'Center content using flexbox',
    },
    padding: {
      control: 'boolean',
      description: 'Add padding around content',
    },
    animationDuration: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
      description: 'Fade-in animation duration in seconds',
    },
  },
}

export const Default = {
  args: {
    isVisible: true,
    opacity: 0.5,
    zIndex: 1000,
    center: true,
    padding: true,
    animationDuration: 0.2,
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
        React.createElement(
          'div',
          {
            key: 'content',
            style: {
              padding: 'var(--cr-space-4)',
              height: '100vh',
            },
          },
          [
            React.createElement('h1', { key: 'main-title' }, 'Main Content'),
            React.createElement(
              'p',
              { key: 'main-desc' },
              'This content is behind the scrim overlay.'
            ),
            React.createElement(
              'p',
              { key: 'main-desc2' },
              'Adjust the controls to see how the scrim behaves.'
            ),
          ]
        ),
        React.createElement(
          CrScrim,
          {
            key: 'main-scrim',
            ...args,
          },
          React.createElement(
            'div',
            {
              style: {
                background: 'var(--cr-paper)',
                padding: 'var(--cr-space-6)',
                borderRadius: 'var(--cr-space-2)',
                maxWidth: '400px',
                textAlign: 'center',
              },
            },
            [
              React.createElement('h2', { key: 'overlay-title' }, 'Overlay Content'),
              React.createElement(
                'p',
                { key: 'overlay-desc' },
                'This content appears over the scrim.'
              ),
            ]
          )
        ),
      ]
    )
  },
}

export const Interactive = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false)

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
        React.createElement(
          'div',
          {
            key: 'interactive-content',
            style: {
              padding: 'var(--cr-space-4)',
              height: '100vh',
            },
          },
          [
            React.createElement('h1', { key: 'interactive-title' }, 'Interactive Scrim Demo'),
            React.createElement(
              'p',
              { key: 'interactive-desc' },
              'Click the button to show/hide the scrim overlay.'
            ),
            React.createElement(
              CrButton,
              {
                key: 'interactive-button',
                variant: 'solid',
                color: 'primary',
                onClick: () => setIsVisible(!isVisible),
              },
              isVisible ? 'Hide Scrim' : 'Show Scrim'
            ),
          ]
        ),
        React.createElement(
          CrScrim,
          {
            key: 'interactive-scrim',
            isVisible: isVisible,
            onClick: () => setIsVisible(false),
          },
          React.createElement(
            'div',
            {
              style: {
                background: 'var(--cr-paper)',
                padding: 'var(--cr-space-6)',
                borderRadius: 'var(--cr-space-2)',
                maxWidth: '400px',
                textAlign: 'center',
                border: '1px solid var(--cr-default-300)',
              },
              onClick: (e) => e.stopPropagation(),
            },
            [
              React.createElement(
                'h2',
                { key: 'interactive-overlay-title' },
                'Click Outside to Close'
              ),
              React.createElement(
                'p',
                { key: 'interactive-overlay-desc' },
                'This demonstrates click-to-close behavior.'
              ),
              React.createElement(
                CrButton,
                {
                  key: 'interactive-close-btn',
                  variant: 'outline',
                  color: 'default',
                  onClick: () => setIsVisible(false),
                },
                'Close'
              ),
            ]
          )
        ),
      ]
    )
  },
}

export const WithModal = {
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return React.createElement(
      'div',
      {
        style: {
          padding: 'var(--cr-space-4)',
          background: 'var(--cr-background)',
          minHeight: '500px',
        },
      },
      [
        React.createElement('h1', { key: 'modal-demo-title' }, 'Scrim with Modal'),
        React.createElement(
          'p',
          { key: 'modal-demo-desc' },
          'This shows how CrScrim works with CrModal.'
        ),
        React.createElement(
          CrButton,
          {
            key: 'modal-open-btn',
            variant: 'solid',
            color: 'primary',
            onClick: () => setIsModalOpen(true),
          },
          'Open Modal'
        ),
        React.createElement(
          CrModal,
          {
            key: 'demo-modal',
            isOpen: isModalOpen,
            onClose: () => setIsModalOpen(false),
            title: 'Modal with Custom Scrim',
          },
          [
            React.createElement(
              'p',
              { key: 'modal-content-p1' },
              'This modal uses CrScrim internally for its backdrop.'
            ),
            React.createElement(
              'p',
              { key: 'modal-content-p2' },
              'Notice how the scrim opacity and behavior work together.'
            ),
          ]
        ),
      ]
    )
  },
}
