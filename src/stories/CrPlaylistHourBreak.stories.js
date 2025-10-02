// CrPlaylistHourBreak.stories.tsx
import React from 'react'
import CrPlaylistHourBreak from './CrPlaylistHourBreak'

export default {
  title: 'Molecules/CrPlaylistHourBreak',
  component: CrPlaylistHourBreak,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built from CrCurrentDj molecule and text elements. Hour separator component for playlist views showing time stamps and visual breaks between hourly segments. Helps organize long playlist displays chronologically. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    startTime: {
      control: 'text',
      description: 'Start time (e.g., "1:00pm")',
    },
    endTime: {
      control: 'text',
      description: 'End time (e.g., "2:00pm")',
    },
    djName: {
      control: 'text',
      description: 'DJ name',
    },
    djProfileUrl: {
      control: 'text',
      description: 'URL to DJ profile page',
    },
    showName: {
      control: 'text',
      description: 'Show name (optional)',
    },
    isCollapsed: {
      control: 'boolean',
      description: 'Whether the section is collapsed (chevron points left)',
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    startTime: '1:00pm',
    endTime: '2:00pm',
    djName: 'DJ Current',
    djProfileUrl: '#',
    showName: 'The Current Show',
    isCollapsed: false,
  },
}

export const Collapsed = {
  args: {
    startTime: '1:00pm',
    endTime: '2:00pm',
    djName: 'DJ Current',
    djProfileUrl: '#',
    showName: 'The Current Show',
    isCollapsed: true,
  },
}

export const WithoutShowName = {
  args: {
    startTime: '3:00pm',
    endTime: '4:00pm',
    djName: 'DJ Midnight',
    djProfileUrl: '#',
    showName: '',
    isCollapsed: false,
  },
}

export const MorningSlot = {
  args: {
    startTime: '9:00am',
    endTime: '10:00am',
    djName: 'DJ Sunrise',
    djProfileUrl: '#',
    showName: 'Morning Vibes',
    isCollapsed: false,
  },
}

export const LateNightSlot = {
  args: {
    startTime: '11:00pm',
    endTime: '12:00am',
    djName: 'DJ Nocturnal',
    djProfileUrl: '#',
    showName: 'After Hours',
    isCollapsed: false,
  },
}

export const InPlaylistContext = {
  render: () => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '900px',
          backgroundColor: 'var(--cr-paper)',
          padding: 'var(--cr-space-4)',
          borderRadius: 'var(--cr-space-2)',
          border: '1px solid var(--cr-default-300)',
        },
      },
      [
        React.createElement(CrPlaylistHourBreak, {
          key: 'break1',
          startTime: '3:00pm',
          endTime: '4:00pm',
          djName: 'DJ Current',
          djProfileUrl: '#',
          showName: 'The Current Show',
          isCollapsed: false,
        }),
        React.createElement(
          'div',
          {
            key: 'sample-content1',
            style: {
              padding: 'var(--cr-space-3) 0',
              color: 'var(--cr-default-700)',
              font: 'var(--cr-body-sm)',
            },
          },
          'Playlist items would appear here...'
        ),
        React.createElement(CrPlaylistHourBreak, {
          key: 'break2',
          startTime: '2:00pm',
          endTime: '3:00pm',
          djName: 'DJ Afternoon',
          djProfileUrl: '#',
          showName: 'Afternoon Mix',
          isCollapsed: true,
        }),
        React.createElement(
          'div',
          {
            key: 'sample-content2',
            style: {
              padding: 'var(--cr-space-3) 0',
              color: 'var(--cr-default-700)',
              font: 'var(--cr-body-sm)',
            },
          },
          'More playlist items...'
        ),
        React.createElement(CrPlaylistHourBreak, {
          key: 'break3',
          startTime: '1:00pm',
          endTime: '2:00pm',
          djName: 'DJ Midday',
          djProfileUrl: '#',
          showName: '',
          isCollapsed: false,
        }),
      ]
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hour breaks shown in the context of a playlist, demonstrating how they separate different DJ time slots with collapsed and expanded states.',
      },
    },
  },
}

export const Mobile = {
  args: {
    startTime: '1:00pm',
    endTime: '2:00pm',
    djName: 'DJ Current',
    djProfileUrl: '#',
    showName: 'The Current Show',
    isCollapsed: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
