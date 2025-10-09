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
        <CrPageHeader title="Playlist Archive" showEyebrow={false} showActionButton={false} />
      </section>

      <section className="page-container">
        <CrPageHeader title="Current Playlist" titleTag="h2" titleSize="lg" showEyebrow={false} showActionButton={true} actionButtonText="Download Playlist" />
      </section>

      <section className="page-container">
        <CrPlaylistTable showHeader={true} groupByHour={true} />
      </section>

      <section className="page-section">
        <div className="page-container">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
        </div>
      </section>

      <section className="page-container">
        <CrPlaylistTable showHeader={true} groupByHour={true} />
      </section>

      <section className="page-container">
        <CrPageHeader title="Popular Playlists" titleTag="h2" titleSize="lg" showEyebrow={false} showActionButton={true} actionButtonText="View All" />
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
