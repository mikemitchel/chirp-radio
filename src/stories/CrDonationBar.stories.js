// CrDonationBar.stories.tsx
import React from 'react'
import CrDonationBar from './CrDonationBar'

export default {
  title: 'Atoms/CrDonationBar',
  component: CrDonationBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive, animated donation progress bar that shows current amount raised versus target goal. The progress bar animates on first load/visibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentAmount: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Current amount raised in dollars',
    },
    targetAmount: {
      control: { type: 'number', min: 1, step: 1000 },
      description: 'Target fundraising goal in dollars',
    },
    onDonateClick: {
      action: 'donate clicked',
      description: 'Function called when donation bar is clicked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

// Default story
export const Default = {
  args: {
    currentAmount: 7271,
    targetAmount: 48000,
  },
  render: (args) =>
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--cr-background)',
          padding: 'var(--cr-space-4)',
          minHeight: '200px',
        },
      },
      [
        React.createElement(
          'h3',
          {
            key: 'title',
            style: {
              marginBottom: 'var(--cr-space-4)',
              color: 'var(--cr-foreground)',
            },
          },
          'Donation Progress'
        ),
        React.createElement(CrDonationBar, {
          key: 'bar',
          ...args,
        }),
      ]
    ),
}

// Interactive version with click handler
export const Interactive = {
  args: {
    currentAmount: 7271,
    targetAmount: 48000,
  },
  render: (args) =>
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--cr-background)',
          padding: 'var(--cr-space-4)',
          minHeight: '200px',
        },
      },
      [
        React.createElement(
          'h3',
          {
            key: 'title',
            style: {
              marginBottom: 'var(--cr-space-4)',
              color: 'var(--cr-foreground)',
            },
          },
          'Click to Donate'
        ),
        React.createElement(CrDonationBar, {
          key: 'bar',
          ...args,
          onDonateClick: () => alert('Opening donation page...'),
        }),
      ]
    ),
}

// Low progress example
export const LowProgress = {
  args: {
    currentAmount: 1250,
    targetAmount: 48000,
  },
  render: (args) =>
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--cr-background)',
          padding: 'var(--cr-space-4)',
          minHeight: '200px',
        },
      },
      [
        React.createElement(
          'h3',
          {
            key: 'title',
            style: {
              marginBottom: 'var(--cr-space-4)',
              color: 'var(--cr-foreground)',
            },
          },
          'Early Fundraising'
        ),
        React.createElement(CrDonationBar, {
          key: 'bar',
          ...args,
        }),
      ]
    ),
}

// High progress example
export const HighProgress = {
  args: {
    currentAmount: 42800,
    targetAmount: 48000,
  },
  render: (args) =>
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--cr-background)',
          padding: 'var(--cr-space-4)',
          minHeight: '200px',
        },
      },
      [
        React.createElement(
          'h3',
          {
            key: 'title',
            style: {
              marginBottom: 'var(--cr-space-4)',
              color: 'var(--cr-foreground)',
            },
          },
          'Almost There!'
        ),
        React.createElement(CrDonationBar, {
          key: 'bar',
          ...args,
        }),
      ]
    ),
}

// Goal exceeded
export const GoalExceeded = {
  args: {
    currentAmount: 52000,
    targetAmount: 48000,
  },
  render: (args) =>
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--cr-background)',
          padding: 'var(--cr-space-4)',
          minHeight: '200px',
        },
      },
      [
        React.createElement(
          'h3',
          {
            key: 'title',
            style: {
              marginBottom: 'var(--cr-space-4)',
              color: 'var(--cr-foreground)',
            },
          },
          'Goal Exceeded! 🎉'
        ),
        React.createElement(CrDonationBar, {
          key: 'bar',
          ...args,
        }),
      ]
    ),
}

// Multiple bars to show re-animation behavior
export const MultipleBars = {
  render: () =>
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--cr-background)',
          padding: 'var(--cr-space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--cr-space-6)',
        },
      },
      [
        React.createElement('div', { key: 'section1' }, [
          React.createElement(
            'h4',
            {
              key: 'title1',
              style: {
                marginBottom: 'var(--cr-space-3)',
                color: 'var(--cr-foreground)',
              },
            },
            'Spring Campaign'
          ),
          React.createElement(CrDonationBar, {
            key: 'bar1',
            currentAmount: 7271,
            targetAmount: 48000,
            onDonateClick: () => alert('Spring campaign donation!'),
          }),
        ]),
        React.createElement('div', { key: 'section2' }, [
          React.createElement(
            'h4',
            {
              key: 'title2',
              style: {
                marginBottom: 'var(--cr-space-3)',
                color: 'var(--cr-foreground)',
              },
            },
            'Equipment Fund'
          ),
          React.createElement(CrDonationBar, {
            key: 'bar2',
            currentAmount: 15600,
            targetAmount: 25000,
            onDonateClick: () => alert('Equipment fund donation!'),
          }),
        ]),
        React.createElement('div', { key: 'section3' }, [
          React.createElement(
            'h4',
            {
              key: 'title3',
              style: {
                marginBottom: 'var(--cr-space-3)',
                color: 'var(--cr-foreground)',
              },
            },
            'Operating Expenses'
          ),
          React.createElement(CrDonationBar, {
            key: 'bar3',
            currentAmount: 8900,
            targetAmount: 12000,
            onDonateClick: () => alert('Operating expenses donation!'),
          }),
        ]),
      ]
    ),
}
