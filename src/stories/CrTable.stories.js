// CrTable.stories.js
import React from 'react';
import CrTable from './CrTable';
import CrButton from './CrButton';
import { PiHeart, PiHeartFill, PiEye, PiDownload, PiDownloadSimple, PiExport } from 'react-icons/pi';

export default {
  title: 'Molecules/CrTable',
  component: CrTable,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from CrPageHeader molecule and CrButton atom and table cell elements. Data table component with sorting, loading states, and pagination. This uses page header molecule - consider moving to Organisms category. Supports different size variants and responsive behavior. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'comfortable'],
      description: 'Size variant of the table'
    },
    striped: {
      control: 'boolean',
      description: 'Enable zebra striping for rows',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    bordered: {
      control: 'boolean',
      description: 'Add borders between columns'
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effects on rows'
    },
    sortable: {
      control: 'boolean',
      description: 'Enable sorting functionality'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    empty: {
      control: 'boolean',
      description: 'Show empty state'
    },
    showEyebrow: {
      control: 'boolean',
      description: 'Show eyebrow text in page header'
    },
    showActionButton: {
      control: 'boolean',
      description: 'Show action button in page header'
    },
    eyebrowText: {
      control: 'text',
      description: 'Eyebrow text for page header'
    },
    tableTitle: {
      control: 'text',
      description: 'Table title displayed in page header'
    },
    actionButtonText: {
      control: 'text',
      description: 'Text for action button'
    }
  },
  tags: ['autodocs']
};

// Sample data
const sampleColumns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    width: 'wide'
  },
  {
    key: 'artist',
    title: 'Artist',
    sortable: true,
    width: 'medium'
  },
  {
    key: 'album',
    title: 'Album',
    sortable: true
  },
  {
    key: 'duration',
    title: 'Duration',
    align: 'right',
    width: 'narrow'
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    width: 'narrow'
  }
];

const sampleData = [
  {
    id: '1',
    name: 'So What',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    duration: '9:22',
    actions: ''
  },
  {
    id: '2',
    name: 'Giant Steps',
    artist: 'John Coltrane',
    album: 'Giant Steps',
    duration: '4:43',
    actions: ''
  },
  {
    id: '3',
    name: 'Take Five',
    artist: 'Dave Brubeck',
    album: 'Time Out',
    duration: '5:24',
    actions: ''
  },
  {
    id: '4',
    name: 'Watermelon Man',
    artist: 'Herbie Hancock',
    album: 'Takin\' Off',
    duration: '7:05',
    actions: ''
  },
  {
    id: '5',
    name: 'Acknowledgement',
    artist: 'John Coltrane',
    album: 'A Love Supreme',
    duration: '7:42',
    actions: ''
  }
];

// Columns with custom rendering
const actionColumns = [
  ...sampleColumns.slice(0, -1),
  {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    width: 'narrow',
    render: (value, row) => {
      return React.createElement('div', {
        style: {
          display: 'flex',
          gap: 'var(--cr-space-2)',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, [
        React.createElement('button', {
          key: 'heart',
          style: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--cr-space-1)',
            borderRadius: 'var(--cr-space-1)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--cr-default-500)',
            transition: 'color 0.2s ease'
          },
          onMouseOver: (e) => { e.target.style.color = 'var(--cr-primary-500)'; },
          onMouseOut: (e) => { e.target.style.color = 'var(--cr-default-500)'; },
          'aria-label': `Add ${row.name} to favorites`
        }, React.createElement(PiHeart, { size: 16 })),
        React.createElement('button', {
          key: 'eye',
          style: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--cr-space-1)',
            borderRadius: 'var(--cr-space-1)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--cr-default-500)',
            transition: 'color 0.2s ease'
          },
          onMouseOver: (e) => { e.target.style.color = 'var(--cr-primary-500)'; },
          onMouseOut: (e) => { e.target.style.color = 'var(--cr-default-500)'; },
          'aria-label': `View ${row.name}`
        }, React.createElement(PiEye, { size: 16 })),
        React.createElement('button', {
          key: 'download',
          style: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--cr-space-1)',
            borderRadius: 'var(--cr-space-1)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--cr-default-500)',
            transition: 'color 0.2s ease'
          },
          onMouseOver: (e) => { e.target.style.color = 'var(--cr-primary-500)'; },
          onMouseOut: (e) => { e.target.style.color = 'var(--cr-default-500)'; },
          'aria-label': `Download ${row.name}`
        }, React.createElement(PiDownload, { size: 16 }))
      ]);
    }
  }
];

