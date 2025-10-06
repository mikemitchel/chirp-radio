// CrEventItem.stories.tsx
import React from 'react'
import CrEventItem from './CrEventItem'

export default {
  title: 'Molecules/CrEventItem',
  component: CrEventItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built using the CrButton atom. Linear event display component for calendar listings showing event title, time, and brief details in a horizontal layout. Used in schedule views and event timelines. Supports different event types and states. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    eventName: {
      control: 'text',
      description: 'Event title/name - always required',
    },
    dateTime: {
      control: 'text',
      description: 'Date and time of the event',
    },
    description: {
      control: 'text',
      description: 'Event description/type',
    },
    location: {
      control: 'text',
      description: 'Event location',
    },
    eventDetails: {
      control: 'text',
      description: 'Additional event details (2 line max) - shown by default',
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    eventName: 'Community Volunteer Day',
    dateTime: 'Saturday, Month 23, 2025 - 8:00pm CT',
    description: 'Volunteer Meetup',
    location: 'Location Place',
    eventDetails: 'Join us for this exciting community event. More details to be announced soon.',
  },
}

export const WithMoreInfoButton = {
  args: {
    eventName: 'DJ Workshop',
    dateTime: 'Saturday, Month 23, 2025 - 8:00pm CT',
    description: 'Workshop',
    location: 'CHIRP Studio',
    eventDetails:
      'Learn the basics of DJing from experienced professionals. This hands-on workshop covers mixing techniques, equipment setup, and building your first set.',
    onMoreInfoClick: () => alert('More info clicked!'),
  },
}

export const Highlighted = {
  args: {
    eventName: 'Radio Fundraiser',
    dateTime: 'Saturday, Month 23, 2025 - 8:00pm CT',
    description: 'Fundraising Event',
    location: 'CHIRP Studio',
    eventDetails:
      'Support independent radio with special performances, raffles, and exclusive merchandise. All proceeds benefit community programming.',
    isHighlighted: true,
    onMoreInfoClick: () => alert('More info clicked!'),
  },
}

export const LongEventDetails = {
  args: {
    eventName: 'Annual Summer Festival',
    dateTime: 'Saturday, Month 23, 2025 - 8:00pm CT',
    description: 'Festival',
    location: 'Grant Park',
    eventDetails:
      'This is a very long description that should be truncated to exactly two lines. The component will automatically handle the overflow and add ellipsis when the text exceeds the two-line limit. This ensures a clean and consistent layout across all event cards no matter how much detail is provided.',
    onMoreInfoClick: () => alert('More info clicked!'),
  },
}

export const ShortEventDetails = {
  args: {
    eventName: 'Open Mic Night',
    dateTime: 'Saturday, Month 23, 2025 - 8:00pm CT',
    description: 'Performance',
    location: 'Cafe Stage',
    eventDetails: 'Share your talent in a supportive environment.',
    onMoreInfoClick: () => alert('More info clicked!'),
  },
}
