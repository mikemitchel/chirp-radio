// src/pages/ShopDetailPage.tsx
import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrStoreItem from '../stories/CrStoreItem'
import CrShoppingCart from '../stories/CrShoppingCart'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import { useShopItems, usePlaylists } from '../hooks/useData'
import { useCart } from '../contexts/CartContext'

const ShopDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const item = location.state?.item

  const { data: shopItems } = useShopItems()
  const { data: playlistData } = usePlaylists()
  const { items: cartItems, addToCart, removeItem, emptyCart } = useCart()

  // Get item from URL params if not passed via state
  const shopItem = item || shopItems?.find((i) => i.id === id)

  const recentPlaylistItems =
    playlistData?.tracks?.slice(0, 10).map((track) => ({
      ...track,
      hourData: playlistData?.currentShow,
    })) || []

  if (!shopItem) {
    return (
      <div className="shop-detail-page">
        <section className="page-container">
          <p>Item not found</p>
        </section>
      </div>
    )
  }

  const handleAddToCart = (cartItem: any) => {
    addToCart({
      name: cartItem.name,
      price: cartItem.price,
      details: cartItem.size ? `Size: ${cartItem.size}` : shopItem.details,
      quantity: cartItem.quantity,
      image: cartItem.image,
      size: cartItem.size,
    })
  }

  const handleCheckout = () => {
    navigate('/shop/checkout')
  }

  return (
    <div className="shop-detail-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Store', isClickable: true, onClick: () => navigate('/shop') },
            { label: shopItem.name, isClickable: false },
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrStoreItem
            name={shopItem.name}
            price={shopItem.price}
            image={shopItem.image}
            itemType={shopItem.itemType}
            description={shopItem.description}
            sizeOptions={shopItem.sizes}
            showSizeSelection={shopItem.sizes && shopItem.sizes.length > 0}
            sizeLabel="Size"
            onAddToCart={handleAddToCart}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrShoppingCart
            items={cartItems}
            onRemoveItem={removeItem}
            onEmptyCart={emptyCart}
            onCheckout={handleCheckout}
          />
          <CrPageHeader
            title="Recently Played"
            showEyebrow={false}
            showActionButton={true}
            titleSize="md"
            titleTag="h3"
            actionButtonSize="small"
            actionButtonText="View Playlist"
          />
          <CrPlaylistTable
            items={recentPlaylistItems}
            showHeader={false}
            groupByHour={false}
            variant="default"
          />
        </div>
      </div>
    </div>
  )
}

export default ShopDetailPage
