// src/pages/DJPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjOverview from '../stories/CrDjOverview'
import CrCard from '../stories/CrCard'

const DJPage: React.FC = () => {
  return (
    <div className="dj-page">
      <section className="page-container">
        <CrPageHeader title="DJs" showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-container-row">
        <CrPageHeader title="Featured DJs" titleTag="h2" titleSize="lg" showEyebrow={false} showActionButton={true} actionButtonText="View Schedule" />
        <CrPageHeader title="Browse by Day" titleTag="h2" titleSize="lg" showEyebrow={false} showActionButton={true} actionButtonText="All DJs" />
      </div>

      <section className="page-layout-3col">
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
          <CrPageHeader title="Announcements" titleTag="h3" titleSize="md" showEyebrow={false} showActionButton={true} actionButtonText="View All" />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </section>

      <section className="page-container">
        <CrPageHeader title="All DJs" titleTag="h2" titleSize="lg" showEyebrow={false} showActionButton={true} actionButtonText="Search DJs" />
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
