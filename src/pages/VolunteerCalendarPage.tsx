// src/pages/VolunteerCalendarPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrCalendarEvent from '../stories/CrCalendarEvent'

const VolunteerCalendarPage: React.FC = () => {
  return (
    <div className="volunteer-calendar-page">
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
          <CrCalendarEvent />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </div>
    </div>
  )
}

export default VolunteerCalendarPage
