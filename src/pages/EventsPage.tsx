// src/pages/EventsPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrButton from '../stories/CrButton'

const EventsPage: React.FC = () => {
  return (
    <div className="events-page">
      <section className="events-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="events-content">
        <div className="events-left">
          <CrCard variant="default" />
          <div className="events-grid-2col">
            <CrCard variant="default" />
            <CrCard variant="default" />
          </div>
          <div className="events-grid-2col">
            <CrCard variant="default" />
            <CrCard variant="default" />
          </div>
          <section className="events-announcement">
            <CrAnnouncement
              variant="motivation"
              textureBackground="cr-bg-natural-d100"
            />
          </section>
          <div className="events-grid-3col">
            <CrCard variant="default" />
            <CrCard variant="default" />
            <CrCard variant="default" />
          </div>
          <div className="events-grid-3col">
            <CrCard variant="default" />
            <CrCard variant="default" />
            <CrCard variant="default" />
          </div>
          <div className="events-pagination">
            <CrButton showLeftIcon={true} size="small" variant="text">
              Previous
            </CrButton>
            <CrButton showRightIcon={true} size="small" variant="text">
              Next
            </CrButton>
          </div>
        </div>

        <div className="events-right">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-s100"
          />
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default EventsPage
