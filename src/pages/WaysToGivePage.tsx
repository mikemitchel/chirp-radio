// src/pages/WaysToGivePage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrDonateForm from '../stories/CrDonateForm'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import '../styles/ways-to-give-page.css'

const WaysToGivePage: React.FC = () => {
  return (
    <div className="ways-to-give-page">
      <section className="ways-to-give-breadcrumb">
        <CrBreadcrumb />
      </section>

      <div className="ways-to-give-content">
        <div className="ways-to-give-left">
          <CrPageHeader showEyebrow={false} showActionButton={false} />
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
          <div className="ways-to-give-cards-grid">
            <CrCard variant="small" />
            <CrCard variant="small" />
            <CrCard variant="small" />
          </div>
          <div className="ways-to-give-cards-grid">
            <CrCard variant="small" />
            <CrCard variant="small" />
            <CrCard variant="small" />
          </div>
          <CrDonateForm variant="vinyl circle promo" />
        </div>

        <div className="ways-to-give-right">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-br-natural-d100"
          />
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default WaysToGivePage
