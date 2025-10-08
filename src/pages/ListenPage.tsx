// src/pages/ListenPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrList from '../stories/CrList'

const ListenPage: React.FC = () => {
  return (
    <div className="listen-page">
      <section className="listen-header-main">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <section className="listen-header-sub">
        <CrPageHeader showEyebrow={false} showActionButton={true} />
      </section>

      <div className="listen-content">
        <div className="listen-left">
          <CrPlaylistTable showHeader={true} groupByHour={true} />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
        </div>

        <div className="listen-right">
          <CrPlaylistTable showHeader={false} groupByHour={false} />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-s100"
          />
          <CrList />
        </div>
      </div>

      <section className="listen-lists">
        <CrList />
        <CrList />
      </section>
    </div>
  )
}

export default ListenPage
