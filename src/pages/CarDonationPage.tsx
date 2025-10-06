// src/pages/CarDonationPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrDonateForm from '../stories/CrDonateForm'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import '../styles/car-donation-page.css'

const CarDonationPage: React.FC = () => {
  return (
    <div className="car-donation-page">
      <section className="car-donation-breadcrumb">
        <CrBreadcrumb />
      </section>

      <div className="car-donation-content">
        <div className="car-donation-left">
          <CrPageHeader showEyebrow={false} showActionButton={false} />
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
          <div className="car-donation-general-content">
            <p>General content section for car donation information</p>
          </div>
          <CrDonateForm variant="vinyl circle promo" />
        </div>

        <div className="car-donation-right">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-br-natural-d100"
          />
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default CarDonationPage