// Donation History Table - Default Use Case
const donationColumns = [
  {
    key: 'date',
    title: 'Date',
    sortable: true,
    width: 'medium'
  },
  {
    key: 'type',
    title: 'Type',
    sortable: true,
    width: 'medium'
  },
  {
    key: 'amount',
    title: 'Amount',
    align: 'right',
    sortable: true,
    width: 'medium'
  },
  {
    key: 'receipt',
    title: 'Receipt',
    align: 'center',
    width: 'narrow',
    render: (value, row) => {
      return React.createElement(CrButton, {
        size: 'small',
        variant: 'text',
        color: 'default',
        leftIcon: React.createElement(PiDownloadSimple, { size: 16 }),
        onClick: () => {
          console.log(`Downloading receipt for donation ${row.id}`);
        },
        'aria-label': `Download receipt for ${row.amount} donation on ${row.date}`
      }, 'Receipt');
    }
  }
];

const donationData = [
  {
    id: '1',
    date: '09/15/2024',
    type: 'Sustaining Member',
    amount: '$25.00',
    receipt: ''
  },
  {
    id: '2',
    date: '08/15/2024',
    type: 'Sustaining Member',
    amount: '$25.00',
    receipt: ''
  },
  {
    id: '3',
    date: '07/15/2024',
    type: 'One-Time Donation',
    amount: '$100.00',
    receipt: ''
  },
  {
    id: '4',
    date: '06/15/2024',
    type: 'Sustaining Member',
    amount: '$25.00',
    receipt: ''
  },
  {
    id: '5',
    date: '05/15/2024',
    type: 'Corporate Sponsorship',
    amount: '$500.00',
    receipt: ''
  },
  {
    id: '6',
    date: '04/15/2024',
    type: 'Sustaining Member',
    amount: '$25.00',
    receipt: ''
  },
  {
    id: '7',
    date: '03/15/2024',
    type: 'Event Ticket',
    amount: '$50.00',
    receipt: ''
  },
  {
    id: '8',
    date: '02/15/2024',
    type: 'Sustaining Member',
    amount: '$25.00',
    receipt: ''
  }
];

// Move DonationHistory to be the first/default story
export const DonationHistory = {
  args: {
    columns: donationColumns,
    data: donationData,
    variant: 'default',
    striped: true,
    bordered: false,
    hover: true,
    sortable: true,
    loading: false,
    empty: false,
    initialSortColumn: 'date',
    initialSortDirection: 'desc',
    eyebrowText: 'CHIRP Radio',
    tableTitle: 'Your Donation History',
    showEyebrow: true,
    showActionButton: true,
    actionButtonText: 'Export',
    actionButtonIcon: React.createElement(PiExport),
    onActionClick: () => {
      console.log('Export donations clicked');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Donation history table - the default use case showing Date, Type, Amount, and Receipt columns. Sorted by date (most recent first). Features CrPageHeader with eyebrow text and export action button. Receipt buttons use CrButton component with download icon.'
      }
    }
  }
};

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    striped: true,
    bordered: false,
    hover: true,
    sortable: false,
    loading: false,
    empty: false,
    tableTitle: 'Music Tracks',
    showEyebrow: false,
    showActionButton: false
  }
};

export const WithPageHeader = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    striped: true,
    bordered: false,
    hover: true,
    sortable: true,
    loading: false,
    empty: false,
    eyebrowText: 'CHIRP Radio',
    tableTitle: 'Music Library',
    showEyebrow: true,
    showActionButton: true,
    actionButtonText: 'Add Track',
    actionButtonIcon: React.createElement(PiDownload),
    onActionClick: () => {
      console.log('Add track clicked');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with CrPageHeader showing eyebrow text, title, and action button.'
      }
    }
  }
};

export const TitleOnly = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    striped: true,
    bordered: false,
    hover: true,
    sortable: false,
    loading: false,
    empty: false,
    tableTitle: 'Simple Music Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with just a title in the page header, no eyebrow or action button.'
      }
    }
  }
};

export const WithActions = {
  args: {
    columns: actionColumns,
    data: sampleData,
    variant: 'default',
    striped: true,
    bordered: false,
    hover: true,
    sortable: false,
    loading: false,
    empty: false,
    tableTitle: 'Interactive Music Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with custom action buttons in the last column using React Icons.'
      }
    }
  }
};

export const Sortable = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    striped: true,
    bordered: false,
    hover: true,
    sortable: true,
    loading: false,
    empty: false,
    initialSortColumn: 'name',
    initialSortDirection: 'asc',
    tableTitle: 'Sortable Music Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with sortable columns. Click on column headers to sort. Sorting works automatically for strings, numbers, and handles null values properly.'
      }
    }
  }
};

