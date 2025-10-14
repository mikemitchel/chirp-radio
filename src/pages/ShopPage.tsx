// src/pages/ShopPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrStoreItemCard from '../stories/CrStoreItemCard'
import CrShoppingCart from '../stories/CrShoppingCart'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import { useShopItems, usePlaylists } from '../hooks/useData'
import { useCart } from '../contexts/CartContext'

const ShopPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: shopItems } = useShopItems()
  const { data: playlistData } = usePlaylists()
  const { items: cartItems, removeItem, emptyCart } = useCart()

  const recentPlaylistItems =
    playlistData?.tracks?.slice(0, 10).map((track) => ({
      ...track,
      hourData: playlistData?.currentShow,
    })) || []

  const handleCheckout = () => {
    navigate('/shop/checkout')
  }

  return (
    <div className="shop-page">
      <section className="page-container">
        <CrPageHeader title="The CHIRP Store" showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-layout-main-sidebar">
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
            className="shop-recently-played-header"
          />
          <CrPlaylistTable
            items={recentPlaylistItems}
            showHeader={false}
            groupByHour={false}
            variant="default"
          />
        </div>

        <div className="page-layout-main-sidebar__main">
          <div className="shop-items-grid">
            {shopItems?.map((item) => (
              <CrStoreItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                itemType={item.itemType}
                onClick={() => {
                  navigate(`/shop/${item.id}`, { state: { item } })
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
