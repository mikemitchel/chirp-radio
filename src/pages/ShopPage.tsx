// src/pages/ShopPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrStoreItemCard from '../stories/CrStoreItemCard'
import CrShoppingCart from '../stories/CrShoppingCart'
import CrPlaylistTable from '../stories/CrPlaylistTable'

const ShopPage: React.FC = () => {
  return (
    <div className="shop-page">
      <section className="shop-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
        <div className="shop-filter-note">
          <p>NEED A BASIC METHOD TO FILTER STORE ITEMS<br />e.g., "Show Shirts", "Show Art" ....</p>
        </div>
      </section>

      <div className="shop-content">
        <div className="shop-left">
          <div className="shop-items-grid">
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
            <CrStoreItemCard />
          </div>
        </div>

        <div className="shop-right">
          <CrShoppingCart />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default ShopPage
