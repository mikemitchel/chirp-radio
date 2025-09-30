// CrStoreItemCard.stories.tsx
import React from 'react';
import CrStoreItemCard from './CrStoreItemCard';

export default {
  title: 'Molecules/CrStoreItemCard',
  component: CrStoreItemCard,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from CrChip atom for category tag. Product display card showing item image, name, price, and category tag. Used in store listings and product grids. Supports click interactions and hover states. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Product name'
    },
    price: {
      control: 'number',
      description: 'Product price in dollars'
    },
    image: {
      control: 'text',
      description: 'Product image URL'
    },
    itemType: {
      control: 'text',
      description: 'Product category/type for the chip'
    },
    onClick: {
      action: 'item clicked',
      description: 'Callback when card is clicked'
    }
  }
};

// Default story matching Figma design
export const Default = {
  args: {
    name: "Item Name",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
    itemType: "Item Type"
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        width: '300px',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Default store item card matching the Figma design exactly with product image, name, price, and type chip.'
      }
    }
  }
};

// T-Shirt card
export const TShirt = {
  args: {
    name: "CHIRP Radio T-Shirt",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
    itemType: "Apparel"
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        width: '300px',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, args));
  }
};

// Hoodie card
export const Hoodie = {
  args: {
    name: "CHIRP Radio Hoodie",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop",
    itemType: "Apparel"
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        width: '300px',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, args));
  }
};

// Accessory card
export const ToteBag = {
  args: {
    name: "CHIRP Radio Tote Bag",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop",
    itemType: "Accessories"
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        width: '300px',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, args));
  }
};

// Vinyl record card
export const Vinyl = {
  args: {
    name: "Limited Edition CHIRP Compilation",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    itemType: "Music"
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        width: '300px',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, args));
  }
};

// Long name example
export const LongName = {
  args: {
    name: "CHIRP Radio Limited Edition Anniversary T-Shirt with Extra Long Name",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
    itemType: "Special Edition"
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        width: '300px',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, args));
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with long product name to show text truncation behavior.'
      }
    }
  }
};

// Grid layout example
export const GridLayout = {
  render: () => {
    const items = [
      {
        name: "CHIRP Radio T-Shirt",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
        itemType: "Apparel"
      },
      {
        name: "CHIRP Radio Hoodie",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop",
        itemType: "Apparel"
      },
      {
        name: "CHIRP Tote Bag",
        price: 15.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop",
        itemType: "Accessories"
      },
      {
        name: "Vinyl Compilation",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        itemType: "Music"
      },
      {
        name: "CHIRP Sticker Pack",
        price: 8.00,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
        itemType: "Accessories"
      },
      {
        name: "Coffee Mug",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=800&h=600&fit=crop",
        itemType: "Accessories"
      }
    ];
    
    return React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--cr-space-8)',
        maxWidth: '1200px',
        margin: '0 auto'
      }
    }, items.map((item, index) => 
      React.createElement(CrStoreItemCard, {
        key: index,
        ...item,
        onClick: (itemData) => console.log('Clicked:', itemData)
      })
    ));
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple store item cards in a responsive grid layout, demonstrating how they would appear in a real shop listing.'
      }
    }
  }
};

// Interactive clickable example
export const InteractiveClickable = {
  args: {
    name: "CHIRP Radio T-Shirt",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
    itemType: "Apparel"
  },
  render: (args) => {
    const handleClick = (itemData) => {
      alert(`You clicked on: ${itemData.name}\nPrice: $${itemData.price}\nType: ${itemData.itemType}`);
    };
    
    return React.createElement('div', {
      style: {
        width: '300px',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, {
      ...args,
      onClick: handleClick
    }));
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive store item card with click handler. Shows hover effects and click functionality that would navigate to item detail page.'
      }
    }
  }
};

// Mobile view
export const Mobile = {
  args: {
    name: "CHIRP Radio T-Shirt",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
    itemType: "Apparel"
  },
  render: (args) => {
    return React.createElement('div', {
      style: {
        maxWidth: '375px',
        width: '100%',
        margin: '0 auto'
      }
    }, React.createElement(CrStoreItemCard, args));
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Store item card optimized for mobile viewport with smaller image and responsive text handling.'
      }
    }
  }
};

// Mobile grid
export const MobileGrid = {
  render: () => {
    const items = [
      {
        name: "CHIRP T-Shirt",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
        itemType: "Apparel"
      },
      {
        name: "CHIRP Hoodie",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop",
        itemType: "Apparel"
      }
    ];
    
    return React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 'var(--cr-space-4)',
        maxWidth: '375px',
        margin: '0 auto'
      }
    }, items.map((item, index) => 
      React.createElement(CrStoreItemCard, {
        key: index,
        ...item
      })
    ));
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile grid layout showing how store item cards work in a 2-column mobile grid.'
      }
    }
  }
};