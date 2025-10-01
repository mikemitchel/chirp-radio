// CrSongRequestForm.stories.js
import React from 'react';
import CrSongRequestForm from './CrSongRequestForm';

export default {
  title: 'Molecules/CrSongRequestForm',
  component: CrSongRequestForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Song request form for mobile app or web modal. Includes Artist and Song Title (required) and optional Message to DJ with character limit and moderation considerations.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Form title'
    },
    bodyContent: {
      control: 'text',
      description: 'Explanatory text below title'
    },
    maxMessageLength: {
      control: 'number',
      description: 'Maximum character length for message field'
    },
    onCancel: {
      action: 'cancelled'
    },
    onSubmit: {
      action: 'submitted'
    }
  }
};

export const Default = {
  render: (args) => React.createElement(CrSongRequestForm, args),
  args: {}
};

export const CustomTitle = {
  render: (args) => React.createElement(CrSongRequestForm, args),
  args: {
    title: 'Request Your Favorite Song',
    bodyContent: 'Share your favorite track with our DJ and make their day!'
  }
};

export const ShortMessageLimit = {
  render: (args) => React.createElement(CrSongRequestForm, args),
  args: {
    maxMessageLength: 100
  }
};

export const WithHandlers = {
  render: (args) => React.createElement(CrSongRequestForm, {
    ...args,
    onCancel: () => console.log('Form cancelled'),
    onSubmit: (data) => console.log('Form submitted:', data)
  }),
  args: {}
};
