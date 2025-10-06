// src/pages/VolunteerCalendarPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrCalendarEvent from '../stories/CrCalendarEvent'
import '../styles/volunteer-calendar-page.css'

const VolunteerCalendarPage: React.FC = () => {
  return (
    <div className="volunteer-calendar-page">
      <section className="volunteer-calendar-breadcrumb">
        <CrBreadcrumb />
      </section>

      <div className="volunteer-calendar-content">
        <div className="volunteer-calendar-left">
          <CrPageHeader showEyebrow={false} showActionButton={false} />
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
          <CrCalendarEvent />
        </div>

        <div className="volunteer-calendar-right">
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
