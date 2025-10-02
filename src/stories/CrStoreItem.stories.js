// CrStoreItem.stories.tsx
import React from 'react'
import CrStoreItem from './CrStoreItem'

export default {
  title: 'Organisms/CrStoreItem',
  component: CrStoreItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CrStoreItem uses CrButton atoms, CrSelect atoms, and product display elements. This component provides complete product page interface with image gallery, variant selection, quantity controls, and add-to-cart functionality. Complex e-commerce interface with multiple interaction states and product configuration options. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Product name',
    },
    price: {
      control: 'number',
      description: 'Product price in dollars',
    },
    description: {
      control: 'text',
      description: 'Product description text',
    },
    image: {
      control: 'text',
      description: 'Product image URL',
    },
    itemType: {
      control: 'text',
      description: 'Product category/type for the chip',
    },
    sizeOptions: {
      control: 'object',
      description: 'Array of available sizes',
    },
    sizeLabel: {
      control: 'text',
      description: 'Label for size selection field',
    },
    quantityLabel: {
      control: 'text',
      description: 'Label for quantity selection field',
    },
    maxQuantity: {
      control: 'number',
      description: 'Maximum quantity available',
    },
    selectedSize: {
      control: 'text',
      description: 'Currently selected size (controlled)',
    },
    quantity: {
      control: 'number',
      description: 'Currently selected quantity (controlled)',
    },
    onAddToCart: {
      action: 'add to cart',
      description: 'Callback when Add to Cart button is clicked',
    },
    onSizeChange: {
      action: 'size changed',
      description: 'Callback when size selection changes',
    },
    onQuantityChange: {
      action: 'quantity changed',
      description: 'Callback when quantity selection changes',
    },
  },
}

// Default story matching Figma design
export const Default = {
  args: {
    name: 'Item Name',
    price: 25.0,
    description:
      'Standard and fitted styles available. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    itemType: 'Item Type',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    sizeLabel: 'T-Shirt Size',
    quantityLabel: 'How Many?',
    maxQuantity: 10,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        },
      },
      React.createElement(CrStoreItem, args)
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default store item component matching the Figma design exactly with product image, details, size/quantity selection, and add to cart button.',
      },
    },
  },
}

// T-Shirt example
export const TShirt = {
  args: {
    name: 'CHIRP Radio T-Shirt',
    price: 25.0,
    description:
      'High-quality cotton t-shirt featuring the iconic CHIRP Radio logo. Available in standard and fitted styles. Perfect for showing your support for community radio. Comfortable, durable, and stylish - ideal for concerts, events, or everyday wear.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    itemType: 'Apparel',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    sizeLabel: 'T-Shirt Size',
    quantityLabel: 'How Many?',
    maxQuantity: 5,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        },
      },
      React.createElement(CrStoreItem, args)
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'CHIRP Radio t-shirt with realistic product details and extended size options.',
      },
    },
  },
}

// Hoodie example
export const Hoodie = {
  args: {
    name: 'CHIRP Radio Hoodie',
    price: 45.0,
    description:
      'Stay warm while repping your favorite community radio station. This cozy hoodie features the CHIRP Radio logo embroidered on the front with a comfortable cotton-poly blend. Perfect for Chicago winters or chilly concert venues.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=600&fit=crop',
    itemType: 'Apparel',
    sizeOptions: ['S', 'M', 'L', 'XL', '2XL'],
    sizeLabel: 'Hoodie Size',
    quantityLabel: 'How Many?',
    maxQuantity: 3,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        },
      },
      React.createElement(CrStoreItem, args)
    )
  },
}

// Accessory example (no sizes)
export const ToteBag = {
  args: {
    name: 'CHIRP Radio Tote Bag',
    price: 15.0,
    description:
      'Eco-friendly cotton tote bag perfect for carrying your vinyl records, groceries, or everyday essentials. Features the CHIRP Radio logo screen-printed in bold colors. Durable construction with reinforced handles.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
    itemType: 'Accessories',
    sizeOptions: [], // No size options for accessories
    quantityLabel: 'How Many?',
    maxQuantity: 10,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        },
      },
      React.createElement(CrStoreItem, args)
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Tote bag example with no size selection - only quantity selection shown.',
      },
    },
  },
}

// High-priced item
export const LimitedEditionVinyl = {
  args: {
    name: 'Limited Edition CHIRP Compilation Vinyl',
    price: 35.0,
    description:
      'Exclusive vinyl compilation featuring tracks from local Chicago artists who have performed live sessions at CHIRP Radio. Limited press of 500 copies on colored vinyl. Includes digital download code and liner notes with artist interviews.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    itemType: 'Music',
    sizeOptions: [], // No size options for vinyl
    quantityLabel: 'How Many?',
    maxQuantity: 2, // Limited quantity
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        },
      },
      React.createElement(CrStoreItem, args)
    )
  },
}

// Mobile view
export const Mobile = {
  args: {
    name: 'CHIRP Radio T-Shirt',
    price: 25.0,
    description:
      'High-quality cotton t-shirt featuring the iconic CHIRP Radio logo. Perfect for showing your support for community radio.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    itemType: 'Apparel',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    sizeLabel: 'T-Shirt Size',
    quantityLabel: 'How Many?',
    maxQuantity: 5,
  },
  render: (args) => {
    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '375px',
          width: '100%',
          margin: '0 auto',
        },
      },
      React.createElement(CrStoreItem, args)
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Store item component optimized for mobile viewport with stacked layout.',
      },
    },
  },
}

// Controlled example with state management
export const InteractiveControlled = {
  render: () => {
    const [selectedSize, setSelectedSize] = React.useState('')
    const [quantity, setQuantity] = React.useState(1)
    const [cartItems, setCartItems] = React.useState([])

    const handleAddToCart = (item) => {
      if (!item.size && item.sizeOptions && item.sizeOptions.length > 0) {
        alert('Please select a size first!')
        return
      }

      setCartItems([...cartItems, { ...item, id: Date.now() }])
      console.log('Added to cart:', item)

      // Reset selections
      setSelectedSize('')
      setQuantity(1)

      alert(`Added ${item.quantity} x ${item.name} (${item.size || 'No size'}) to cart!`)
    }

    return React.createElement(
      'div',
      {
        style: {
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--cr-space-4)',
        },
      },
      [
        React.createElement(
          'div',
          {
            key: 'cart-status',
            style: {
              padding: 'var(--cr-space-3)',
              backgroundColor: 'var(--cr-secondary-100)',
              borderRadius: 'var(--cr-space-1)',
              textAlign: 'center',
            },
          },
          `Cart Items: ${cartItems.length} | Selected Size: ${selectedSize || 'None'} | Quantity: ${quantity}`
        ),

        React.createElement(CrStoreItem, {
          key: 'store-item',
          name: 'CHIRP Radio T-Shirt',
          price: 25.0,
          description:
            'Interactive example with controlled state management. Select size and quantity, then add to cart to see state updates.',
          image:
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
          itemType: 'Apparel',
          sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
          sizeLabel: 'T-Shirt Size',
          quantityLabel: 'How Many?',
          maxQuantity: 5,
          selectedSize: selectedSize,
          quantity: quantity,
          onSizeChange: setSelectedSize,
          onQuantityChange: setQuantity,
          onAddToCart: handleAddToCart,
        }),
      ]
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive store item with controlled state management. Demonstrates size/quantity selection and cart functionality with state updates.',
      },
    },
  },
}
