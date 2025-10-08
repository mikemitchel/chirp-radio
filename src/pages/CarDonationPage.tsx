// src/pages/CarDonationPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrDonateForm from '../stories/CrDonateForm'
import CrPlaylistTable from '../stories/CrPlaylistTable'

const CarDonationPage: React.FC = () => {
  return (
    <div className="car-donation-page">
      <section className="page-container">
        <CrBreadcrumb />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
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

        <div className="page-layout-main-sidebar__sidebar">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
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