export const StripedAndBordered = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    striped: true,
    bordered: true,
    hover: true,
    sortable: false,
    loading: false,
    empty: false,
    tableTitle: 'Striped & Bordered Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with zebra striping and column borders for better visual separation.'
      }
    }
  }
};

export const Compact = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'compact',
    striped: true,
    bordered: false,
    hover: true,
    sortable: true,
    loading: false,
    empty: false,
    tableTitle: 'Compact Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant with reduced padding, useful for displaying more data in less space.'
      }
    }
  }
};

export const Comfortable = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'comfortable',
    striped: false,
    bordered: false,
    hover: true,
    sortable: false,
    loading: false,
    empty: false,
    tableTitle: 'Comfortable Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Comfortable variant with increased padding for better readability.'
      }
    }
  }
};

export const Loading = {
  args: {
    columns: sampleColumns,
    data: [],
    variant: 'default',
    striped: false,
    bordered: false,
    hover: true,
    sortable: false,
    loading: true,
    empty: false,
    loadingMessage: 'Loading tracks...',
    tableTitle: 'Loading Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner and custom loading message.'
      }
    }
  }
};

export const Empty = {
  args: {
    columns: sampleColumns,
    data: [],
    variant: 'default',
    striped: false,
    bordered: false,
    hover: true,
    sortable: false,
    loading: false,
    empty: true,
    emptyMessage: 'No tracks found',
    tableTitle: 'Empty Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with custom empty message when no data is available.'
      }
    }
  }
};

export const WithCaption = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    variant: 'default',
    striped: false,
    bordered: false,
    hover: true,
    sortable: true,
    loading: false,
    empty: false,
    caption: 'Jazz Album Tracks - Top 5 Classic Recordings',
    tableTitle: 'Captioned Table',
    showEyebrow: false,
    showActionButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with a caption for additional context and accessibility.'
      }
    }
  }
};

// Complex table with mixed column types
const complexColumns = [
  {
    key: 'status',
    title: 'Status',
    width: 'narrow',
    align: 'center',
    render: (value, row) => {
      const isActive = row.id % 2 === 1;
      return React.createElement('span', {
        style: {
          display: 'inline-block',
          padding: 'var(--cr-space-xs) var(--cr-space-2)',
          borderRadius: 'var(--cr-space-xs)',
          fontSize: '11px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.025em',
          backgroundColor: isActive ? 'var(--cr-primary-100)' : 'var(--cr-default-200)',
          color: isActive ? 'var(--cr-primary-700)' : 'var(--cr-default-700)'
        }
      }, isActive ? 'ACTIVE' : 'INACTIVE');
    }
  },
  {
    key: 'name',
    title: 'Track Name',
    sortable: true,
    render: (value, row) => {
      return React.createElement('div', {
        style: { fontWeight: '500' }
      }, value);
    }
  },
  {
    key: 'artist',
    title: 'Artist',
    sortable: true,
    render: (value, row) => {
      return React.createElement('div', {
        style: { color: 'var(--cr-default-700)' }
      }, value);
    }
  },
  {
    key: 'plays',
    title: 'Plays',
    align: 'right',
    sortable: true,
    width: 'narrow',
    render: (value, row) => {
      const plays = Math.floor(Math.random() * 10000);
      return React.createElement('span', {
        style: { fontVariantNumeric: 'tabular-nums' }
      }, plays.toLocaleString());
    }
  },
  {
    key: 'rating',
    title: 'Rating',
    align: 'center',
    width: 'narrow',
    render: (value, row) => {
      const rating = Math.floor(Math.random() * 5) + 1;
      return React.createElement('div', {
        style: { display: 'flex', gap: '2px', justifyContent: 'center' }
      }, Array.from({ length: 5 }, (_, i) => 
        React.createElement(PiHeartFill, {
          key: i,
          size: 14,
          style: {
            color: i < rating ? 'var(--cr-primary-500)' : 'var(--cr-default-300)'
          }
        })
      ));
    }
  }
];

export const Complex = {
  args: {
    columns: complexColumns,
    data: sampleData,
    variant: 'default',
    striped: true,
    bordered: false,
    hover: true,
    sortable: true,
    loading: false,
    empty: false,
    caption: 'Track Performance Dashboard',
    eyebrowText: 'CHIRP Radio',
    tableTitle: 'Performance Dashboard',
    showEyebrow: true,
    showActionButton: true,
    actionButtonText: 'Export Data',
    actionButtonIcon: React.createElement(PiExport),
    onActionClick: () => {
      console.log('Export data clicked');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex table demonstrating custom renderers, status badges, ratings, formatted numbers, and full page header integration.'
      }
    }
  }
};