import CrAccount from './CrAccount'

export default {
  title: 'Molecules/CrAccount',
  component: CrAccount,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Built from CrAvatar and CrButton atoms with CrChip atoms for tags. User account display component showing login state, user info, and volunteer status. Displays CHIRP bird logo when logged out or user avatar when logged in. Includes volunteer dropdown and category tags for DJ specialties. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: 'Whether the user is logged in',
    },
    isVolunteer: {
      control: 'boolean',
      description: 'Whether the user is a volunteer (shows tags and dropdown)',
    },
    userName: {
      control: 'text',
      description: 'User display name',
    },
    userAvatar: {
      control: 'text',
      description: 'URL for user avatar image',
    },
    showTags: {
      control: 'boolean',
      description: 'Whether to show volunteer tags',
    },
    tags: {
      control: 'object',
      description: 'Array of tag strings',
    },
  },
}

export const LoggedOut = {
  args: {
    isLoggedIn: false,
  },
}

export const LoggedIn = {
  args: {
    isLoggedIn: true,
    userName: 'Johanna Dough',
    userAvatar: 'https://images.unsplash.com/photo-1679131738535-59e2af8fd76b',
  },
}

export const Volunteer = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'Johanna Dough',
    userAvatar: 'https://images.unsplash.com/photo-1679131738535-59e2af8fd76b',
    showTags: true,
    tags: ['Jazz', 'Blues', 'Rock'],
  },
}

export const VolunteerNoTags = {
  args: {
    isLoggedIn: true,
    isVolunteer: true,
    userName: 'DJ Mike',
    userAvatar: 'https://images.unsplash.com/photo-1524666041070-9d87656c25bb',
    showTags: false,
  },
}
