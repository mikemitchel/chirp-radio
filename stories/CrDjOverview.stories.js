// CrDjOverview.stories.js
import React from 'react';
import CrDjOverview from './CrDjOverview';

export default {
  title: 'Molecules/CrDjOverview',
  component: CrDjOverview,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built using the CrButton atom, image, and text elements. DJ profile display component with multiple size variants (large, medium, small, xsmall). Shows DJ photo, name, show information, and optional action buttons. Supports different roles (DJ, host, guest) and light/dark themes. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'xsmall-1col', 'xsmall-2col', 'schedule']
    },
    role: {
      control: 'select',
      options: ['dj', 'host', 'guest']
    },
    useOn: {
      control: 'select',
      options: ['light', 'dark']
    },
    title: { control: 'text' },
    djName: { control: 'text' },
    content: { control: 'text' },
    description: { control: 'text' },
    showTime: { control: 'text' },
    showTitle: { control: 'text' },
    imageSrc: { control: 'text' },
    isCHIRP: { control: 'boolean' }
  },
  tags: ['autodocs']
};

// Large variant
export const Large = {
  args: {
    size: 'large',
    role: 'dj',
    useOn: 'light',
    title: 'Title',
    djName: 'DJ Reallylong Namerson',
    content: 'This content is 30 characters.',
    description: 'Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
    showTime: 'Monday 12pm - 12pm'
  }
};

// Medium variant
export const Medium = {
  args: {
    size: 'medium',
    role: 'dj',
    useOn: 'light',
    djName: 'DJ Reallylong Namerson',
    content: 'This content is 30 characters.',
    showTime: 'Monday 12pm - 12pm'
  }
};

// Small variant
export const Small = {
  args: {
    size: 'small',
    role: 'dj',
    useOn: 'light',
    djName: 'DJ Reallylong Namerson'
  }
};

// X-Small 1 Column variant
export const XSmall1Col = {
  args: {
    size: 'xsmall-1col',
    role: 'dj',
    useOn: 'light',
    djName: 'DJ Reallylong Namerson',
    content: 'This content is 30 characters.',
    showTime: 'Monday 12pm - 12pm'
  }
};

// X-Small 2 Column variant
export const XSmall2Col = {
  args: {
    size: 'xsmall-2col',
    role: 'dj',
    useOn: 'light',
    djName: 'DJ Reallylong Namerson',
    content: 'This content is 30 characters.',
    showTime: 'Monday 12pm - 12pm'
  }
};

// Schedule variant (like CrDjShowCard)
export const Schedule = {
  args: {
    size: 'schedule',
    role: 'dj',
    useOn: 'light',
    djName: 'DJ Reallylong Namerson',
    showTitle: 'The Best Show Ever',
    showTime: '12pm — 2pm',
    isCHIRP: false
  }
};

// Schedule variant for CHIRP (no DJ Details button)
export const ScheduleCHIRP = {
  args: {
    size: 'schedule',
    role: 'dj',
    useOn: 'light',
    djName: 'CHIRP',
    showTitle: 'CHIRP Radio',
    showTime: '12pm — 2pm',
    isCHIRP: true
  }
};

// All variants showcase
export const AllVariants = {
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--cr-space-8)',
      padding: 'var(--cr-space-6)'
    }
  }, [
    React.createElement('div', { key: 'large-section' }, [
      React.createElement('h3', { key: 'large-title', style: { marginBottom: 'var(--cr-space-4)' } }, 'Large Variant'),
      React.createElement(CrDjOverview, {
        key: 'large',
        size: 'large',
        title: 'Title',
        djName: 'DJ Reallylong Namerson',
        content: 'This content is 30 characters.',
        description: 'Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum.',
        showTime: 'Monday 12pm - 12pm'
      })
    ]),
    React.createElement('div', { key: 'medium-section' }, [
      React.createElement('h3', { key: 'medium-title', style: { marginBottom: 'var(--cr-space-4)' } }, 'Medium Variant'),
      React.createElement(CrDjOverview, {
        key: 'medium',
        size: 'medium',
        djName: 'DJ Reallylong Namerson',
        content: 'This content is 30 characters.',
        showTime: 'Monday 12pm - 12pm'
      })
    ]),
    React.createElement('div', { key: 'small-section' }, [
      React.createElement('h3', { key: 'small-title', style: { marginBottom: 'var(--cr-space-4)' } }, 'Small Variant'),
      React.createElement(CrDjOverview, {
        key: 'small',
        size: 'small',
        djName: 'DJ Reallylong Namerson'
      })
    ]),
    React.createElement('div', { key: 'xsmall1-section' }, [
      React.createElement('h3', { key: 'xsmall1-title', style: { marginBottom: 'var(--cr-space-4)' } }, 'X-Small 1 Column Variant'),
      React.createElement(CrDjOverview, {
        key: 'xsmall1',
        size: 'xsmall-1col',
        djName: 'DJ Reallylong Namerson',
        content: 'This content is 30 characters.',
        showTime: 'Monday 12pm - 12pm'
      })
    ]),
    React.createElement('div', { key: 'xsmall2-section' }, [
      React.createElement('h3', { key: 'xsmall2-title', style: { marginBottom: 'var(--cr-space-4)' } }, 'X-Small 2 Column Variant'),
      React.createElement(CrDjOverview, {
        key: 'xsmall2',
        size: 'xsmall-2col',
        djName: 'DJ Reallylong Namerson',
        content: 'This content is 30 characters.',
        showTime: 'Monday 12pm - 12pm'
      })
    ]),
    React.createElement('div', { key: 'schedule-section' }, [
      React.createElement('h3', { key: 'schedule-title', style: { marginBottom: 'var(--cr-space-4)' } }, 'Schedule Variant'),
      React.createElement(CrDjOverview, {
        key: 'schedule',
        size: 'schedule',
        djName: 'DJ Reallylong Namerson',
        showTitle: 'The Best Show Ever',
        showTime: '12pm — 2pm',
        isCHIRP: false
      })
    ])
  ])
};