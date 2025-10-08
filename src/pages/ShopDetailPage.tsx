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
      <section className="shop-detail-breadcrumb">
        <CrBreadcrumb />
      </section>

      <section className="shop-detail-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="shop-detail-content">
        <div className="shop-detail-left">
          <CrStoreItem />
        </div>

        <div className="shop-detail-right">
          <CrShoppingCart />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default ShopDetailPage
