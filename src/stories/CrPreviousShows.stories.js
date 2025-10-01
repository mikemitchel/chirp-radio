// CrPreviousShows.stories.js
import React from 'react';
import CrPreviousShows from './CrPreviousShows';

export default {
  title: 'Molecules/CrPreviousShows',
  component: CrPreviousShows,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays the previous shows from a DJ with functional audio players. Each player supports play, pause, and scrubbing through the recording.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    shows: {
      control: 'object',
      description: 'Array of show objects with title, date, and audioUrl'
    }
  }
};

export const Default = {
  render: (args) => React.createElement(CrPreviousShows, args),
  args: {}
};

export const CustomShows = {
  render: (args) => React.createElement(CrPreviousShows, args),
  args: {
    shows: [
      {
        id: '1',
        title: 'Sunday Morning Jazz',
        date: 'March 20, 2025',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      },
      {
        id: '2',
        title: 'Friday Night Rock',
        date: 'March 18, 2025',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
      }
    ]
  }
};

export const SingleShow = {
  render: (args) => React.createElement(CrPreviousShows, args),
  args: {
    shows: [
      {
        id: '1',
        title: 'Wednesday Afternoon Mix',
        date: 'March 22, 2025',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
      }
    ]
  }
};
