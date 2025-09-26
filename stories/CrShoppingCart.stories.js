// CrShoppingCart.stories.js
import React from 'react';
import CrShoppingCart from './CrShoppingCart';

export default {
  title: 'Molecules/CrShoppingCart',
  component: CrShoppingCart,
  parameters: {
    layout: 'centered',
docs: {
  description: {
    component: 'Built from theCrButton atom and CrCartIcon atom. E-commerce shopping cart component with item management, quantity controls, and checkout functionality. Supports add/remove items and total calculations. Used in store interfaces. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of cart items with id, name, price, size, color, and quantity properties'
    },
    onEmptyCart: {
      action: 'empty cart',
      description: 'Callback when Empty Cart button is clicked'
    },
    onCheckout: {
      action: 'checkout',
      description: 'Callback when Check out button is clicked'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the component'
    }
  }
};

// Sample cart items matching the Figma design
const sampleItems = [
  {
    id: 1,
    name: 'Shirt Name',
    price: 25.00,
    size: 'Large',
    quantity: 1
  },
  {
    id: 2,
    name: 'Shirt Name',
    price: 35.00,
    size: 'Large',
    quantity: 1
  },
  {
    id: 3,
    name: 'Shirt Name',
    price: 15.00,
    size: 'Large',
    quantity: 1
  },
  {
    id: 4,
    name: 'Shirt Name',
    price: 45.00,
    size: 'Large',
    quantity: 1
  },
  {
    id: 5,
    name: 'Shirt Name',
    price: 20.00,
    size: 'Large',
    quantity: 1
  }
];

// Default story matching Figma design exactly
export const Default = {
  args: {
    items: sampleItems
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Default shopping cart component matching the Figma design with 5 items, each priced at $00.00 placeholder values. Shows the cart icon with badge count and proper typography hierarchy.'
      }
    }
  }
};

// Empty cart state
export const EmptyCart = {
  args: {
    items: []
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping cart in empty state with no items and no action buttons displayed.'
      }
    }
  }
};

// Single item cart
export const SingleItem = {
  args: {
    items: [
      {
        id: 1,
        name: 'CHIRP Radio T-Shirt',
        price: 25.00,
        size: 'Large',
        color: 'Black',
        quantity: 1
      }
    ]
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping cart with a single item including size and color details.'
      }
    }
  }
};

// Realistic merchandise cart
export const MerchandiseCart = {
  args: {
    items: [
      {
        id: 1,
        name: 'CHIRP Radio T-Shirt',
        price: 25.00,
        size: 'Large',
        color: 'Black',
        quantity: 2
      },
      {
        id: 2,
        name: 'CHIRP Logo Hoodie',
        price: 45.00,
        size: 'Medium',
        color: 'Navy',
        quantity: 1
      },
      {
        id: 3,
        name: 'Vinyl Sticker Pack',
        price: 8.00,
        quantity: 3
      },
      {
        id: 4,
        name: 'CHIRP Tote Bag',
        price: 15.00,
        color: 'Natural',
        quantity: 1
      }
    ]
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping cart with realistic CHIRP Radio merchandise including varied quantities, sizes, and colors.'
      }
    }
  }
};

// Items without optional properties
export const MinimalItems = {
  args: {
    items: [
      {
        id: 1,
        name: 'Basic Item',
        price: 10.00
      },
      {
        id: 2,
        name: 'Another Item',
        price: 15.50
      }
    ]
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping cart with minimal item data (name and price only) to test the component with basic required props.'
      }
    }
  }
};

// Large quantity items
export const LargeQuantities = {
  args: {
    items: [
      {
        id: 1,
        name: 'Vinyl Stickers',
        price: 2.00,
        quantity: 15
      },
      {
        id: 2,
        name: 'Promotional Buttons',
        price: 1.50,
        quantity: 25
      },
      {
        id: 3,
        name: 'Concert Tickets',
        price: 35.00,
        quantity: 4
      }
    ]
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping cart with items having large quantities to test badge display with high numbers (44 total items).'
      }
    }
  }
};

// Mobile view
export const Mobile = {
  args: {
    items: sampleItems
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '375px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Shopping cart optimized for mobile viewport with stacked action buttons and responsive spacing.'
      }
    }
  }
};

// Dark mode
export const DarkMode = {
  args: {
    items: sampleItems
  },
  render: (args) => {
    return React.createElement('div', {
      'data-theme': 'dark',
      style: {
        backgroundColor: 'var(--cr-paper)',
        padding: 'var(--cr-space-4)',
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
        minHeight: '400px'
      }
    }, React.createElement(CrShoppingCart, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping cart in dark mode using CSS variables. Colors automatically adapt through the design system.'
      }
    }
  }
};

// Interactive example with state management
export const Interactive = {
  render: () => {
    const [cartItems, setCartItems] = React.useState([
      {
        id: 1,
        name: 'CHIRP T-Shirt',
        price: 25.00,
        size: 'Large',
        quantity: 1
      },
      {
        id: 2,
        name: 'Vinyl Stickers',
        price: 8.00,
        quantity: 2
      }
    ]);
    
    const handleEmptyCart = () => {
      setCartItems([]);
      console.log('Cart emptied');
    };
    
    const handleCheckout = () => {
      console.log('Proceeding to checkout with items:', cartItems);
      // In real app, this would navigate to checkout page
    };
    
    const handleAddItem = () => {
      const newItem = {
        id: Date.now(),
        name: 'Random Item',
        price: Math.round((Math.random() * 50 + 10) * 100) / 100,
        size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
        quantity: Math.floor(Math.random() * 3) + 1
      };
      setCartItems([...cartItems, newItem]);
    };
    
    return React.createElement('div', {
      style: {
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--cr-space-4)'
      }
    }, [
      React.createElement('button', {
        key: 'add-button',
        onClick: handleAddItem,
        style: {
          padding: 'var(--cr-space-2) var(--cr-space-3)',
          backgroundColor: 'var(--cr-secondary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--cr-space-1)',
          cursor: 'pointer',
          font: 'var(--cr-btn-text-md)',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }
      }, 'Add Random Item'),
      React.createElement(CrShoppingCart, {
        key: 'cart',
        items: cartItems,
        onEmptyCart: handleEmptyCart,
        onCheckout: handleCheckout
      })
    ]);
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive shopping cart with ability to add random items and trigger cart actions. Demonstrates real-time updates to item count badge and total calculations.'
      }
    }
  }
};