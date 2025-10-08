// src/pages/EventDetailPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'

const EventDetailPage: React.FC = () => {
  return (
    <div className="event-detail-page">
      <section className="page-container">
        <CrBreadcrumb />
      </section>

      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-s100"
          />
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
