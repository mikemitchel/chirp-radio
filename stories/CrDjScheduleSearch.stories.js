// CrDjScheduleSearch.stories.js
import React from 'react';
import CrDjScheduleSearch from './CrDjScheduleSearch';

const mockSearchResults = [
  {
    day: 'Monday',
    slug: 'morning-classics',
    dj: ['Sarah Johnson'],
    title: 'Morning Classics',
    start: '06:00',
    end: '09:00'
  },
  {
    day: 'Wednesday',
    slug: 'sarah-evening',
    dj: ['Sarah Martinez'],
    title: 'Evening Vibes',
    start: '17:00',
    end: '20:00'
  },
  {
    day: 'Friday',
    slug: 'sarah-late',
    dj: ['Sarah Chen', 'Mike Wilson'],
    title: null,
    start: '23:00',
    end: '00:00'
  }
];

const formatTime = (t) => {
  const [h, m] = t.split(':').map(Number);
  if (h === 0 && m === 0) return '12m';
  if (h === 12 && m === 0) return '12n';
  const hour = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 || h === 24 ? 'am' : 'pm';
  return `${hour}${m ? ':' + m.toString().padStart(2, '0') : ''}${ampm}`;
};

export default {
  title: 'Atoms/CrDjScheduleSearch',
  component: CrDjScheduleSearch,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from search input and filter elements. DJ schedule search component with text search and filtering capabilities. Allows users to find specific DJs, shows, or time slots in the schedule. Includes clear and submit functionality. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    searchQuery: {
      control: 'text',
      description: 'Current search query text'
    },
    searchResults: {
      control: 'object',
      description: 'Array of search result objects'
    },
    onSearch: { action: 'search' },
    onClear: { action: 'clear' },
    onResultClick: { action: 'result clicked' },
    formatTime: {
      description: 'Function to format time strings'
    }
  },
  tags: ['autodocs']
};

export const Empty = {
  args: {
    searchQuery: '',
    searchResults: [],
    formatTime: formatTime
  }
};

export const WithQuery = {
  args: {
    searchQuery: 'Sarah',
    searchResults: [],
    formatTime: formatTime
  }
};

export const WithResults = {
  args: {
    searchQuery: 'Sarah',
    searchResults: mockSearchResults,
    formatTime: formatTime
  }
};

export const NoResults = {
  render: (args) => {
    const [query, setQuery] = React.useState('XYZ');
    
    return React.createElement(CrDjScheduleSearch, {
      searchQuery: query,
      searchResults: [],
      onSearch: setQuery,
      onClear: () => setQuery(''),
      onResultClick: (day, slug) => console.log('Navigate to:', day, slug),
      formatTime: formatTime
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Search with no matching results shows "Sorry, there are no DJs or Shows by that name" message.'
      }
    }
  }
};

export const Interactive = {
  render: () => {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState([]);

    const handleSearch = (searchQuery) => {
      setQuery(searchQuery);
      
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      const filtered = mockSearchResults.filter(show => {
        const djMatch = show.dj.some(dj => 
          dj.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const titleMatch = show.title && 
          show.title.toLowerCase().includes(searchQuery.toLowerCase());
        return djMatch || titleMatch;
      });

      setResults(filtered);
    };

    return React.createElement(CrDjScheduleSearch, {
      searchQuery: query,
      searchResults: results,
      onSearch: handleSearch,
      onClear: () => {
        setQuery('');
        setResults([]);
      },
      onResultClick: (day, slug) => {
        console.log('Navigate to:', day, slug);
        setQuery('');
        setResults([]);
      },
      formatTime: formatTime
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive search - try typing "Sarah" or "Morning".'
      }
    }
  }
};