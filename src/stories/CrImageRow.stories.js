// CrImageRow.stories.js
import React from 'react';
import CrImageRow from './CrImageRow';

export default {
  title: 'Atoms/CrImageRow',
  component: CrImageRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays 2-5 images side by side with 24px gap. Each image has 1:1 aspect ratio with min-width 220px and max-width 360px.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of image objects with src and alt properties (2-5 images)'
    }
  }
};

export const Default = {
  render: (args) => React.createElement(CrImageRow, args),
  args: {}
};

export const TwoImages = {
  render: (args) => React.createElement(CrImageRow, args),
  args: {
    images: [
      { src: 'https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Concert crowd' },
      { src: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'DJ equipment' }
    ]
  }
};

export const ThreeImages = {
  render: (args) => React.createElement(CrImageRow, args),
  args: {
    images: [
      { src: 'https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Concert crowd' },
      { src: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'DJ equipment' },
      { src: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Microphone' }
    ]
  }
};

export const FourImages = {
  render: (args) => React.createElement(CrImageRow, args),
  args: {
    images: [
      { src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Mountain landscape' },
      { src: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Forest path' },
      { src: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Ocean waves' },
      { src: 'https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Desert sunset' }
    ]
  }
};

export const FiveImages = {
  render: (args) => React.createElement(CrImageRow, args),
  args: {
    images: [
      { src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Image 1' },
      { src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Image 2' },
      { src: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Image 3' },
      { src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Image 4' },
      { src: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Image 5' }
    ]
  }
};
