// src/pages/DonatePage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrDonateForm from '../stories/CrDonateForm'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCard from '../stories/CrCard'

const DonatePage: React.FC = () => {
  return (
    <div className="donate-page">
      <section className="donate-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="donate-content">
        <div className="donate-left">
          <CrDonateForm />
          <div className="donate-general-content">
            <p>General content</p>
          </div>
        </div>

        <div className="donate-right">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </div>
    </div>
  )
}

export default DonatePage
