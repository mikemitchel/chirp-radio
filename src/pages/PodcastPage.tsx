// src/pages/PodcastPage.tsx
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPagination from '../stories/CrPagination'
import { usePodcasts, useAnnouncements } from '../hooks/useData'

const ITEMS_PER_PAGE = 11

const PodcastPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: allPodcasts } = usePodcasts()
  const { data: announcements } = useAnnouncements()

  // Get current page from URL, default to 0
  const currentPage = parseInt(searchParams.get('page') || '0', 10)

  const totalPages = allPodcasts ? Math.ceil(allPodcasts.length / ITEMS_PER_PAGE) : 0
  const startIndex = currentPage * ITEMS_PER_PAGE
  const podcasts = allPodcasts?.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePodcastClick = (podcast: any) => {
    navigate(`/podcasts/${podcast.slug}`)
  }

  const formatPodcastDate = (podcast: any) => {
    if (!podcast.episodes?.[0]?.publishedDate) return undefined
    return new Date(podcast.episodes[0].publishedDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
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
    <div className="podcast-page">
      <section className="page-container">
        <CrPageHeader title="Podcasts" showEyebrow={false} showActionButton={false} />
      </section>

      {/* 2/3 + 1/3 Layout - Featured Podcast */}
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          {podcasts && podcasts[0] && (
            <CrCard
              variant="default"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={podcasts[0].coverArt}
              preheader={typeof podcasts[0].category === "string" ? podcasts[0].category : podcasts[0].category?.name}
              title={podcasts[0].title}
              authorBy={`by ${podcasts[0].host}`}
              eventDate={formatPodcastDate(podcasts[0])}
              tags={podcasts[0].tags}
              contentSummary={podcasts[0].description}
              showTicketButton={false}
              onClick={() => handlePodcastClick(podcasts[0])}
            />
          )}
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

      {/* 50/50 Layout - 4 Podcasts */}
      <section className="page-layout-2col">
        <div className="page-layout-2col__column">
          {podcasts && podcasts[1] && (
            <CrCard
              variant="wide"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={podcasts[1].coverArt}
              preheader={typeof podcasts[1].category === "string" ? podcasts[1].category : podcasts[1].category?.name}
              title={podcasts[1].title}
              authorBy={`by ${podcasts[1].host}`}
              eventDate={formatPodcastDate(podcasts[1])}
              tags={podcasts[1].tags}
              contentSummary={podcasts[1].description}
              showTicketButton={false}
              showShareButton={false}
              onClick={() => handlePodcastClick(podcasts[1])}
            />
          )}
          {podcasts && podcasts[2] && (
            <CrCard
              variant="wide"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={podcasts[2].coverArt}
              preheader={typeof podcasts[2].category === "string" ? podcasts[2].category : podcasts[2].category?.name}
              title={podcasts[2].title}
              authorBy={`by ${podcasts[2].host}`}
              eventDate={formatPodcastDate(podcasts[2])}
              tags={podcasts[2].tags}
              contentSummary={podcasts[2].description}
              showTicketButton={false}
              showShareButton={false}
              onClick={() => handlePodcastClick(podcasts[2])}
            />
          )}
        </div>
        <div className="page-layout-2col__column">
          {podcasts && podcasts[3] && (
            <CrCard
              variant="wide"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={podcasts[3].coverArt}
              preheader={typeof podcasts[3].category === "string" ? podcasts[3].category : podcasts[3].category?.name}
              title={podcasts[3].title}
              authorBy={`by ${podcasts[3].host}`}
              eventDate={formatPodcastDate(podcasts[3])}
              tags={podcasts[3].tags}
              contentSummary={podcasts[3].description}
              showTicketButton={false}
              showShareButton={false}
              onClick={() => handlePodcastClick(podcasts[3])}
            />
          )}
          {podcasts && podcasts[4] && (
            <CrCard
              variant="wide"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={podcasts[4].coverArt}
              preheader={typeof podcasts[4].category === "string" ? podcasts[4].category : podcasts[4].category?.name}
              title={podcasts[4].title}
              authorBy={`by ${podcasts[4].host}`}
              eventDate={formatPodcastDate(podcasts[4])}
              tags={podcasts[4].tags}
              contentSummary={podcasts[4].description}
              showTicketButton={false}
              showShareButton={false}
              onClick={() => handlePodcastClick(podcasts[4])}
            />
          )}
        </div>
      </section>

      {/* Announcement */}
      <section className="page-section">
        <div className="page-container">
          {announcements && announcements[4] && (
            <CrAnnouncement
              variant="motivation"
              textureBackground={announcements[4].backgroundColor}
              headlineText={announcements[4].title}
              bodyText={announcements[4].message}
              showLink={!!announcements[4].ctaText}
              linkText={announcements[4].ctaText}
              linkUrl={announcements[4].ctaUrl}
              buttonCount="none"
            />
          )}
        </div>
      </section>

      {/* 1/3 + 1/3 + 1/3 Layout - 6 Podcasts */}
      <section className="page-layout-3col">
        <div className="page-layout-3col__column">
          {podcasts && podcasts[5] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={podcasts[5].coverArt}
              preheader={typeof podcasts[5].category === "string" ? podcasts[5].category : podcasts[5].category?.name}
              title={podcasts[5].title}
              authorBy={`by ${podcasts[5].host}`}
              eventDate={formatPodcastDate(podcasts[5])}
              tags={podcasts[5].tags}
              contentSummary={podcasts[5].description}
              showTicketButton={false}
              onClick={() => handlePodcastClick(podcasts[5])}
            />
          )}
          {podcasts && podcasts[6] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={podcasts[6].coverArt}
              preheader={typeof podcasts[6].category === "string" ? podcasts[6].category : podcasts[6].category?.name}
              title={podcasts[6].title}
              authorBy={`by ${podcasts[6].host}`}
              eventDate={formatPodcastDate(podcasts[6])}
              tags={podcasts[6].tags}
              contentSummary={podcasts[6].description}
              showTicketButton={false}
              onClick={() => handlePodcastClick(podcasts[6])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {podcasts && podcasts[7] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={podcasts[7].coverArt}
              preheader={typeof podcasts[7].category === "string" ? podcasts[7].category : podcasts[7].category?.name}
              title={podcasts[7].title}
              authorBy={`by ${podcasts[7].host}`}
              eventDate={formatPodcastDate(podcasts[7])}
              tags={podcasts[7].tags}
              contentSummary={podcasts[7].description}
              showTicketButton={false}
              onClick={() => handlePodcastClick(podcasts[7])}
            />
          )}
          {podcasts && podcasts[8] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={podcasts[8]?.coverArt}
              preheader={typeof podcasts[8]?.category === "string" ? podcasts[8]?.category : podcasts[8]?.category?.name}
              title={podcasts[8]?.title}
              authorBy={`by ${podcasts[8]?.host}`}
              eventDate={formatPodcastDate(podcasts[8])}
              tags={podcasts[8]?.tags}
              contentSummary={podcasts[8]?.description}
              showTicketButton={false}
              onClick={() => handlePodcastClick(podcasts[8])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {podcasts && podcasts[9] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={podcasts[9].coverArt}
              preheader={typeof podcasts[9].category === "string" ? podcasts[9].category : podcasts[9].category?.name}
              title={podcasts[9].title}
              authorBy={`by ${podcasts[9].host}`}
              eventDate={formatPodcastDate(podcasts[9])}
              tags={podcasts[9].tags}
              contentSummary={podcasts[9].description}
              showTicketButton={false}
              onClick={() => handlePodcastClick(podcasts[9])}
            />
          )}
          {podcasts && podcasts[10] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={podcasts[10].coverArt}
              preheader={typeof podcasts[10].category === "string" ? podcasts[10].category : podcasts[10].category?.name}
              title={podcasts[10].title}
              authorBy={`by ${podcasts[10].host}`}
              eventDate={formatPodcastDate(podcasts[10])}
              tags={podcasts[10].tags}
              contentSummary={podcasts[10].description}
              showTicketButton={false}
              onClick={() => handlePodcastClick(podcasts[10])}
            />
          )}
        </div>
      </section>

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

export default PodcastPage
