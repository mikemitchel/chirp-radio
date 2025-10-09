// src/pages/PodcastDetailPage.tsx
import React from 'react'
import { useLocation, useParams, useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrButton from '../stories/CrButton'
import { usePodcasts, useAnnouncements } from '../hooks/useData'

const PodcastDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const podcast = location.state?.podcast
  const podcastTitle = podcast?.title || 'Podcast Details'

  const { data: allPodcasts } = usePodcasts()
  const { data: announcements } = useAnnouncements()

  // Get 3 most recent podcasts excluding the current one
  const recentPodcasts = allPodcasts
    ?.filter(p => p.id !== podcast?.id)
    .slice(0, 3) || []

  const handlePodcastClick = (clickedPodcast: any) => {
    navigate(`/podcasts/${clickedPodcast.id}`, { state: { podcast: clickedPodcast } })
  }

  const formatPodcastDate = (podcastItem: any) => {
    if (!podcastItem.episodes?.[0]?.publishedDate) return undefined
    return new Date(podcastItem.episodes[0].publishedDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
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
            { label: podcastTitle, isClickable: false }
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
            preheader={podcast.category}
            title={podcast.title}
            authorBy={`Produced by ${podcast.host}`}
            eventDate={formatPodcastDate(podcast)}
            tags={podcast.tags}
            excerpt={podcast.excerpt}
            content={podcast.content}
            showTicketButton={false}
            showShareButton={true}
            shareUrl={`${window.location.origin}${window.location.pathname}#/podcasts/${podcast.id}`}
          />

          {podcast.pullQuote && (
            <div style={{
              marginTop: 'var(--cr-space-8)',
              maxWidth: '1000px',
              padding: 'var(--cr-space-8)',
              backgroundColor: 'var(--cr-default-100)',
              borderLeft: '4px solid var(--cr-primary-500)',
              borderRadius: 'var(--cr-space-1)'
            }}>
              <blockquote style={{
                font: 'var(--cr-body-lg)',
                color: 'var(--cr-ink)',
                margin: 0,
                fontStyle: 'italic',
                lineHeight: 1.6
              }}>
                "{podcast.pullQuote}"
              </blockquote>
              {podcast.pullQuoteAttribution && (
                <p style={{
                  font: 'var(--cr-body-sm)',
                  color: 'var(--cr-default-700)',
                  marginTop: 'var(--cr-space-3)',
                  marginBottom: 0
                }}>
                  — {podcast.pullQuoteAttribution}
                </p>
              )}
            </div>
          )}

          {podcast.additionalInfo && (
            <div style={{
              marginTop: 'var(--cr-space-6)',
              maxWidth: '1000px',
              padding: 'var(--cr-space-6)',
              backgroundColor: 'var(--cr-paper)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)'
            }}>
              <div style={{
                font: 'var(--cr-body-reg)',
                color: 'var(--cr-ink)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}>
                {podcast.additionalInfo}
              </div>
              {podcast.transcriptUrl && (
                <p style={{
                  font: 'var(--cr-body-reg)',
                  color: 'var(--cr-ink)',
                  marginTop: 'var(--cr-space-4)',
                  marginBottom: 0
                }}>
                  <a
                    href={podcast.transcriptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--cr-secondary-700)',
                      textDecoration: 'underline'
                    }}
                  >
                    Read a transcript of the interview here.
                  </a>
                </p>
              )}
            </div>
          )}

          {podcast.soundCloudEmbedUrl && (
            <div style={{
              marginTop: 'var(--cr-space-8)',
              maxWidth: '1000px',
              padding: 'var(--cr-space-6)',
              backgroundColor: 'var(--cr-paper)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--cr-space-4)'
              }}>
                <h2 style={{
                  font: 'var(--cr-title-sm)',
                  color: 'var(--cr-ink)',
                  margin: 0
                }}>
                  Listen to the Episode
                </h2>
                <CrButton
                  label="Download Episode"
                  size="small"
                  variant="outline"
                  color="default"
                  onClick={() => window.open(podcast.episodes?.[0]?.audioUrl || '#', '_blank')}
                />
              </div>
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`${podcast.soundCloudEmbedUrl.replace('color=ff5500', 'color=ea1c2c')}&theme_color=18181b&visual=false&show_artwork=true&buying=false&liking=false&download=false&sharing=false&show_comments=false&show_playcount=false`}
                title={`${podcast.title} SoundCloud Player`}
                style={{
                  borderRadius: 'var(--cr-space-1)',
                  marginBottom: 'var(--cr-space-2)'
                }}
              />
              <div style={{
                fontSize: '10px',
                color: 'var(--cr-default-500)',
                lineBreak: 'anywhere',
                wordBreak: 'normal',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontFamily: 'var(--cr-font-roboto-serif)',
                fontWeight: 400
              }}>
                <a href="https://soundcloud.com/chirpradio" title="CHIRP Radio" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cr-secondary-700)', textDecoration: 'none' }}>
                  CHIRP Radio
                </a> · <a href="https://soundcloud.com/chirpradio/mac-sabbath-interview" title="Mac Sabbath Interview" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cr-secondary-700)', textDecoration: 'none' }}>
                  Mac Sabbath Interview
                </a>
              </div>
            </div>
          )}
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
            onActionButtonClick={() => navigate('/podcasts')}
          />
          {recentPodcasts.map((recentPodcast) => (
            <CrCard
              key={recentPodcast.id}
              variant="small"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              titleTag="h3"
              titleSize="sm"
              backgroundImage={recentPodcast.coverArt}
              preheader={recentPodcast.category}
              title={recentPodcast.title}
              authorBy={`by ${recentPodcast.host}`}
              eventDate={formatPodcastDate(recentPodcast)}
              contentSummary={recentPodcast.description}
              onClick={() => handlePodcastClick(recentPodcast)}
            />
          ))}
          {announcements && announcements[2] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[2].backgroundColor}
              headlineText={announcements[2].title}
              bodyText={announcements[2].message}
              showLink={!!announcements[2].ctaText}
              linkText={announcements[2].ctaText}
              linkUrl={announcements[2].ctaUrl}
              buttonCount="none"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PodcastDetailPage
