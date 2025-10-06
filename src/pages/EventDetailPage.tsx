// src/pages/EventDetailPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import '../styles/event-detail-page.css'

const EventDetailPage: React.FC = () => {
  return (
    <div className="event-detail-page">
      <section className="event-detail-breadcrumb">
        <CrBreadcrumb />
      </section>

      <section className="event-detail-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="event-detail-content">
        <div className="event-detail-left">
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
        </div>

        <div className="event-detail-right">
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-br-natural-s100"
          />
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
