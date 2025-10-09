// src/pages/VinylCirclePage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrDonateForm from '../stories/CrDonateForm'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import { useAnnouncements } from '../hooks/useData'

const VinylCirclePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: announcements } = useAnnouncements()

  const handleSwitchToDefault = () => {
    navigate('/donate')
  }

  return (
    <div className="vinyl-circle-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Ways to Give', isClickable: true, onClick: () => navigate('/ways-to-give') },
            { label: 'Vinyl Circle', isClickable: false }
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrDonateForm
            variant="vinylCircle"
            onSwitchToDefault={handleSwitchToDefault}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[5] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[5].backgroundColor}
              headlineText={announcements[5].title}
              bodyText={announcements[5].message}
              showLink={!!announcements[5].ctaText}
              linkText={announcements[5].ctaText}
              linkUrl={announcements[5].ctaUrl}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default VinylCirclePage
