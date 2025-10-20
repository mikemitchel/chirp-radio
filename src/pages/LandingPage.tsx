// src/pages/LandingPage.tsx
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { PiCalendarDots, PiReadCvLogo, PiVinylRecord } from 'react-icons/pi'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCurrentDjCard from '../stories/CrCurrentDjCard'
import CrAdSpace from '../stories/CrAdSpace'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import HeroCarousel from '../components/HeroCarousel'
import CrRecentlyPlayed from '../components/CrRecentlyPlayed'
import {
  useFeaturedAnnouncement,
  useAnnouncements,
  useEvents,
  useArticles,
  useTracks,
  useCurrentShow,
  useScheduledDJs,
} from '../hooks/useData'
import { downloadDJShowCalendar } from '../utils/calendar'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: featuredAnnouncement } = useFeaturedAnnouncement()
  const { data: announcements } = useAnnouncements()
  const { data: events } = useEvents()
  const { data: articles } = useArticles()
  const { data: tracks } = useTracks()
  const { data: currentShow } = useCurrentShow()
  const { data: djs } = useScheduledDJs()
  const { user: loggedInUser } = useAuth()

  // Add landing-page class to body on mount, remove on unmount
  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => {
      document.body.classList.remove('landing-page')
    }
  }, [])

  // Get first non-featured active announcement for sidebar
  const sidebarAnnouncement = announcements?.find((a) => a.isActive && !a.featuredOnLanding)
  // Transform events data for hero carousel (take first 3 featured events)
  const heroSlides =
    events
      ?.filter((e) => e.featured)
      .slice(0, 3)
      .map((event) => ({
        backgroundImage: event.featuredImage,
        imageCaption: '',
        preheader: event.category,
        title: event.title,
        dateTime: new Date(event.date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
        venue: event.venue.name,
        ageRestriction: event.ageRestriction,
        contentSummary: event.description,
        bannerButtonText: event.isFree ? 'Learn More' : 'Get Tickets',
        shareButtonText: 'Share',
      })) || []

  // Transform tracks data for recently played (take first 6 from last 2 hours)
  const recentlyPlayedTracks =
    tracks?.slice(0, 6).map((track) => ({
      albumArt: track.albumArt,
      artistName: track.artistName,
      trackName: track.trackName,
      albumName: track.albumName,
      labelName: track.labelName,
      isLocal: track.isLocal,
      timeAgo: new Date(track.playedAt).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
    })) || []

  return (
    <div className="landing-page">
      {/* Top Announcement */}
      {featuredAnnouncement && (
        <section className="page-section">
          <div className="page-container">
            <CrAnnouncement
              variant={featuredAnnouncement.showDonationBar ? 'donation' : 'motivation'}
              textureBackground={featuredAnnouncement.backgroundColor}
              headlineText={featuredAnnouncement.title}
              bodyText={featuredAnnouncement.message}
              showLink={!!featuredAnnouncement.ctaText}
              linkText={featuredAnnouncement.ctaText}
              linkUrl={featuredAnnouncement.ctaUrl}
              buttonCount="none"
            />
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <HeroCarousel slides={heroSlides} />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {currentShow && (
            <CrCurrentDjCard
              djName={currentShow.djName}
              showName={currentShow.showName}
              startTime={currentShow.startTime}
              endTime={currentShow.endTime}
              djImage={currentShow.djImage}
              description={currentShow.description}
              onRequestClick={() => navigate('/request-song')}
            />
          )}

          {sidebarAnnouncement && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={sidebarAnnouncement.backgroundColor}
              headlineText={sidebarAnnouncement.title}
              bodyText={sidebarAnnouncement.message}
              showLink={!!sidebarAnnouncement.ctaText}
              linkText={sidebarAnnouncement.ctaText}
              linkUrl={sidebarAnnouncement.ctaUrl}
              buttonCount="none"
            />
          )}

          <CrAdSpace size="mobile-banner" />
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="page-section">
        <CrRecentlyPlayed
          tracks={recentlyPlayedTracks}
          djName={currentShow?.djName}
          showName={currentShow?.showName}
          startTime={currentShow?.startTime}
          endTime={currentShow?.endTime}
          djProfileUrl={currentShow?.djProfileUrl}
          onViewPlaylist={() => navigate('/playlist')}
        />
      </section>

      {/* Grid Section */}
      <section className="page-layout-3col">
        <div className="page-layout-3col__column page-layout-3col__column--container">
          <CrPageHeader
            showEyebrow={false}
            title="Events"
            actionButtonText="See More Events"
            actionButtonIcon={<PiCalendarDots />}
            onActionClick={() => navigate('/events')}
          />
          {events?.slice(0, 3).map((event) => (
            <CrCard
              key={event.id}
              variant="narrow"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              backgroundImage={event.featuredImage}
              preheader={event.category}
              title={event.title}
              dateTime={new Date(event.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={event.venue.name}
              ageRestriction={event.ageRestriction}
              contentSummary={event.description}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--bg page-layout-3col__column--articles">
          <CrPageHeader
            showEyebrow={false}
            title="Articles"
            actionButtonText="View More Articles"
            actionButtonIcon={<PiReadCvLogo />}
            onActionClick={() => navigate('/articles')}
          />
          {articles?.slice(0, 6).map((article) => (
            <CrCard
              key={article.id}
              variant="small"
              type="article"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              bannerBackgroundColor="none"
              backgroundImage={article.featuredImage}
              preheader={article.category}
              title={article.title}
              contentSummary={article.excerpt}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--large-gap">
          <CrPageHeader
            showEyebrow={false}
            title="Our DJs"
            showActionButton={true}
            actionButtonText="Review the DJ Schedule"
            actionButtonIcon={<PiVinylRecord />}
            onActionClick={() => navigate('/schedule')}
          />
          {djs?.slice(0, 10).map((dj) => (
            <CrDjOverview
              key={dj.id}
              size="medium"
              djName={dj.djName}
              showTime={dj.showTime}
              showContent={false}
              buttonText="Profile"
              imageSrc={dj.imageSrc}
              isFavorite={loggedInUser?.favoriteDJs?.includes(dj.id)}
              onMoreClick={() => navigate(`/djs/${dj.id}`)}
              onAddToCalendarClick={() =>
                downloadDJShowCalendar({
                  djName: dj.djName,
                  showName: dj.showName,
                  showTime: dj.showTime,
                })
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default LandingPage
