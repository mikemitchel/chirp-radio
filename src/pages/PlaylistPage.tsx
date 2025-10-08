// src/pages/PlaylistPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCard from '../stories/CrCard'

const PlaylistPage: React.FC = () => {
  return (
    <div className="playlist-page">
      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
      </section>

      <section className="page-container">
        <CrPlaylistTable showHeader={true} groupByHour={true} />
      </section>

      <section className="page-container">
        <CrAnnouncement
          variant="motivation"
          textureBackground="cr-bg-natural-d100"
        />
      </section>

      <section className="page-container">
        <CrPlaylistTable showHeader={true} groupByHour={true} />
      </section>

      <section className="page-container">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
        <div className="playlist-cards-grid">
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </section>
    </div>
  )
}

export default PlaylistPage
