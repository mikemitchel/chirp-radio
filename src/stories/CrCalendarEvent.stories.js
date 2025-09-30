// CrCalendarEvent.stories.tsx
import React from 'react';
import CrCalendarEvent from './CrCalendarEvent';

export default {
  title: 'Organisms/CrCalendarEvent',
  component: CrCalendarEvent,
  parameters: {
    layout: 'fullscreen',
    docs: {
  description: {
    component: 'CrCalendarEvent uses calendar display elements, the CrEventItem molecule, and CrButton atom. This component displays monthly calendar views with event management and date navigation functionality. Shows multiple events per day with expandable views and interaction handlers. Supports different calendar layouts and event filtering. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs']
};

const getCurrentMonthEvents = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[currentMonth];
  
  const monthNum = String(currentMonth + 1).padStart(2, '0');
  
  return [
    {
      name: 'Community Volunteer Day',
      dateTime: `Saturday, ${monthName} 15, ${currentYear} - 10:00am CT`,
      description: 'Volunteer Meetup',
      location: 'CHIRP Studio',
      eventDetails: 'Join fellow volunteers for a community service day. Help us organize the studio and prepare for upcoming events.',
      startDate: `${currentYear}-${monthNum}-15`,
      endDate: `${currentYear}-${monthNum}-15`,
      moreInfoUrl: 'https://example.com/volunteer'
    },
    {
      name: 'Live Music Night',
      dateTime: `Friday - Sunday, ${monthName} 20 - 22, ${currentYear} - 8:00pm CT`,
      description: 'Concert Event',
      location: 'Lincoln Hall',
      eventDetails: 'Experience three nights of incredible live performances featuring local and touring artists.',
      startDate: `${currentYear}-${monthNum}-20`,
      endDate: `${currentYear}-${monthNum}-22`,
      moreInfoUrl: 'https://example.com/music-night'
    },
    {
      name: 'DJ Workshop',
      dateTime: `Sunday, ${monthName} 28, ${currentYear} - 2:00pm CT`,
      description: 'Workshop',
      location: 'CHIRP Studio',
      eventDetails: 'Learn the basics of DJing from experienced professionals in this hands-on workshop.',
      startDate: `${currentYear}-${monthNum}-28`,
      endDate: `${currentYear}-${monthNum}-28`,
      moreInfoUrl: 'https://example.com/dj-workshop'
    }
  ];
};

export const DefaultVariant = {
  args: {
    events: getCurrentMonthEvents()
  }
};

export const NoEvents = {
  args: {
    events: []
  }
};

export const SeptemberExample = {
  args: {
    initialMonth: 8,
    initialYear: 2025,
    events: [
      {
        name: 'Community Volunteer Day',
        dateTime: 'Saturday, September 15, 2025 - 10:00am CT',
        description: 'Volunteer Meetup',
        location: 'CHIRP Studio',
        eventDetails: 'Join fellow volunteers for a community service day. Help us organize the studio and prepare for upcoming events.',
        startDate: '2025-09-15',
        endDate: '2025-09-15',
        moreInfoUrl: 'https://example.com/volunteer'
      },
      {
        name: 'Live Music Night',
        dateTime: 'Friday - Sunday, September 20 - 22, 2025 - 8:00pm CT',
        description: 'Concert Event',
        location: 'Lincoln Hall',
        eventDetails: 'Experience three nights of incredible live performances featuring local and touring artists.',
        startDate: '2025-09-20',
        endDate: '2025-09-22',
        moreInfoUrl: 'https://example.com/music-night'
      },
      {
        name: 'DJ Workshop',
        dateTime: 'Sunday, September 28, 2025 - 2:00pm CT',
        description: 'Workshop',
        location: 'CHIRP Studio',
        eventDetails: 'Learn the basics of DJing from experienced professionals in this hands-on workshop.',
        startDate: '2025-09-28',
        endDate: '2025-09-28',
        moreInfoUrl: 'https://example.com/dj-workshop'
      }
    ]
  }
};

export const ManyEvents = {
  args: {
    initialMonth: 8,
    initialYear: 2025,
    events: [
      {
        name: 'Community Volunteer Day',
        dateTime: 'Monday, September 1, 2025 - 10:00am CT',
        description: 'Volunteer Meetup',
        location: 'CHIRP Studio',
        eventDetails: 'Join us for monthly community service and studio organization.',
        startDate: '2025-09-01',
        endDate: '2025-09-01',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Radio Show Marathon',
        dateTime: 'Wednesday, September 3, 2025 - 2:00pm CT',
        description: 'Special Event',
        location: 'Main Studio',
        eventDetails: '24-hour marathon broadcast featuring your favorite DJs and special guests.',
        startDate: '2025-09-03',
        endDate: '2025-09-03',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'DJ Workshop Series',
        dateTime: 'Friday, September 5, 2025 - 6:00pm CT',
        description: 'Workshop',
        location: 'Training Room',
        eventDetails: 'Part 1 of our comprehensive DJ training series for beginners.',
        startDate: '2025-09-05',
        endDate: '2025-09-05',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Weekend Music Festival',
        dateTime: 'Saturday - Sunday, September 6 - 7, 2025 - All Day',
        description: 'Festival',
        location: 'Outdoor Stage',
        eventDetails: 'Two days of non-stop music featuring over 30 local and regional acts.',
        startDate: '2025-09-06',
        endDate: '2025-09-07',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Membership Drive Kickoff',
        dateTime: 'Tuesday, September 9, 2025 - 9:00am CT',
        description: 'Fundraising',
        location: 'Main Hall',
        eventDetails: 'Launch of our annual membership drive with special perks for early supporters.',
        startDate: '2025-09-09',
        endDate: '2025-09-09',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Live Jazz Night',
        dateTime: 'Thursday, September 11, 2025 - 8:00pm CT',
        description: 'Concert',
        location: 'Jazz Club',
        eventDetails: 'Intimate jazz performance featuring renowned local musicians.',
        startDate: '2025-09-11',
        endDate: '2025-09-11',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Community Town Hall',
        dateTime: 'Saturday, September 13, 2025 - 3:00pm CT',
        description: 'Meeting',
        location: 'Community Center',
        eventDetails: 'Open forum to discuss station updates and community initiatives.',
        startDate: '2025-09-13',
        endDate: '2025-09-13',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Podcast Recording Workshop',
        dateTime: 'Sunday, September 14, 2025 - 1:00pm CT',
        description: 'Workshop',
        location: 'Studio B',
        eventDetails: 'Learn professional podcast production techniques from industry experts.',
        startDate: '2025-09-14',
        endDate: '2025-09-14',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Local Band Showcase',
        dateTime: 'Monday, September 15, 2025 - 7:00pm CT',
        description: 'Concert',
        location: 'Main Stage',
        eventDetails: 'Monthly showcase featuring the best emerging local talent.',
        startDate: '2025-09-15',
        endDate: '2025-09-15',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Board Meeting',
        dateTime: 'Wednesday, September 17, 2025 - 6:00pm CT',
        description: 'Meeting',
        location: 'Conference Room',
        eventDetails: 'Monthly board meeting open to all members and supporters.',
        startDate: '2025-09-17',
        endDate: '2025-09-17'
      },
      {
        name: 'Record Fair',
        dateTime: 'Friday - Sunday, September 19 - 21, 2025 - 10:00am CT',
        description: 'Market Event',
        location: 'Exhibition Hall',
        eventDetails: 'Browse thousands of vinyl records from vendors across the region.',
        startDate: '2025-09-19',
        endDate: '2025-09-21',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Equipment Training',
        dateTime: 'Tuesday, September 23, 2025 - 5:00pm CT',
        description: 'Training',
        location: 'Tech Lab',
        eventDetails: 'Hands-on training for new studio equipment and broadcasting tools.',
        startDate: '2025-09-23',
        endDate: '2025-09-23'
      },
      {
        name: 'Open Mic Night',
        dateTime: 'Thursday, September 25, 2025 - 8:00pm CT',
        description: 'Performance',
        location: 'Cafe Stage',
        eventDetails: 'Share your talent in a supportive, creative environment.',
        startDate: '2025-09-25',
        endDate: '2025-09-25',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Annual Fundraiser Gala',
        dateTime: 'Saturday, September 27, 2025 - 6:00pm CT',
        description: 'Gala Event',
        location: 'Grand Ballroom',
        eventDetails: 'Elegant evening of dining, entertainment, and fundraising for independent radio.',
        startDate: '2025-09-27',
        endDate: '2025-09-27',
        moreInfoUrl: 'https://example.com/event'
      },
      {
        name: 'Studio Tour for Members',
        dateTime: 'Sunday, September 28, 2025 - 2:00pm CT',
        description: 'Tour',
        location: 'Main Studio',
        eventDetails: 'Behind-the-scenes tour of our facilities exclusively for members.',
        startDate: '2025-09-28',
        endDate: '2025-09-28',
        moreInfoUrl: 'https://example.com/event'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with many events showing scrollable event list. Hover over calendar dates to auto-scroll to events.'
      }
    }
  }
};