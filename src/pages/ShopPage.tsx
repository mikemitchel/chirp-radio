// src/pages/ShopPage.tsx
import React, { useState } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrStoreItemCard from '../stories/CrStoreItemCard'
import CrShoppingCart from '../stories/CrShoppingCart'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import { useShopItems, usePlaylists } from '../hooks/useData'

const ShopPage: React.FC = () => {
  const { data: shopItems } = useShopItems()
  const { data: playlistData } = usePlaylists()

  const recentPlaylistItems = playlistData?.tracks?.slice(0, 10).map(track => ({
    ...track,
    hourData: playlistData?.currentShow
  })) || []

  const [cartItems, setCartItems] = useState([
    {
      name: "CHIRP 20th Anniversary Poster",
      price: 20.00,
      details: "18x24 inches"
    },
    {
      name: "CHIRP Radio Classic Tee",
      price: 20.00,
      details: "Size: Medium",
      quantity: 2
    },
    {
      name: "CHIRP Baby Onesie",
      price: 15.00,
      details: "Size: 12-18 months"
    }
  ])

  const handleRemoveItem = (index: number) => {
    const newItems = [...cartItems]
    newItems.splice(index, 1)
    setCartItems(newItems)
  }

  const handleEmptyCart = () => {
    setCartItems([])
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
            onRemoveItem={handleRemoveItem}
            onEmptyCart={handleEmptyCart}
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
          <CrPlaylistTable items={recentPlaylistItems} showHeader={false} groupByHour={false} variant="default" />
        </div>

        <div className="page-layout-main-sidebar__main">
          <div className="shop-items-grid">
            {shopItems?.map(item => (
              <CrStoreItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                itemType={item.itemType}
                onClick={() => console.log('Clicked:', item.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
