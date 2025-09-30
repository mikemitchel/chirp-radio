// CrList.stories.tsx
import React from 'react';
import CrList from './CrList';

export default {
  title: 'Organisms/CrList',
  component: CrList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A rating card component that combines CrCardBanner with a list of CrListItem components.'
      }
    }
  },
  argTypes: {
    preheader: {
      control: 'text',
      description: 'Preheader text for the banner'
    },
    title: {
      control: 'text',
      description: 'Main title for the banner'
    },
    bannerButtonText: {
      control: 'text',
      description: 'Text for the banner button'
    },
    items: {
      control: 'object',
      description: 'Array of song items to display'
    }
  },
  tags: ['autodocs']
};

const sampleItems = [
  { ranking: 1, songName: 'Song Name', artistName: 'Artist Name', recordCompany: 'Record Co' },
  { ranking: 2, songName: 'Song Name', artistName: 'Artist Name', recordCompany: 'Record Co' },
  { ranking: 3, songName: 'Song Name', artistName: 'Artist Name', recordCompany: 'Record Co' },
  { ranking: 4, songName: 'Song Name', artistName: 'Artist Name', recordCompany: 'Record Co' },
  { ranking: 5, songName: 'Song Name', artistName: 'Artist Name', recordCompany: 'Record Co' }
];

const longSampleItems = Array.from({ length: 50 }, (_, i) => ({
  ranking: i + 1,
  songName: 'Song Name',
  artistName: 'Artist Name',
  recordCompany: 'Record Co'
}));

export const Default = {
  args: {
    preheader: 'Intro Preheader Thing',
    title: 'Title of the Thing',
    bannerButtonText: 'Listen on Bandcamp',
    items: sampleItems
  }
};

export const FullList = {
  args: {
    preheader: 'Top 50 Songs',
    title: 'CHIRP Radio Chart',
    bannerButtonText: 'Listen on Bandcamp',
    items: longSampleItems
  }
};

export const RealContent = {
  args: {
    preheader: 'Weekly Chart',
    title: 'Top Jazz Tracks',
    bannerButtonText: 'Listen on Bandcamp',
    items: [
      { ranking: 1, songName: 'Take Five', artistName: 'Dave Brubeck Quartet', recordCompany: 'Columbia Records' },
      { ranking: 2, songName: 'So What', artistName: 'Miles Davis', recordCompany: 'Columbia Records' },
      { ranking: 3, songName: 'Giant Steps', artistName: 'John Coltrane', recordCompany: 'Atlantic Records' },
      { ranking: 4, songName: 'A Love Supreme', artistName: 'John Coltrane', recordCompany: 'Impulse! Records' },
      { ranking: 5, songName: 'Blue in Green', artistName: 'Miles Davis', recordCompany: 'Columbia Records' }
    ]
  }
};

export const NoItems = {
  args: {
    preheader: 'Empty Chart',
    title: 'No Songs Yet',
    bannerButtonText: 'Listen on Bandcamp',
    items: []
  }
};