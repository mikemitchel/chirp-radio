// src/pages/DJPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjOverview from '../stories/CrDjOverview'
import CrCard from '../stories/CrCard'

const DJPage: React.FC = () => {
  return (
    <div className="dj-page">
      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-container-row">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
        <CrPageHeader showEyebrow={false} showActionButton={true} />
      </div>

      <div className="page-layout-3col">
        <div className="page-layout-3col__column">
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
        </div>

        <div className="page-layout-3col__column">
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
        </div>

        <div className="page-layout-3col__column">
          <CrCard variant="narrow" />
          <CrCard variant="narrow" />
          <CrPageHeader showEyebrow={false} showActionButton={true} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </div>

      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
        <div className="page-container-grid">
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
          <CrDjOverview small />
        </div>
      </section>
    </div>
  )
}

export default DJPage
