// src/pages/ThankYouPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCard from '../stories/CrCard'
import CrPlaylistTable from '../stories/CrPlaylistTable'

const ThankYouPage: React.FC = () => {
  return (
    <div className="thank-you-page">
      <section className="thank-you-breadcrumb">
        <CrBreadcrumb />
      </section>

      <section className="thank-you-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="thank-you-content">
        <div className="thank-you-left">
          <div className="thank-you-general-content">
            <p>General content</p>
          </div>
          <div className="thank-you-sections">
            <CrPageHeader showEyebrow={false} />
            <CrCard variant="narrow" />
            <CrCard variant="narrow" />
          </div>
          <div className="thank-you-sections">
            <CrPageHeader showEyebrow={false} />
            <CrCard variant="narrow" />
          </div>
        </div>

        <div className="thank-you-right">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage
