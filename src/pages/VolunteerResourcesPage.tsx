// src/pages/VolunteerResourcesPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'

const VolunteerResourcesPage: React.FC = () => {
  return (
    <div className="volunteer-resources-page">
      <section className="volunteer-resources-breadcrumb">
        <CrBreadcrumb />
      </section>

      <section className="volunteer-resources-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <section className="volunteer-resources-intro">
        <CrCard
          variant="article"
          imagePosition="none"
        />
      </section>

      <section className="volunteer-resources-content">
        <div className="volunteer-resources-general-content">
          <p>General Content - 3 column layout</p>
        </div>
      </section>
    </div>
  )
}

export default VolunteerResourcesPage
