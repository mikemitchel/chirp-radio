// CrCardDetails.stories.tsx
import React from 'react';
import CrCardDetails from './CrCardDetails';

export default {
  title: 'Molecules/CrCardDetails',
  component: CrCardDetails,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from CrChip atoms for categories and age restrictions. Event and article metadata component displaying date, venue, age restrictions, and category tags. Supports both desktop horizontal and mobile stacked layouts. Used within larger card components. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['event', 'article'],
      description: 'Content type - determines which elements are shown'
    },
    device: {
      control: 'select',
      options: ['desktop', 'mobile'],
      description: 'Device layout - desktop (horizontal) or mobile (stacked)'
    },
    dateTime: {
      control: 'text',
      description: 'Event date and time display (shown for event type)'
    },
    venue: {
      control: 'text',
      description: 'Venue name - clickable text with map icon (shown for event type)'
    },
    ageRestriction: {
      control: 'text',
      description: 'Age restriction text for the chip (shown for event type)'
    },
    authorBy: {
      control: 'text',
      description: 'Author information (shown for article type)'
    },
    eventDate: {
      control: 'text',
      description: 'Event date for article type'
    },
    tags: {
      control: 'object',
      description: 'Array of tag strings for chips (shown for article type)'
    }
  },
  tags: ['autodocs']
};

// Event type - desktop
export const EventDesktop = {
  args: {
    dateTime: 'September 30, 2025 @ 10:00pm',
    venue: 'Lincoln Hall',
    ageRestriction: '21+',
    device: 'desktop',
    type: 'event'
  }
};

// Event type - mobile
export const EventMobile = {
  args: {
    dateTime: 'September 30, 2025 @ 10:00pm',
    venue: 'Lincoln Hall',
    ageRestriction: '21+',
    device: 'mobile',
    type: 'event'
  }
};

// Article type - desktop
export const ArticleDesktop = {
  args: {
    authorBy: 'by Sally Forth',
    eventDate: 'September 30, 2025',
    tags: ['Hello World', 'Hello World', 'Hello World'],
    device: 'desktop',
    type: 'article'
  }
};

// Article type - mobile
export const ArticleMobile = {
  args: {
    authorBy: 'by Sally Forth',
    eventDate: 'September 30, 2025',
    tags: ['Hello World', 'Hello World', 'Hello World'],
    device: 'mobile',
    type: 'article'
  }
};

// All Ages event
export const AllAgesEvent = {
  args: {
    dateTime: 'October 15, 2025 @ 7:00pm',
    venue: 'Metro Chicago',
    ageRestriction: 'All Ages',
    device: 'desktop',
    type: 'event'
  }
};

// Article with many tags
export const ArticleWithManyTags = {
  args: {
    authorBy: 'by Festival Director',
    eventDate: 'March 5, 2026',
    tags: ['Festival', 'Multi-Genre', 'Local Artists', 'Community', 'Live Music', 'Food Trucks'],
    device: 'desktop',
    type: 'article'
  }
};

// Event with no age restriction
export const EventNoAge = {
  args: {
    dateTime: 'December 1, 2025 @ 6:00pm',
    venue: 'Chicago Cultural Center',
    ageRestriction: '',
    device: 'desktop',
    type: 'event'
  }
};

// Article with single tag
export const ArticleSingleTag = {
  args: {
    authorBy: 'by Booking Team',
    eventDate: 'February 14, 2026',
    tags: ['Special Event'],
    device: 'desktop',
    type: 'article'
  }
};

// Comparison of all variations
export const AllVariations = {
  render: (args) => {
    return React.createElement('div', { 
      style: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--cr-space-xl)' 
      } 
    }, [
      React.createElement('div', { key: 'event-desktop-section' }, [
        React.createElement('h3', { 
          key: 'event-desktop-title', 
          style: { margin: 0, marginBottom: 'var(--cr-space-2)' } 
        }, 'Event - Desktop'),
        React.createElement(CrCardDetails, {
          key: 'event-desktop',
          dateTime: 'September 30, 2025 @ 10:00pm',
          venue: 'Lincoln Hall',
          ageRestriction: '21+',
          device: 'desktop',
          type: 'event'
        })
      ]),
      
      React.createElement('div', { key: 'event-mobile-section' }, [
        React.createElement('h3', { 
          key: 'event-mobile-title', 
          style: { margin: 0, marginBottom: 'var(--cr-space-2)' } 
        }, 'Event - Mobile'),
        React.createElement(CrCardDetails, {
          key: 'event-mobile',
          dateTime: 'September 30, 2025 @ 10:00pm',
          venue: 'Lincoln Hall',
          ageRestriction: '21+',
          device: 'mobile',
          type: 'event'
        })
      ]),
      
      React.createElement('div', { key: 'article-desktop-section' }, [
        React.createElement('h3', { 
          key: 'article-desktop-title', 
          style: { margin: 0, marginBottom: 'var(--cr-space-2)' } 
        }, 'Article - Desktop'),
        React.createElement(CrCardDetails, {
          key: 'article-desktop',
          authorBy: 'by Sally Forth',
          eventDate: 'September 30, 2025',
          tags: ['Hello World', 'Hello World', 'Hello World'],
          device: 'desktop',
          type: 'article'
        })
      ]),
      
      React.createElement('div', { key: 'article-mobile-section' }, [
        React.createElement('h3', { 
          key: 'article-mobile-title', 
          style: { margin: 0, marginBottom: 'var(--cr-space-2)' } 
        }, 'Article - Mobile'),
        React.createElement(CrCardDetails, {
          key: 'article-mobile',
          authorBy: 'by Sally Forth',
          eventDate: 'September 30, 2025',
          tags: ['Hello World', 'Hello World', 'Hello World'],
          device: 'mobile',
          type: 'article'
        })
      ])
    ]);
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all device and type variations showing how content changes based on the type toggle.'
      }
    }
  }
};