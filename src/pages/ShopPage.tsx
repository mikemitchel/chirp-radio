// src/pages/ShopPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrStoreItemCard from '../stories/CrStoreItemCard'
import CrShoppingCart from '../stories/CrShoppingCart'
import CrPlaylistTable from '../stories/CrPlaylistTable'

const ShopPage: React.FC = () => {
  return (
    <div className="shop-page">
      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
        <div className="shop-filter-note">
          <p>NEED A BASIC METHOD TO FILTER STORE ITEMS<br />e.g., "Show Shirts", "Show Art" ....</p>
        </div>
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
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

        <div className="page-layout-main-sidebar__sidebar">
          <CrShoppingCart />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default ShopPage
