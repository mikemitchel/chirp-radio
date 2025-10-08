// src/pages/DJSchedulePage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjSchedule from '../stories/CrDjSchedule'
import CrCard from '../stories/CrCard'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'

const DJSchedulePage: React.FC = () => {
  return (
    <div className="dj-schedule-page">
      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
      </section>

      <section className="page-container">
        <CrDjSchedule />
      </section>

      <div className="page-layout-3col">
        <CrPageHeader showEyebrow={false} />
        <CrPageHeader showEyebrow={false} />
        <CrPageHeader showEyebrow={false} />
      </div>

      <div className="page-layout-3col">
        <div className="page-layout-3col__column">
          <CrCard variant="narrow" />
          <CrCard variant="narrow" />
          <CrCard variant="narrow" />
        </div>

        <div className="page-layout-3col__column">
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>

        <div className="page-layout-3col__column">
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
        </div>
      </div>
    </div>
  )
}

export default DJSchedulePage
