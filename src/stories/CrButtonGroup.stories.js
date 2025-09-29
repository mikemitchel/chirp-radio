// CrButtonGroup.stories.js
import React from 'react';
import CrButtonGroup from './CrButtonGroup';

export default {
  title: 'Atoms/CrButtonGroup',
  component: CrButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual tab button for the DJ Schedule component. Shows day of week with responsive labels. Used within CrDjSchedule organism for day navigation.'
      }
    }
  },
  argTypes: {
    day: {
      control: 'text',
      description: 'Day of the week'
    },
    isActive: {
      control: 'boolean',
      description: 'Whether this tab is currently active'
    },
    isToday: {
      control: 'boolean',
      description: 'Whether this tab represents today'
    },
    onClick: { action: 'clicked' }
  },
  tags: ['autodocs']
};

export const Default = {
  args: {
    day: 'Monday',
    isActive: false,
    isToday: false
  },
  render: (args) => React.createElement('div', { 
    style: { width: '120px' } 
  }, React.createElement(CrButtonGroup, args))
};

export const Active = {
  args: {
    day: 'Tuesday',
    isActive: true,
    isToday: false
  },
  render: (args) => React.createElement('div', { 
    style: { width: '120px' } 
  }, React.createElement(CrButtonGroup, args))
};

export const Today = {
  args: {
    day: 'Wednesday',
    isActive: false,
    isToday: true
  },
  render: (args) => React.createElement('div', { 
    style: { width: '120px' } 
  }, React.createElement(CrButtonGroup, args))
};

export const TodayAndActive = {
  args: {
    day: 'Thursday',
    isActive: true,
    isToday: true
  },
  render: (args) => React.createElement('div', { 
    style: { width: '120px' } 
  }, React.createElement(CrButtonGroup, args))
};

export const AllTabs = {
  render: () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [activeDay, setActiveDay] = React.useState('Wednesday');
    const currentDay = 'Wednesday';

    return React.createElement('div', { 
      style: { 
        display: 'flex', 
        gap: 'var(--cr-space-2)', 
        width: '100%',
        maxWidth: '800px'
      }
    }, days.map(day => 
      React.createElement(CrButtonGroup, {
        key: day,
        day: day,
        isActive: day === activeDay,
        isToday: day === currentDay,
        onClick: () => setActiveDay(day)
      })
    ));
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing all days with Wednesday as "today" and clickable tabs.'
      }
    }
  }
};