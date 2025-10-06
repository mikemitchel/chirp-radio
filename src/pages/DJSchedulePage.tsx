// src/pages/DJSchedulePage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjSchedule from '../stories/CrDjSchedule'
import CrCard from '../stories/CrCard'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'
import '../styles/dj-schedule-page.css'

const DJSchedulePage: React.FC = () => {
  return (
    <div className="dj-schedule-page">
      <section className="dj-schedule-header-main">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <section className="dj-schedule-header-sub">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
      </section>

      <section className="dj-schedule-calendar">
        <CrDjSchedule />
      </section>

      <div className="dj-schedule-grid">
        <CrPageHeader showEyebrow={false} />
        <CrPageHeader showEyebrow={false} />
        <CrPageHeader showEyebrow={false} />
      </div>

      <div className="dj-schedule-content">
        <div className="dj-schedule-left">
          <CrCard variant="narrow" />
          <CrCard variant="narrow" />
          <CrCard variant="narrow" />
        </div>

        <div className="dj-schedule-middle">
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>

        <div className="dj-schedule-right">
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-br-natural-d100"
          />
        </div>
      </div>
    </div>
  )
}

export default DJSchedulePage
