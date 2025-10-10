// src/pages/PlaylistPage.tsx
import React, { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCard from '../stories/CrCard'
import CrPagination from '../stories/CrPagination'
import { useTracks, useCurrentShow, useArticles } from '../hooks/useData'

const HOURS_PER_PAGE = 4

const PlaylistPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: tracks } = useTracks()
  const { data: currentShow } = useCurrentShow()
  const { data: articles } = useArticles()

  // Get current page from URL, default to 0
  const currentPage = parseInt(searchParams.get('page') || '0', 10)

  // Format tracks with hour data for grouping
  const formattedTracks = tracks?.map(track => {
    // Parse the hourKey to determine start/end times
    const hourMatch = track.hourKey?.match(/(\d+)(am|pm)/i)
    let startTime = '12:00am'
    let endTime = '1:00am'

    if (hourMatch) {
      const hour = parseInt(hourMatch[1])
      const period = hourMatch[2].toLowerCase()
      startTime = `${hour}:00${period}`

      // Calculate end time (next hour)
      if (hour === 12) {
        endTime = period === 'am' ? '1:00am' : '1:00pm'
      } else if (hour === 11) {
        endTime = period === 'am' ? '12:00pm' : '12:00am'
      } else {
        endTime = `${hour + 1}:00${period}`
      }
    }

    return {
      ...track,
      timeAgo: new Date(track.playedAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      }),
      hourData: {
        startTime,
        endTime,
        djName: track.djName || 'Unknown DJ',
        djProfileUrl: track.djImage,
        showName: track.showName || 'Unknown Show',
      }
    }
  }) || []

  // Group tracks by hour and paginate
  const { hourlyTracks, totalPages } = useMemo(() => {
    if (!formattedTracks.length) return { hourlyTracks: [], totalPages: 0 }

    // Get unique hours from tracks (sorted by playedAt time, most recent first)
    const tracksByHour = new Map<string, typeof formattedTracks>()

    formattedTracks
      .sort((a, b) => new Date(b.playedAt || 0).getTime() - new Date(a.playedAt || 0).getTime())
      .forEach(track => {
        const hourKey = track.hourKey
        if (!tracksByHour.has(hourKey)) {
          tracksByHour.set(hourKey, [])
        }
        tracksByHour.get(hourKey)!.push(track)
      })

    // Convert to array of [hourKey, tracks[]] and sort by most recent track in each hour
    const hourGroups = Array.from(tracksByHour.entries())
      .sort((a, b) => {
        // Sort hour groups by the most recent track in each group
        const aTime = new Date(a[1][0]?.playedAt || 0).getTime()
        const bTime = new Date(b[1][0]?.playedAt || 0).getTime()
        return bTime - aTime
      })

    // Calculate pagination
    const pages = Math.ceil(hourGroups.length / HOURS_PER_PAGE)
    const startIndex = currentPage * HOURS_PER_PAGE
    const endIndex = startIndex + HOURS_PER_PAGE

    // Get tracks for current page's hours (4 hour sections)
    const currentHourGroups = hourGroups.slice(startIndex, endIndex)

    return {
      hourlyTracks: currentHourGroups.map(([_, tracks]) => tracks),
      totalPages: pages
    }
  }, [formattedTracks, currentPage])

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handlePageChange = (page: number) => {
    if (page === 0) {
      setSearchParams({})
    } else {
      setSearchParams({ page: String(page) })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="playlist-page">
      <section className="page-container">
        <CrPageHeader title="Playlist Archive" showEyebrow={false} showActionButton={false} />
      </section>

      <section className="page-container">
        <CrPageHeader title="Current Playlist" titleTag="h2" titleSize="lg" showEyebrow={false} showActionButton={true} actionButtonText="Download Playlist" />
      </section>

      {/* First 2 hours of playlist */}
      {hourlyTracks[0] && hourlyTracks[1] && (
        <section className="page-container">
          <CrPlaylistTable items={[...hourlyTracks[0], ...hourlyTracks[1]]} showHeader={true} groupByHour={true} />
        </section>
      )}

      {/* Announcement */}
      <section className="page-section">
        <div className="page-container">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
        </div>
      </section>

      {/* Third hour of playlist */}
      {hourlyTracks[2] && (
        <section className="page-container">
          <CrPlaylistTable items={hourlyTracks[2]} showHeader={true} groupByHour={true} />
        </section>
      )}

      {/* Three article cards in 1/3 1/3 1/3 layout */}
      <section className="page-container">
        <CrPageHeader title="Recent Articles" titleTag="h2" titleSize="lg" showEyebrow={false} showActionButton={true} actionButtonText="View All" />
      </section>

      <section className="page-layout-3col">
        <div className="page-layout-3col__column">
          {articles && articles[0] && (
            <CrCard
              variant="small"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={articles[0].featuredImage}
              preheader={articles[0].category}
              title={articles[0].title}
              authorBy={`by ${articles[0].author.name}`}
              eventDate={new Date(articles[0].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              tags={articles[0].tags}
              onClick={() => handleArticleClick(articles[0])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {articles && articles[1] && (
            <CrCard
              variant="small"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={articles[1].featuredImage}
              preheader={articles[1].category}
              title={articles[1].title}
              authorBy={`by ${articles[1].author.name}`}
              eventDate={new Date(articles[1].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              tags={articles[1].tags}
              onClick={() => handleArticleClick(articles[1])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {articles && articles[2] && (
            <CrCard
              variant="small"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={articles[2].featuredImage}
              preheader={articles[2].category}
              title={articles[2].title}
              authorBy={`by ${articles[2].author.name}`}
              eventDate={new Date(articles[2].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              tags={articles[2].tags}
              onClick={() => handleArticleClick(articles[2])}
            />
          )}
        </div>
      </section>

      {/* Fourth hour of playlist */}
      {hourlyTracks[3] && (
        <section className="page-container">
          <CrPlaylistTable items={hourlyTracks[3]} showHeader={true} groupByHour={true} />
        </section>
      )}

      {/* Pagination */}
      <section className="page-section">
        <div className="page-container">
          <CrPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  )
}

export default PlaylistPage
