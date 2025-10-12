// src/pages/ArticleDetailPage.tsx
import React from 'react'
import { useLocation, useParams, useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import { useArticles, useAnnouncements } from '../hooks/useData'

const ArticleDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const article = location.state?.article
  const articleTitle = article?.title || 'Article Details'

  const { data: allArticles } = useArticles()
  const { data: announcements } = useAnnouncements()

  // Get 3 most recent articles excluding the current one
  const recentArticles = allArticles
    ?.filter(a => a.id !== article?.id)
    .slice(0, 3) || []

  const handleArticleClick = (clickedArticle: any) => {
    navigate(`/articles/${clickedArticle.id}`, { state: { article: clickedArticle } })
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
            { label: articleTitle, isClickable: false }
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
            backgroundImage={article.featuredImage}
            preheader={article.category}
            title={article.title}
            authorBy={`by ${article.author.name}`}
            eventDate={new Date(article.publishedDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
            tags={article.tags}
            excerpt={article.excerpt}
            content={article.content}
            showTicketButton={false}
            showShareButton={true}
            shareUrl={`${window.location.origin}${window.location.pathname}#/articles/${article.id}`}
          />

          {/* YouTube Video Embed */}
          {article.youtubeVideoId && (
            <div style={{
              marginTop: 'var(--cr-space-8)',
              maxWidth: '1000px',
              padding: 'var(--cr-space-6)',
              backgroundColor: 'var(--cr-paper)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)'
            }}>
              <h2 style={{
                font: 'var(--cr-title-sm)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)'
              }}>
                {article.videoTitle || 'Watch the Video'}
              </h2>
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                borderRadius: 'var(--cr-space-1)'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
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
            onActionButtonClick={() => navigate('/articles')}
          />
          {recentArticles.map((recentArticle) => (
            <CrCard
              key={recentArticle.id}
              variant="small"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              titleTag="h3"
              titleSize="sm"
              backgroundImage={recentArticle.featuredImage}
              preheader={recentArticle.category}
              title={recentArticle.title}
              authorBy={`by ${recentArticle.author.name}`}
              eventDate={new Date(recentArticle.publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              contentSummary={recentArticle.excerpt}
              onClick={() => handleArticleClick(recentArticle)}
            />
          ))}
          {announcements && announcements[1] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[1].backgroundColor}
              headlineText={announcements[1].title}
              bodyText={announcements[1].message}
              showLink={!!announcements[1].ctaText}
              linkText={announcements[1].ctaText}
              linkUrl={announcements[1].ctaUrl}
              buttonCount="none"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleDetailPage
