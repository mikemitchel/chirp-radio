// src/pages/PodcastDetailPage.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrButton from '../stories/CrButton'
import { usePodcasts, useAnnouncements } from '../hooks/useData'
import { useLivePreview } from '../hooks/useLivePreview'
import type { Podcast } from '../types/cms'
import { getPodcastTags } from '../utils/typeHelpers'

const PodcastDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()

  const { data: allPodcasts, isLoading } = usePodcasts()
  const { data: announcements } = useAnnouncements()

  // Find podcast by slug from URL
  const initialPodcast = allPodcasts?.find((p) => p.slug === slug)

  // Use live preview with fallback to initial podcast
  const livePodcast = useLivePreview<Podcast | undefined>({ initialData: initialPodcast })
  const podcast = livePodcast || initialPodcast
  const podcastTitle = podcast?.title || 'Podcast Details'

  // Get 3 most recent podcasts excluding the current one
  const recentPodcasts = allPodcasts?.filter((p) => p.id !== podcast?.id).slice(0, 3) || []

  const handlePodcastClick = (clickedPodcast: Podcast) => {
    navigate(`/podcasts/${clickedPodcast.slug}`)
  }

  if (isLoading) {
    return (
      <div className="podcast-detail-page">
        <section className="page-container">
          <p>Loading...</p>
        </section>
      </div>
    )
  }

  if (!podcast) {
    return (
      <div className="podcast-detail-page">
        <section className="page-container">
          <p>Podcast not found</p>
        </section>
      </div>
    )
  }

  return (
    <div className="podcast-detail-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Podcasts', isClickable: true, onClick: () => navigate('/podcasts') },
            { label: podcastTitle, isClickable: false },
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="article"
            bannerHeight="tall"
            textLayout="stacked"
            titleTag="h1"
            titleSize="xl"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
            backgroundImage={podcast.coverArt}
            preheader={
              'category' in podcast && typeof podcast.category === 'string'
                ? podcast.category
                : 'category' in podcast &&
                    typeof podcast.category === 'object' &&
                    podcast.category &&
                    'name' in podcast.category
                  ? (podcast.category.name as string)
                  : undefined
            }
            title={podcast.title}
            authorBy={
              'host' in podcast
                ? `Produced by ${(podcast as Record<string, unknown>).host}`
                : undefined
            }
            eventDate={
              podcast.createdAt
                ? `Published on ${new Date(podcast.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                : undefined
            }
            tags={getPodcastTags(podcast)}
            excerpt={podcast.excerpt}
            content={typeof podcast.content === 'string' ? podcast.content : undefined}
            showTicketButton={false}
            showShareButton={true}
            shareUrl={`${window.location.origin}${window.location.pathname}#/podcasts/${podcast.slug}`}
          />

          {
            (podcast.pullQuote && (
              <div
                style={{
                  marginTop: 'var(--cr-space-8)',
                  maxWidth: '1000px',
                  padding: 'var(--cr-space-8)',
                  backgroundColor: 'var(--cr-default-100)',
                  borderLeft: '4px solid var(--cr-primary-500)',
                  borderRadius: 'var(--cr-space-1)',
                }}
              >
                <blockquote
                  style={{
                    font: 'var(--cr-body-lg)',
                    color: 'var(--cr-ink)',
                    margin: 0,
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                  }}
                >
                  {String(podcast.pullQuote)}
                </blockquote>
                {'pullQuoteAttribution' in podcast && podcast.pullQuoteAttribution ? (
                  <p
                    style={{
                      font: 'var(--cr-body-sm)',
                      color: 'var(--cr-default-700)',
                      marginTop: 'var(--cr-space-3)',
                      marginBottom: 0,
                    }}
                  >
                    {String((podcast as Record<string, unknown>).pullQuoteAttribution)}
                  </p>
                ) : null}
              </div>
            )) as React.ReactNode
          }

          {
            (podcast.additionalInfo && (
              <div
                style={{
                  marginTop: 'var(--cr-space-6)',
                  maxWidth: '1000px',
                  padding: 'var(--cr-space-6)',
                  backgroundColor: 'var(--cr-paper)',
                  border: '1px solid var(--cr-default-300)',
                  borderRadius: 'var(--cr-space-2)',
                }}
              >
                <div
                  style={{
                    font: 'var(--cr-body-reg)',
                    color: 'var(--cr-ink)',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {String(podcast.additionalInfo)}
                </div>
                {'transcriptUrl' in podcast && podcast.transcriptUrl ? (
                  <p
                    style={{
                      font: 'var(--cr-body-reg)',
                      color: 'var(--cr-ink)',
                      marginTop: 'var(--cr-space-4)',
                      marginBottom: 0,
                    }}
                  >
                    <a
                      href={(podcast as Record<string, unknown>).transcriptUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--cr-secondary-700)',
                        textDecoration: 'underline',
                      }}
                    >
                      Read a transcript of the interview here.
                    </a>
                  </p>
                ) : null}
              </div>
            )) as React.ReactNode
          }

          {
            (podcast.soundCloudEmbedUrl && (
              <div
                style={
                  {
                    marginTop: 'var(--cr-space-8)',
                    maxWidth: '1000px',
                    padding: 'var(--cr-space-6)',
                    backgroundColor: 'var(--cr-paper)',
                    border: '1px solid var(--cr-default-300)',
                    borderRadius: 'var(--cr-space-2)',
                  } as React.CSSProperties
                }
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--cr-space-4)',
                  }}
                >
                  <h2
                    style={{
                      font: 'var(--cr-title-sm)',
                      color: 'var(--cr-ink)',
                      margin: 0,
                    }}
                  >
                    Listen to the Episode
                  </h2>
                  <CrButton
                    size="small"
                    variant="outline"
                    color="default"
                    onClick={() => {
                      const embedUrl =
                        'soundCloudEmbedUrl' in podcast
                          ? ((podcast as Record<string, unknown>).soundCloudEmbedUrl as string)
                          : ''
                      const includesSoundcloud = embedUrl?.includes('soundcloud.com')
                      const urlMatch = embedUrl?.match(/url=([^&]+)/)
                      const soundcloudUrl =
                        includesSoundcloud && urlMatch?.[1]
                          ? decodeURIComponent(urlMatch[1])
                          : 'https://soundcloud.com/chirpradio'
                      window.open(soundcloudUrl, '_blank')
                    }}
                  >
                    Listen on SoundCloud
                  </CrButton>
                </div>
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`${'soundCloudEmbedUrl' in podcast ? String((podcast as Record<string, unknown>).soundCloudEmbedUrl).replace('color=ff5500', 'color=ea1c2c') : ''}&theme_color=18181b&visual=false&show_artwork=true&buying=false&liking=false&download=false&sharing=false&show_comments=false&show_playcount=false`}
                  title={`${podcast.title} SoundCloud Player`}
                  style={{
                    borderRadius: 'var(--cr-space-1)',
                    marginBottom: 'var(--cr-space-2)',
                  }}
                />
                <div
                  style={{
                    fontSize: '10px',
                    color: 'var(--cr-default-500)',
                    lineBreak: 'anywhere',
                    wordBreak: 'normal',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    fontFamily: 'var(--cr-font-roboto-serif)',
                    fontWeight: 400,
                  }}
                >
                  <a
                    href="https://soundcloud.com/chirpradio"
                    title="CHIRP Radio"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--cr-secondary-700)', textDecoration: 'none' }}
                  >
                    CHIRP Radio
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://soundcloud.com/chirpradio/mac-sabbath-interview"
                    title="Mac Sabbath Interview"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--cr-secondary-700)', textDecoration: 'none' }}
                  >
                    Mac Sabbath Interview
                  </a>
                </div>
              </div>
            )) as React.ReactNode
          }
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader
            title="Recent Podcasts"
            titleTag="h2"
            titleSize="md"
            showEyebrow={false}
            showActionButton={true}
            actionButtonText="View All Podcasts"
            actionButtonSize="small"
            onActionClick={() => navigate('/podcasts')}
          />
          {recentPodcasts.map((recentPodcast) => (
            <CrCard
              key={recentPodcast.id}
              variant="small"
              type="article"
              bannerHeight="narrow"
              textLayout="inline"
              bannerBackgroundColor="none"
              titleTag="h3"
              titleSize="sm"
              backgroundImage={recentPodcast.coverArt}
              preheader={
                'category' in recentPodcast && typeof recentPodcast.category === 'string'
                  ? recentPodcast.category
                  : 'category' in recentPodcast &&
                      typeof recentPodcast.category === 'object' &&
                      recentPodcast.category &&
                      'name' in recentPodcast.category
                    ? (recentPodcast.category.name as string)
                    : undefined
              }
              title={recentPodcast.title}
              authorBy={
                'host' in recentPodcast
                  ? `by ${(recentPodcast as Record<string, unknown>).host}`
                  : undefined
              }
              eventDate={
                recentPodcast.createdAt
                  ? new Date(recentPodcast.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : undefined
              }
              contentSummary={recentPodcast.excerpt}
              onClick={() => handlePodcastClick(recentPodcast)}
            />
          ))}
          {announcements && announcements[2] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={
                'backgroundColor' in announcements[2]
                  ? ((announcements[2] as Record<string, unknown>).backgroundColor as string)
                  : undefined
              }
              headlineText={
                'title' in announcements[2]
                  ? ((announcements[2] as Record<string, unknown>).title as string)
                  : announcements[2].headlineText
              }
              bodyText={
                'message' in announcements[2]
                  ? ((announcements[2] as Record<string, unknown>).message as string)
                  : typeof announcements[2].bodyText === 'string'
                    ? announcements[2].bodyText
                    : undefined
              }
              showLink={
                'ctaText' in announcements[2] &&
                !!(announcements[2] as Record<string, unknown>).ctaText
              }
              linkText={
                'ctaText' in announcements[2]
                  ? ((announcements[2] as Record<string, unknown>).ctaText as string)
                  : undefined
              }
              linkUrl={
                'ctaUrl' in announcements[2]
                  ? ((announcements[2] as Record<string, unknown>).ctaUrl as string)
                  : undefined
              }
              buttonCount="none"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PodcastDetailPage
