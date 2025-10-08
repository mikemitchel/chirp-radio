// src/pages/DJDetailPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrPreviousShows from '../stories/CrPreviousShows'
import CrAnnouncement from '../stories/CrAnnouncement'

const DJDetailPage: React.FC = () => {
  return (
    <div className="dj-detail-page">
      <section className="page-container">
        <CrBreadcrumb />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrPageHeader showEyebrow={true} showActionButton={false} />
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="none"
          />
          <CrPreviousShows />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </div>

      <section className="dj-detail-announcement">
        <CrAnnouncement
          variant="motivation"
          textureBackground="cr-bg-natural-d100"
        />
      </section>
    </div>
  )
}

export default DJDetailPage
