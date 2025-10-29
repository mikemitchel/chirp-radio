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
  useSiteSettings,
} from '../hooks/useData'
import { getEventImageUrl, getEventCategoryName, getEventVenueName, getEventAgeRestriction } from '../utils/typeHelpers'
import { useAuth } from '../hooks/useAuth'
import { downloadDJShowCalendar } from '../utils/calendar'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: siteSettings } = useSiteSettings()
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

  // Get configured announcements and advertisement from Site Settings
  const topAnnouncementId =
    typeof siteSettings?.topAnnouncement === 'string'
      ? siteSettings.topAnnouncement
      : typeof siteSettings?.topAnnouncement === 'object' && siteSettings.topAnnouncement !== null && 'id' in siteSettings.topAnnouncement
      ? siteSettings.topAnnouncement.id
      : undefined
  const sidebarAnnouncementId =
    typeof siteSettings?.sidebarAnnouncement === 'string'
      ? siteSettings.sidebarAnnouncement
      : typeof siteSettings?.sidebarAnnouncement === 'object' && siteSettings.sidebarAnnouncement !== null && 'id' in siteSettings.sidebarAnnouncement
      ? siteSettings.sidebarAnnouncement.id
      : undefined

  // Get announcements by ID or fallback to first active
  const displayTopAnnouncement =
    (siteSettings?.showTopAnnouncement !== false &&
      (topAnnouncementId
        ? announcements?.find((a) => a.id === topAnnouncementId)
        : featuredAnnouncement)) ||
    null

  const displaySidebarAnnouncement = sidebarAnnouncementId
    ? announcements?.find((a) => a.id === sidebarAnnouncementId)
    : announcements?.find((a) => a.isActive && !a.featuredOnLanding)

  const sidebarAdvertisement = siteSettings?.sidebarAdvertisement
  // Transform events data for hero carousel (take first 3 featured events)
  const heroSlides =
    events
      ?.filter((e) => e.featured)
      .slice(0, 3)
      .map((event) => ({
        backgroundImage: getEventImageUrl(event) || '',
        imageCaption: '',
        preheader: getEventCategoryName(event),
        title: event.title,
        dateTime: new Date(event.date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
        venue: getEventVenueName(event),
        ageRestriction: getEventAgeRestriction(event),
        contentSummary: event.excerpt,
        bannerButtonText: event.isFree ? 'Learn More' : 'Get Tickets',
        shareButtonText: 'Share',
        slug: event.slug,
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
      {displayTopAnnouncement && (
        <section className="page-section">
          <div className="page-container">
            <CrAnnouncement
              variant={displayTopAnnouncement.variant}
              textureBackground={displayTopAnnouncement.textureBackground}
              headlineText={displayTopAnnouncement.headlineText}
              bodyText={typeof displayTopAnnouncement.bodyText === 'string' ? displayTopAnnouncement.bodyText : undefined}
              showLink={displayTopAnnouncement.showLink}
              linkText={displayTopAnnouncement.linkText}
              linkUrl={displayTopAnnouncement.linkUrl}
              buttonCount={displayTopAnnouncement.buttonCount}
              button1Text={displayTopAnnouncement.button1Text}
              button1Icon={displayTopAnnouncement.button1Icon}
              button2Text={displayTopAnnouncement.button2Text}
              button2Icon={displayTopAnnouncement.button2Icon}
              currentAmount={displayTopAnnouncement.currentAmount}
              targetAmount={displayTopAnnouncement.targetAmount}
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
              statusText={`${currentShow.startTime} — ${currentShow.endTime}`}
              djImage={currentShow.djImage}
              description={currentShow.description}
              onRequestClick={() => navigate('/request-song')}
            />
          )}

          {displaySidebarAnnouncement && (
            <CrAnnouncement
              variant={displaySidebarAnnouncement.variant}
              widthVariant="third"
              textureBackground={displaySidebarAnnouncement.textureBackground}
              headlineText={displaySidebarAnnouncement.headlineText}
              bodyText={typeof displaySidebarAnnouncement.bodyText === 'string' ? displaySidebarAnnouncement.bodyText : undefined}
              showLink={displaySidebarAnnouncement.showLink}
              linkText={displaySidebarAnnouncement.linkText}
              linkUrl={displaySidebarAnnouncement.linkUrl}
              buttonCount={displaySidebarAnnouncement.buttonCount}
              button1Text={displaySidebarAnnouncement.button1Text}
              button1Icon={displaySidebarAnnouncement.button1Icon}
              button2Text={displaySidebarAnnouncement.button2Text}
              button2Icon={displaySidebarAnnouncement.button2Icon}
              currentAmount={displaySidebarAnnouncement.currentAmount}
              targetAmount={displaySidebarAnnouncement.targetAmount}
            />
          )}

          {sidebarAdvertisement && (
            <CrAdSpace
                size={sidebarAdvertisement.size || 'mobile-banner'}
                customWidth={sidebarAdvertisement.customWidth}
                customHeight={sidebarAdvertisement.customHeight}
                contentType={sidebarAdvertisement.contentType}
                src={sidebarAdvertisement.imageUrl || sidebarAdvertisement.image?.url}
                alt={sidebarAdvertisement.alt}
                htmlContent={sidebarAdvertisement.htmlContent}
                videoSrc={sidebarAdvertisement.videoUrl || sidebarAdvertisement.video?.url}
                embedCode={sidebarAdvertisement.embedCode}
                href={sidebarAdvertisement.href}
                target={sidebarAdvertisement.target}
                showLabel={sidebarAdvertisement.showLabel}
              />
          )}
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
            key="events-header"
            showEyebrow={false}
            title="Events"
            actionButtonText="See More Events"
            actionButtonIcon={<PiCalendarDots />}
            onActionClick={() => navigate('/events')}
          />
          {events?.slice(0, 3).map((event, index) => (
            <CrCard
              key={event.slug || event.id || `event-${index}`}
              variant="narrow"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              backgroundImage={getEventImageUrl(event)}
              preheader={getEventCategoryName(event)}
              title={event.title}
              dateTime={new Date(event.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(event)}
              ageRestriction={getEventAgeRestriction(event)}
              contentSummary={event.excerpt}
              onClick={() => navigate(`/events/${event.slug}`)}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--bg page-layout-3col__column--articles">
          <CrPageHeader
            key="articles-header"
            showEyebrow={false}
            title="Articles"
            actionButtonText="View More Articles"
            actionButtonIcon={<PiReadCvLogo />}
            onActionClick={() => navigate('/articles')}
          />
          {articles?.slice(0, 6).map((article, index) => (
            <CrCard
              key={article.slug || article.id || `article-${index}`}
              variant="small"
              type="article"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              bannerBackgroundColor="none"
              backgroundImage={typeof article.featuredImage === 'string' ? article.featuredImage : typeof article.featuredImage === 'object' && article.featuredImage !== null && 'url' in article.featuredImage ? article.featuredImage.url : undefined}
              preheader={
                typeof article.category === 'string' ? article.category : typeof article.category === 'object' && article.category !== null && 'name' in article.category ? article.category.name : undefined
              }
              title={article.title}
              contentSummary={article.excerpt}
              onClick={() => navigate(`/articles/${article.slug}`)}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--large-gap">
          <CrPageHeader
            key="djs-header"
            showEyebrow={false}
            title="Our DJs"
            showActionButton={true}
            actionButtonText="Review the DJ Schedule"
            actionButtonIcon={<PiVinylRecord />}
            onActionClick={() => navigate('/schedule')}
          />
          {djs?.slice(0, 10).map((dj, index) => (
            <CrDjOverview
              key={dj.slug || dj.id || `dj-${index}`}
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
