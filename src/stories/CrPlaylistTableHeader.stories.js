// CrPlaylistTableHeader.stories.tsx
import React from 'react';
import CrPlaylistTableHeader from './CrPlaylistTableHeader';

export default {
  title: 'Atoms/CrPlaylistTableHeader',
  component: CrPlaylistTableHeader,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from text header elements. Table header component for playlist views with column labels for artwork, track info, time played, and actions. Provides consistent labeling for tabular playlist displays. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs']
};

export const Default = {
  args: {},
  render: () => {
    return React.createElement('div', {
      style: {
        maxWidth: '900px',
        backgroundColor: 'var(--cr-paper)',
        padding: 'var(--cr-space-4)',
        borderRadius: 'var(--cr-space-2)',
        border: '1px solid var(--cr-default-300)'
      }
    }, React.createElement(CrPlaylistTableHeader));
  }
};