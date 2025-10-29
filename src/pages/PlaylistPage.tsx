// src/pages/PlaylistPage.tsx
import React, { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCard from '../stories/CrCard'
import CrPagination from '../stories/CrPagination'
import { useTracks, useArticles } from '../hooks/useData'
import announcementsData from '../data/announcements.json'

const HOURS_PER_PAGE = 4

const PlaylistPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: tracks } = useTracks()
  const { data: articles } = useArticles()

  // Get current page from URL, default to 0
  const currentPage = parseInt(searchParams.get('page') || '0', 10)

  // Select random announcement on mount
  const randomAnnouncement = useMemo(() => {
    const activeAnnouncements = announcementsData.announcements.filter(a => a.isActive)
    if (activeAnnouncements.length === 0) return announcementsData.announcements[0]
    return activeAnnouncements[Math.floor(Math.random() * activeAnnouncements.length)]
  }, [])

  // Format tracks with hour data for grouping
  const formattedTracks =
    tracks?.map((track) => {
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
          minute: '2-digit',
        }),
        hourData: {
          startTime,
          endTime,
          djName: track.djName || 'Unknown DJ',
          djProfileUrl: track.djImage,
          showName: track.showName || 'Unknown Show',
        },
      }
    }) || []

  // Group tracks by hour and paginate - split into first 2 hours and last 2 hours
  const { firstTwoHours, lastTwoHours, totalPages } = useMemo(() => {
    if (!formattedTracks.length) return { firstTwoHours: [], lastTwoHours: [], totalPages: 0 }

    // First, sort to find unique hours (most recent first)
    const tracksSortedByTime = [...formattedTracks].sort(
      (a, b) => new Date(b.playedAt || 0).getTime() - new Date(a.playedAt || 0).getTime()
    )

    // Get unique hours in order (most recent hours first)
    const uniqueHours: string[] = []
    tracksSortedByTime.forEach((track) => {
      if (!uniqueHours.includes(track.hourKey)) {
        uniqueHours.push(track.hourKey)
      }
    })

    // Calculate pagination based on hours
    const pages = Math.ceil(uniqueHours.length / HOURS_PER_PAGE)
    const startIndex = currentPage * HOURS_PER_PAGE
    const endIndex = startIndex + HOURS_PER_PAGE

    // Get the hours for the current page
    const currentPageHours = uniqueHours.slice(startIndex, endIndex)

    // Split into first 2 hours and last 2 hours
    const firstTwoPageHours = currentPageHours.slice(0, 2)
    const lastTwoPageHours = currentPageHours.slice(2, 4)

    // Get tracks for first 2 hours
    const tracksForFirstTwo = formattedTracks
      .filter((track) => firstTwoPageHours.includes(track.hourKey))
      .sort((a, b) => new Date(b.playedAt || 0).getTime() - new Date(a.playedAt || 0).getTime())

    // Get tracks for last 2 hours
    const tracksForLastTwo = formattedTracks
      .filter((track) => lastTwoPageHours.includes(track.hourKey))
      .sort((a, b) => new Date(b.playedAt || 0).getTime() - new Date(a.playedAt || 0).getTime())

    return {
      firstTwoHours: tracksForFirstTwo,
      lastTwoHours: tracksForLastTwo,
      totalPages: pages,
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
        <CrBreadcrumb
          items={[
            { label: 'Listen', isClickable: true, onClick: () => navigate('/listen') },
            { label: 'Playlist', isClickable: false }
          ]}
        />
      </section>

      <section className="page-container">
        <CrPageHeader
          title="Playlist"
          showEyebrow={false}
          showActionButton={false}
        />
      </section>

      {/* First 2 hours */}
      {firstTwoHours.length > 0 && (
        <section className="page-container">
          <CrPlaylistTable
            items={firstTwoHours}
            showHeader={true}
            groupByHour={true}
          />
        </section>
      )}

      {/* Announcement */}
      <section className="page-section">
        <div className="page-container">
          <CrAnnouncement
            variant="motivation"
            textureBackground={randomAnnouncement.backgroundColor || "cr-bg-natural-d100"}
            headlineText={randomAnnouncement.title}
            bodyText={randomAnnouncement.message}
            showLink={!!randomAnnouncement.ctaText}
            linkText={randomAnnouncement.ctaText || undefined}
            linkUrl={randomAnnouncement.ctaUrl || undefined}
            buttonCount="none"
          />
        </div>
      </section>

      {/* Last 2 hours */}
      {lastTwoHours.length > 0 && (
        <section className="page-container">
          <CrPlaylistTable
            items={lastTwoHours}
            showHeader={false}
            groupByHour={true}
          />
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

      {/* Three article cards in 1/3 1/3 1/3 layout */}
      <section className="page-container">
        <CrPageHeader
          title="Recent Articles"
          titleTag="h2"
          titleSize="lg"
          showEyebrow={false}
          showActionButton={true}
          actionButtonText="View All"
        />
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
              preheader={typeof articles[0].category === "string" ? articles[0].category : articles[0].category?.name}
              title={articles[0].title}
              authorBy={`by ${articles[0].author}`}
              eventDate={new Date(articles[0].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
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
              preheader={typeof articles[1].category === "string" ? articles[1].category : articles[1].category?.name}
              title={articles[1].title}
              authorBy={`by ${articles[1].author}`}
              eventDate={new Date(articles[1].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
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
              preheader={typeof articles[2].category === "string" ? articles[2].category : articles[2].category?.name}
              title={articles[2].title}
              authorBy={`by ${articles[2].author}`}
              eventDate={new Date(articles[2].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              tags={articles[2].tags}
              onClick={() => handleArticleClick(articles[2])}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default PlaylistPage
