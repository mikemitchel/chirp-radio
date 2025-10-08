// src/pages/ShopDetailPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrStoreItem from '../stories/CrStoreItem'
import CrShoppingCart from '../stories/CrShoppingCart'
import CrPlaylistTable from '../stories/CrPlaylistTable'

const ShopDetailPage: React.FC = () => {
  return (
    <div className="shop-detail-page">
      <section className="page-container">
        <CrBreadcrumb />
      </section>

      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrStoreItem />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrShoppingCart />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default ShopDetailPage
