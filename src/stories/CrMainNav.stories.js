// CrMainNav.stories.tsx
import CrMainNav from './CrMainNav'

export default {
  title: 'Molecules/CrMainNav',
  component: CrMainNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Built from CrMenuButton and CrButton atoms, plus the CrCartIcon atom for store badge. Main website navigation with menu toggle, nav links, search, store cart, and donation buttons. This complex navigation system may warrant Organisms category. Supports both desktop and mobile layouts. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['desktop', 'mobile'],
      description: 'Navigation variant for different layouts',
    },
    storeBadgeCount: {
      control: { type: 'number', min: 0, max: 99 },
      description: 'Number to display in store badge',
    },
    showStoreBadge: {
      control: 'boolean',
      description: 'Whether to show the store badge',
    },
    onMenuClick: { action: 'menu clicked' },
    onListenClick: { action: 'listen clicked' },
    onEventsClick: { action: 'events clicked' },
    onArticlesClick: { action: 'articles clicked' },
    onSearchClick: { action: 'search clicked' },
    onStoreClick: { action: 'store clicked' },
    onWaysToGiveClick: { action: 'ways to give clicked' },
    onDonateClick: { action: 'donate clicked' },
  },
}

// Default navigation
export const Default = {
  args: {
    variant: 'desktop',
    storeBadgeCount: 5,
    showStoreBadge: true,
  },
}

// Mobile variant
export const Mobile = {
  args: {
    variant: 'mobile',
    storeBadgeCount: 3,
    showStoreBadge: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

// Without store badge
export const NoBadge = {
  args: {
    variant: 'desktop',
    showStoreBadge: false,
  },
}

// High badge count
export const HighBadgeCount = {
  args: {
    variant: 'desktop',
    storeBadgeCount: 99,
    showStoreBadge: true,
  },
}

// With all interactions
export const Interactive = {
  args: {
    variant: 'desktop',
    storeBadgeCount: 5,
    showStoreBadge: true,
    onMenuClick: () => console.log('Menu clicked'),
    onListenClick: () => console.log('Listen clicked'),
    onEventsClick: () => console.log('Events clicked'),
    onArticlesClick: () => console.log('Articles clicked'),
    onSearchClick: () => console.log('Search clicked'),
    onStoreClick: () => console.log('Store clicked'),
    onWaysToGiveClick: () => console.log('Ways to Give clicked'),
    onDonateClick: () => console.log('Donate clicked'),
  },
}
