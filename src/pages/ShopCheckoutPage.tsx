// src/pages/ShopCheckoutPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrShoppingCart from '../stories/CrShoppingCart'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import '../styles/shop-checkout-page.css'

const ShopCheckoutPage: React.FC = () => {
  return (
    <div className="shop-checkout-page">
      <section className="shop-checkout-breadcrumb">
        <CrBreadcrumb />
      </section>

      <section className="shop-checkout-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="shop-checkout-content">
        <div className="shop-checkout-left">
          <div className="shop-checkout-form">
            <p>Form fields - PayPal integration</p>
          </div>
        </div>

        <div className="shop-checkout-right">
          <CrShoppingCart />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default ShopCheckoutPage
