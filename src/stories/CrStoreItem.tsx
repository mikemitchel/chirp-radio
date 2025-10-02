// CrStoreItem.tsx
import React, { useState } from 'react'
import CrButton from './CrButton'
import CrChip from './CrChip'
import './CrStoreItem.css'

interface CrStoreItemProps {
  name?: string
  price?: number
  description?: string
  image?: string
  itemType?: string
  sizeOptions?: string[]
  sizeLabel?: string
  quantityLabel?: string
  maxQuantity?: number
  onAddToCart?: (item: any) => void
  selectedSize?: string
  quantity?: number
  onSizeChange?: (size: string) => void
  onQuantityChange?: (quantity: number) => void
  className?: string
}

export default function CrStoreItem({
  // Product data
  name = 'Item Name',
  price = 25.0,
  description = 'Standard and fitted styles available. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod.',
  image = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
  itemType = 'Item Type',

  // Form options
  sizeOptions = ['S', 'M', 'L', 'XL'],
  sizeLabel = 'T-Shirt Size',
  quantityLabel = 'How Many?',
  maxQuantity = 10,

  // Event handlers
  onAddToCart,

  // Form state (controlled)
  selectedSize,
  quantity = 1,
  onSizeChange,
  onQuantityChange,

  className = '',
}: CrStoreItemProps) {
  // Internal state for uncontrolled usage
  const [internalSize, setInternalSize] = useState(selectedSize || '')
  const [internalQuantity, setInternalQuantity] = useState(quantity)

  // Use controlled values if provided, otherwise use internal state
  const currentSize = selectedSize !== undefined ? selectedSize : internalSize
  const currentQuantity = quantity !== undefined ? quantity : internalQuantity

  const handleSizeChange = (newSize) => {
    if (onSizeChange) {
      onSizeChange(newSize)
    } else {
      setInternalSize(newSize)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (onQuantityChange) {
      onQuantityChange(newQuantity)
    } else {
      setInternalQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        name,
        price,
        size: currentSize,
        quantity: currentQuantity,
        itemType,
        image,
      })
    }
  }

  return (
    <div className={`cr-store-item ${className}`}>
      {/* Product Image */}
      <div className="cr-store-item__image-container">
        <img src={image} alt={name} className="cr-store-item__image" />
      </div>

      {/* Product Details */}
      <div className="cr-store-item__details">
        {/* Product Header */}
        <div className="cr-store-item__header">
          <div className="cr-store-item__title-section">
            <h2 className="cr-store-item__name">{name}</h2>
            <div className="cr-store-item__price-chip-row">
              <span className="cr-store-item__price">${price.toFixed(2)}</span>
              <CrChip variant="light" size="medium">
                {itemType}
              </CrChip>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <p className="cr-store-item__description">{description}</p>

        {/* Product Form */}
        <form className="cr-store-item__form" onSubmit={(e) => e.preventDefault()}>
          {/* Size Selection */}
          {sizeOptions && sizeOptions.length > 0 && (
            <div className="form-group">
              <label className="form-label">{sizeLabel}</label>
              <select
                value={currentSize}
                onChange={(e) => handleSizeChange(e.target.value)}
                className="cr-store-item__select"
              >
                <option value="">Select size...</option>
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="form-group">
            <label className="form-label">{quantityLabel}</label>
            <select
              value={currentQuantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
              className="cr-store-item__select"
            >
              {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Add to Cart Button */}
        <div className="cr-store-item__actions">
          <CrButton size="large" variant="solid" color="default" onClick={handleAddToCart}>
            Add to Cart
          </CrButton>
        </div>
      </div>
    </div>
  )
}
