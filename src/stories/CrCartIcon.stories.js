// CrCartIcon.stories.tsx
import React from 'react';
import CrCartIcon from './CrCartIcon';

export default {
  title: 'Atoms/CrCartIcon',
  component: CrCartIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Shopping cart icon component with badge support. Used in CrMainNav and CrShoppingCart for consistent cart representation. Supports different sizes and badge counts with proper accessibility features. Can be interactive with click handlers and keyboard navigation. Dark mode adapts through [data-theme="dark"] CSS selectors.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    badgeCount: {
      control: { type: 'number', min: 0, max: 99 },
      description: 'Number to display in badge'
    },
    showBadge: {
      control: 'boolean',
      description: 'Whether to show the badge when badgeCount > 0'
    },
    size: {
      control: { type: 'select' },
      options: ['24', '36', '48', '60'],
      description: 'Icon size in pixels'
    },
    onClick: {
      action: 'cart clicked',
      description: 'Click handler - makes icon interactive'
    },
    ariaLabel: {
      control: 'text',
      description: 'Custom accessibility label'
    }
  },
};

// Default cart icon
export const Default = {
  args: {
    badgeCount: 5,
    showBadge: true,
    size: '36'
  },
};

// Interactive cart icon (clickable)
export const Interactive = {
  args: {
    badgeCount: 3,
    showBadge: true,
    size: '36',
    onClick: () => console.log('Cart clicked!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive cart icon with click handler. Adds hover effects and keyboard navigation.'
      }
    }
  }
};

// No badge
export const NoBadge = {
  args: {
    badgeCount: 0,
    showBadge: true,
    size: '36'
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart icon without badge when count is 0.'
      }
    }
  }
};

// Badge hidden
export const BadgeHidden = {
  args: {
    badgeCount: 5,
    showBadge: false,
    size: '36'
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart icon with badge explicitly hidden via showBadge prop.'
      }
    }
  }
};

// Small size
export const SmallSize = {
  args: {
    badgeCount: 2,
    showBadge: true,
    size: '24'
  },
  parameters: {
    docs: {
      description: {
        story: 'Small cart icon (24px) with scaled badge.'
      }
    }
  }
};

// Large size
export const LargeSize = {
  args: {
    badgeCount: 8,
    showBadge: true,
    size: '48'
  },
  parameters: {
    docs: {
      description: {
        story: 'Large cart icon (48px) with scaled badge.'
      }
    }
  }
};

// Extra large size (for CrShoppingCart)
export const ExtraLargeSize = {
  args: {
    badgeCount: 12,
    showBadge: true,
    size: '60'
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra large cart icon (60px) with centered badge positioning used in CrShoppingCart.'
      }
    }
  }
};

// High badge count
export const HighBadgeCount = {
  args: {
    badgeCount: 99,
    showBadge: true,
    size: '36'
  },
  parameters: {
    docs: {
      description: {
        story: 'Cart icon with high badge count showing number formatting.'
      }
    }
  }
};

// All sizes showcase
export const AllSizes = {
  render: () => React.createElement('div', { 
    style: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: 'var(--cr-space-6)',
      flexWrap: 'wrap'
    }
  }, [
    React.createElement('div', { 
      key: 'size-24',
      style: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 'var(--cr-space-2)' 
      }
    }, [
      React.createElement(CrCartIcon, { 
        key: 'icon-24',
        badgeCount: 3, 
        showBadge: true, 
        size: '24' 
      }),
      React.createElement('span', { 
        key: 'label-24',
        style: { fontSize: '12px', color: 'var(--cr-default-500)' }
      }, '24px')
    ]),
    React.createElement('div', { 
      key: 'size-36',
      style: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 'var(--cr-space-2)' 
      }
    }, [
      React.createElement(CrCartIcon, { 
        key: 'icon-36',
        badgeCount: 5, 
        showBadge: true, 
        size: '36' 
      }),
      React.createElement('span', { 
        key: 'label-36',
        style: { fontSize: '12px', color: 'var(--cr-default-500)' }
      }, '36px')
    ]),
    React.createElement('div', { 
      key: 'size-48',
      style: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 'var(--cr-space-2)' 
      }
    }, [
      React.createElement(CrCartIcon, { 
        key: 'icon-48',
        badgeCount: 8, 
        showBadge: true, 
        size: '48' 
      }),
      React.createElement('span', { 
        key: 'label-48',
        style: { fontSize: '12px', color: 'var(--cr-default-500)' }
      }, '48px')
    ]),
    React.createElement('div', { 
      key: 'size-60',
      style: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 'var(--cr-space-2)' 
      }
    }, [
      React.createElement(CrCartIcon, { 
        key: 'icon-60',
        badgeCount: 12, 
        showBadge: true, 
        size: '60' 
      }),
      React.createElement('span', { 
        key: 'label-60',
        style: { fontSize: '12px', color: 'var(--cr-default-500)' }
      }, '60px')
    ])
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all available cart icon sizes with badges.'
      }
    }
  }
};