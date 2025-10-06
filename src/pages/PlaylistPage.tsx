// src/pages/PlaylistPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCard from '../stories/CrCard'
import '../styles/playlist-page.css'

const PlaylistPage: React.FC = () => {
  return (
    <div className="playlist-page">
      <section className="playlist-page-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <section className="playlist-page-header-with-button">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
      </section>

      <section className="playlist-table-section">
        <CrPlaylistTable showHeader={true} groupByHour={true} />
      </section>

      <section className="playlist-announcement">
        <CrAnnouncement
          variant="motivation"
          textureBackground="cr-br-natural-d100"
        />
      </section>

      <section className="playlist-table-section">
        <CrPlaylistTable showHeader={true} groupByHour={true} />
      </section>

      <section className="playlist-cards">
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
