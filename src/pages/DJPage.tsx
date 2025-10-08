// src/pages/DJPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjOverview from '../stories/CrDjOverview'
import CrCard from '../stories/CrCard'

const DJPage: React.FC = () => {
  return (
    <div className="dj-page">
      <section className="dj-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="dj-header-row">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
        <CrPageHeader showEyebrow={false} showActionButton={true} />
      </div>

      <div className="dj-content">
        <div className="dj-left">
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

        <div className="dj-middle">
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

        <div className="dj-right">
          <CrCard variant="narrow" />
          <CrCard variant="narrow" />
          <CrPageHeader showEyebrow={false} showActionButton={true} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </div>

      <section className="dj-footer">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
        <div className="dj-footer-grid">
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
