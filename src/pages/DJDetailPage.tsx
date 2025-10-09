// src/pages/DJDetailPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrPreviousShows from '../stories/CrPreviousShows'
import CrAnnouncement from '../stories/CrAnnouncement'

const DJDetailPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="dj-detail-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'DJs', isClickable: true, onClick: () => navigate('/djs') },
            { label: 'DJ Name', isClickable: false }
          ]}
        />
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
          <CrPageHeader title="Quick Links" titleTag="h3" titleSize="md" showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </div>

      <section className="page-section">
        <div className="page-container">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
        </div>
      </section>
    </div>
  )
}

export default DJDetailPage
