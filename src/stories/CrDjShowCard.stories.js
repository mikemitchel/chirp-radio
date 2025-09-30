// CrDjShowCard.stories.tsx
import React from 'react';
import CrDjShowCard from './CrDjShowCard';

export default {
  title: 'Molecules/CrDjShowCard',
  component: CrDjShowCard,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from CrButton atom, text elements, and optional "On-Air" chip indicator. DJ show information card displaying show title, DJ name, and time slot details. Used in schedule grids and show listings. Handles various show states and highlighting. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    show: {
      control: 'object',
      description: 'Show data object'
    },
    startTime: {
      control: 'text',
      description: 'Formatted start time'
    },
    endTime: {
      control: 'text',
      description: 'Formatted end time'
    },
    headshot: {
      control: 'text',
      description: 'URL for DJ headshot image'
    },
    isCurrentShow: {
      control: 'boolean',
      description: 'Whether this is currently on air'
    },
    isHighlighted: {
      control: 'boolean',
      description: 'Whether this show is highlighted from search'
    },
    onClick: { action: 'clicked' }
  },
  tags: ['autodocs']
};

const mockShow = {
  slug: 'morning-show',
  dj: ['Sarah Johnson'],
  title: 'Morning Classics'
};

export const Default = {
  args: {
    show: mockShow,
    startTime: '6am',
    endTime: '9am',
    headshot: 'https://randomuser.me/api/portraits/women/45.jpg',
    isCurrentShow: false,
    isHighlighted: false
  },
  render: (args) => React.createElement('div', { 
    style: { maxWidth: '350px' } 
  }, React.createElement(CrDjShowCard, args))
};

export const OnAir = {
  args: {
    show: mockShow,
    startTime: '6am',
    endTime: '9am',
    headshot: 'https://randomuser.me/api/portraits/women/45.jpg',
    isCurrentShow: true,
    isHighlighted: false
  },
  render: (args) => React.createElement('div', { 
    style: { maxWidth: '350px' } 
  }, React.createElement(CrDjShowCard, args))
};

export const Highlighted = {
  args: {
    show: mockShow,
    startTime: '6am',
    endTime: '9am',
    headshot: 'https://randomuser.me/api/portraits/women/45.jpg',
    isCurrentShow: false,
    isHighlighted: true
  },
  render: (args) => React.createElement('div', { 
    style: { maxWidth: '350px' } 
  }, React.createElement(CrDjShowCard, args))
};

export const NoShowTitle = {
  args: {
    show: {
      slug: 'dj-mike',
      dj: ['Mike Chen'],
      title: null
    },
    startTime: '12pm',
    endTime: '2pm',
    headshot: 'https://randomuser.me/api/portraits/men/32.jpg',
    isCurrentShow: false,
    isHighlighted: false
  },
  render: (args) => React.createElement('div', { 
    style: { maxWidth: '350px' } 
  }, React.createElement(CrDjShowCard, args))
};

export const CHIRPAutomation = {
  args: {
    show: {
      slug: 'chirp-auto',
      dj: ['CHIRP'],
      title: null
    },
    startTime: '2am',
    endTime: '6am',
    headshot: 'https://assets.codepen.io/715673/album-art.jpg',
    isCurrentShow: false,
    isHighlighted: false
  },
  render: (args) => React.createElement('div', { 
    style: { maxWidth: '350px' } 
  }, React.createElement(CrDjShowCard, args)),
  parameters: {
    docs: {
      description: {
        story: 'CHIRP automation shows display differently without DJ details button.'
      }
    }
  }
};

export const MultipleDJs = {
  args: {
    show: {
      slug: 'weekend-duo',
      dj: ['Alex Rivera', 'Taylor Kim'],
      title: 'Weekend Mix'
    },
    startTime: '8pm',
    endTime: '11pm',
    headshot: 'https://randomuser.me/api/portraits/women/68.jpg',
    isCurrentShow: false,
    isHighlighted: false
  },
  render: (args) => React.createElement('div', { 
    style: { maxWidth: '350px' } 
  }, React.createElement(CrDjShowCard, args))
};

export const AllStates = {
  render: () => React.createElement('div', { 
    style: { 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 'var(--cr-space-4)',
      maxWidth: '400px'
    }
  }, [
    React.createElement('div', { key: 'default' }, [
      React.createElement('h4', { 
        key: 'title1',
        style: { marginBottom: 'var(--cr-space-2)' } 
      }, 'Default'),
      React.createElement(CrDjShowCard, {
        key: 'card1',
        show: { slug: 'show-1', dj: ['DJ One'], title: 'Morning Show' },
        startTime: '6am',
        endTime: '9am',
        headshot: 'https://randomuser.me/api/portraits/women/45.jpg'
      })
    ]),
    React.createElement('div', { key: 'onair' }, [
      React.createElement('h4', { 
        key: 'title2',
        style: { marginBottom: 'var(--cr-space-2)' } 
      }, 'On Air'),
      React.createElement(CrDjShowCard, {
        key: 'card2',
        show: { slug: 'show-2', dj: ['DJ Two'], title: 'Current Show' },
        startTime: '9am',
        endTime: '12pm',
        headshot: 'https://randomuser.me/api/portraits/men/32.jpg',
        isCurrentShow: true
      })
    ]),
    React.createElement('div', { key: 'highlighted' }, [
      React.createElement('h4', { 
        key: 'title3',
        style: { marginBottom: 'var(--cr-space-2)' } 
      }, 'Highlighted'),
      React.createElement(CrDjShowCard, {
        key: 'card3',
        show: { slug: 'show-3', dj: ['DJ Three'], title: 'Afternoon Mix' },
        startTime: '12pm',
        endTime: '3pm',
        headshot: 'https://randomuser.me/api/portraits/women/68.jpg',
        isHighlighted: true
      })
    ]),
    React.createElement('div', { key: 'chirp' }, [
      React.createElement('h4', { 
        key: 'title4',
        style: { marginBottom: 'var(--cr-space-2)' } 
      }, 'CHIRP Automation'),
      React.createElement(CrDjShowCard, {
        key: 'card4',
        show: { slug: 'chirp', dj: ['CHIRP'], title: null },
        startTime: '2am',
        endTime: '6am',
        headshot: 'https://assets.codepen.io/715673/album-art.jpg'
      })
    ])
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all show card states and variations.'
      }
    }
  }
};