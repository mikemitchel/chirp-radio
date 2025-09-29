import CrAvatar from './CrAvatar';

export default {
  title: 'Atoms/CrAvatar',
  component: CrAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'User profile avatar component with automatic fallback states. Shows CHIRP bird logo when user is logged out, generic user icon when logged in without a profile image, or the actual user photo when available. Handles image loading errors gracefully by falling back to the user icon. Maintains consistent 44px circular size with appropriate borders and background colors. Supports both logged-in and logged-out visual states with different styling treatments. Dark mode adaptations follow the [data-theme="dark"] CSS selectors for proper contrast and visibility.'
      }
    }
  },
  tags: ['autodocs'],
};

// Not logged in - shows fallback text with border
export const LoggedOut = {
  args: {
    isLoggedIn: false,
    fallbackText: '?',
  },
};

// Logged in without image - shows user icon
export const LoggedInNoImage = {
  args: {
    isLoggedIn: true,
  },
};

// Logged in with image - shows user photo
export const LoggedInWithImage = {
  args: {
    src: 'https://images.unsplash.com/photo-1617037448248-6bd7b4a0d038',
    alt: 'User avatar',
    isLoggedIn: true,
  },
};