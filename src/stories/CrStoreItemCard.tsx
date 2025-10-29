// CrStoreItemCard.tsx
import CrChip from './CrChip'
import './CrStoreItemCard.css'

interface CrStoreItemCardProps {
  name?: string
  price?: number
  image?: string
  itemType?: string
  onClick?: (item: any) => void
  className?: string
}

export default function CrStoreItemCard({
  // Product data
  name = 'Item Name',
  price = 25.0,
  image = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
  itemType = 'Item Type',

  // Event handlers
  onClick,

  className = '',
}: CrStoreItemCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick({
        name,
        price,
        image,
        itemType,
      })
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className={`cr-store-item-card ${className} ${onClick ? 'cr-store-item-card--clickable' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `View details for ${name}` : undefined}
    >
      {/* Product Image */}
      <div className="cr-store-item-card__image-container">
        <img src={image} alt={name} className="cr-store-item-card__image" />
      </div>

      {/* Product Details */}
      <div className="cr-store-item-card__details">
        {/* Product Name */}
        <h3 className="cr-store-item-card__name">{name}</h3>

        {/* Price and Type Row */}
        <div className="cr-store-item-card__price-chip-row">
          <span className="cr-store-item-card__price">${price.toFixed(2)}</span>
          <CrChip variant="light" size="medium">
            {itemType}
          </CrChip>
        </div>
      </div>
    </div>
  )
}
