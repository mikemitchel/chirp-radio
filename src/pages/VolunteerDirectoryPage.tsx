// src/pages/VolunteerDirectoryPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrTable from '../stories/CrTable'

const VolunteerDirectoryPage: React.FC = () => {
  return (
    <div className="volunteer-directory-page">
      <section className="volunteer-directory-breadcrumb">
        <CrBreadcrumb />
      </section>

      <section className="volunteer-directory-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <section className="volunteer-directory-intro">
        <CrCard
          variant="article"
          imagePosition="none"
        />
      </section>

      <section className="volunteer-directory-table">
        <CrTable />
      </section>
    </div>
  )
}

export default VolunteerDirectoryPage
