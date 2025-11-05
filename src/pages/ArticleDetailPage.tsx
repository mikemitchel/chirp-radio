// src/pages/ArticleDetailPage.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import { useArticles, useAnnouncements } from '../hooks/useData'
import { useLivePreview } from '../hooks/useLivePreview'
import type { Article } from '../types/cms'

const ArticleDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()

  const { data: allArticles, loading: isLoading } = useArticles()
  const { data: announcements } = useAnnouncements()

  // Find article by slug from URL
  const initialArticle = allArticles?.find((a) => a.slug === slug)

  // Use live preview with fallback to initial article
  const liveArticle = useLivePreview<Article | undefined>({ initialData: initialArticle })
  const article = liveArticle || initialArticle
  const articleTitle = article?.title || 'Article Details'

  // Get 3 most recent articles excluding the current one
  const recentArticles = allArticles?.filter((a) => a.id !== article?.id).slice(0, 3) || []

  const handleArticleClick = (clickedArticle: Article) => {
    navigate(`/articles/${clickedArticle.slug}`)
  }

  if (isLoading) {
    return (
      <div className="article-detail-page">
        <section className="page-container">
          <p>Loading...</p>
        </section>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="article-detail-page">
        <section className="page-container">
          <p>Article not found</p>
        </section>
      </div>
    )
  }

  return (
    <div className="article-detail-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Articles', isClickable: true, onClick: () => navigate('/articles') },
            { label: articleTitle, isClickable: false },
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
            backgroundImage={
              typeof article.featuredImage === 'object' &&
              article.featuredImage &&
              'url' in article.featuredImage
                ? article.featuredImage.url
                : typeof article.featuredImage === 'string'
                  ? article.featuredImage
                  : article.featuredImageUrl
            }
            preheader={
              typeof article.category === 'object' && article.category && 'name' in article.category
                ? article.category.name
                : undefined
            }
            title={article.title}
            authorBy={`by ${article.author}`}
            eventDate={
              article.publishedDate
                ? `Published on ${new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                : article.createdAt
                  ? `Published on ${new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  : undefined
            }
            tags={
              Array.isArray(article.tags) &&
              article.tags.length > 0 &&
              typeof article.tags[0] === 'object'
                ? (article.tags as Array<{ tag: string }>).map((t) => t.tag)
                : (article.tags as string[] | undefined)
            }
            excerpt={
              article.excerpt ||
              ('description' in article
                ? ((article as Record<string, unknown>).description as string)
                : undefined)
            }
            content={typeof article.content === 'string' ? article.content : undefined}
            showTicketButton={false}
            showShareButton={true}
            shareUrl={`${window.location.origin}${window.location.pathname}#/articles/${article.slug}`}
          />

          {/* YouTube Video Embed */}
          {article.youtubeVideoId && (
            <div
              style={{
                marginTop: 'var(--cr-space-8)',
                maxWidth: '1000px',
                padding: 'var(--cr-space-6)',
                backgroundColor: 'var(--cr-paper)',
                border: '1px solid var(--cr-default-300)',
                borderRadius: 'var(--cr-space-2)',
              }}
            >
              <h2
                style={{
                  font: 'var(--cr-title-sm)',
                  color: 'var(--cr-ink)',
                  marginBottom: 'var(--cr-space-4)',
                }}
              >
                {article.videoTitle || 'Watch the Video'}
              </h2>
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: 'var(--cr-space-1)',
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  src={`https://www.youtube.com/embed/${article.youtubeVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader
            title="Recent Articles"
            titleTag="h2"
            titleSize="md"
            showEyebrow={false}
            showActionButton={true}
            actionButtonText="View All Articles"
            actionButtonSize="small"
            onActionClick={() => navigate('/articles')}
          />
          {recentArticles.map((recentArticle) => (
            <CrCard
              key={recentArticle.id}
              variant="small"
              type="article"
              bannerHeight="narrow"
              textLayout="inline"
              bannerBackgroundColor="none"
              titleTag="h3"
              titleSize="sm"
              backgroundImage={
                typeof recentArticle.featuredImage === 'object' &&
                recentArticle.featuredImage &&
                'url' in recentArticle.featuredImage
                  ? recentArticle.featuredImage.url
                  : typeof recentArticle.featuredImage === 'string'
                    ? recentArticle.featuredImage
                    : recentArticle.featuredImageUrl
              }
              preheader={
                typeof recentArticle.category === 'object' &&
                recentArticle.category &&
                'name' in recentArticle.category
                  ? recentArticle.category.name
                  : undefined
              }
              title={recentArticle.title}
              authorBy={`by ${recentArticle.author}`}
              eventDate={
                recentArticle.publishedDate
                  ? new Date(recentArticle.publishedDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : undefined
              }
              contentSummary={recentArticle.excerpt}
              onClick={() => handleArticleClick(recentArticle)}
            />
          ))}
          {announcements && announcements[1] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={
                'backgroundColor' in announcements[1]
                  ? ((announcements[1] as Record<string, unknown>).backgroundColor as string)
                  : undefined
              }
              headlineText={
                'title' in announcements[1]
                  ? ((announcements[1] as Record<string, unknown>).title as string)
                  : announcements[1].headlineText
              }
              bodyText={
                'message' in announcements[1]
                  ? ((announcements[1] as Record<string, unknown>).message as string)
                  : typeof announcements[1].bodyText === 'string'
                    ? announcements[1].bodyText
                    : undefined
              }
              showLink={
                !!('ctaText' in announcements[1]
                  ? (announcements[1] as Record<string, unknown>).ctaText
                  : announcements[1].linkText)
              }
              linkText={
                'ctaText' in announcements[1]
                  ? ((announcements[1] as Record<string, unknown>).ctaText as string)
                  : announcements[1].linkText
              }
              linkUrl={
                'ctaUrl' in announcements[1]
                  ? ((announcements[1] as Record<string, unknown>).ctaUrl as string)
                  : announcements[1].linkUrl
              }
              buttonCount="none"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleDetailPage
