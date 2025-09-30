// CrTopBanner.stories.tsx
import CrTopBanner from './CrTopBanner';

export default {
  title: 'Molecules/CrTopBanner',
  component: CrTopBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
  description: {
    component: 'Built from CrAccount and CrCurrentDj molecules. Top site banner combining user account info with current DJ display. This uses multiple molecules - should move to Organisms category. Supports live data fetching and various user states. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs'],
  argTypes: {
    // Account props
    isLoggedIn: {
      control: 'boolean',
      description: 'Whether the user is logged in'
    },
    isVolunteer: {
      control: 'boolean',
      description: 'Whether the user is a volunteer'
    },
    userName: {
      control: 'text',
      description: 'User display name'
    },
    userAvatar: {
      control: 'text',
      description: 'URL for user avatar image'
    },
    showTags: {
      control: 'boolean',
      description: 'Whether to show volunteer tags (typically false in banner)'
    },
    tags: {
      control: 'object',
      description: 'Array of tag strings'
    },
    
    // DJ/Show props
    djName: {
      control: 'text',
      description: 'Name of the current DJ'
    },
    showName: {
      control: 'text',
      description: 'Name of the current show'
    },
    isOnAir: {
      control: 'boolean',
      description: 'Whether to show the on-air status'
    },
    statusText: {
      control: 'text',
      description: 'Text to display in the status chip'
    },
    
    // API props
    autoFetch: {
      control: 'boolean',
      description: 'Whether to fetch live data from API'
    },
    apiUrl: {
      control: 'text',
      description: 'API URL for fetching live data'
    }
  },
};

// Default state matching the Figma design
export const Default = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Johanna Dough',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    showTags: false,
    tags: ['Jazz', 'Blues', 'Rock'],
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air'
  },
};

// Logged out user
export const LoggedOut = {
  args: {
    isLoggedIn: false,
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air'
  },
};

// Regular user (not volunteer)
export const RegularUser = {
  args: {
    isLoggedIn: true,
    isVolunteer: false,
    userName: 'Music Lover',
    userAvatar: 'https://images.unsplash.com/photo-1524666041070-9d87656c25bb',
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air'
  },
};

// With tags shown (might be used in expanded states)
export const WithTags = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Johanna Dough',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    showTags: true,
    tags: ['Jazz', 'Blues'],
    djName: 'DJ Current',
    showName: 'The Current Show',
    isOnAir: true,
    statusText: 'On-Air'
  },
};

// Off air state
export const OffAir = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Johanna Dough',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    showTags: false,
    djName: 'DJ Offline',
    showName: 'Previous Show',
    isOnAir: false
  },
};

// Long names to test truncation
export const LongNames = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'A Really Long User Name That Might Overflow',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    showTags: false,
    djName: 'DJ Really Long Name That Should Truncate',
    showName: 'An Extremely Long Show Name That Should Handle Gracefully',
    isOnAir: true,
    statusText: 'Live'
  },
};

// Live API Data Example
export const WithLiveApiData = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Live Demo User',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    showTags: false,
    djName: 'DJ Current', // Will be overridden by API data
    showName: 'The Current Show', // Will be overridden by API data if available
    isOnAir: true,
    statusText: 'On-Air',
    autoFetch: true,
    apiUrl: 'https://chirpradio.appspot.com/api/current_playlist'
  },
  parameters: {
    docs: {
      description: {
        story: 'CrTopBanner with live API data fetching enabled. The DJ name will be fetched from the CHIRP Radio API and updated every 15 seconds. Show name will also be fetched if available in the API, otherwise it won\'t be displayed.'
      }
    }
  }
};