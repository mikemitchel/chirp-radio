// src/pages/ArticlesPage.tsx
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPagination from '../stories/CrPagination'
import { useArticles, useAnnouncements, useSiteSettings } from '../hooks/useData'
import type { Article } from '../types/cms'

const ITEMS_PER_PAGE = 8

// Helper functions for type conversions
const getImageUrl = (article: Article): string | undefined => {
  if (typeof article.featuredImage === 'object' && article.featuredImage && 'url' in article.featuredImage) {
    return article.featuredImage.url
  }
  if (typeof article.featuredImage === 'string') {
    return article.featuredImage
  }
  return article.featuredImageUrl
}

const getCategoryName = (article: Article): string | undefined => {
  if (typeof article.category === 'object' && article.category && 'name' in article.category) {
    return article.category.name
  }
  return undefined
}

const getTags = (article: Article): string[] | undefined => {
  if (Array.isArray(article.tags) && article.tags.length > 0 && typeof article.tags[0] === 'object') {
    return (article.tags as Array<{ tag: string }>).map(t => t.tag)
  }
  return article.tags as string[] | undefined
}

const getPublishedDate = (article: Article): string | undefined => {
  return article.publishedDate ? new Date(article.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) : undefined
}

const ArticlesPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: allArticles } = useArticles()
  const { data: announcements } = useAnnouncements()
  const { data: siteSettings } = useSiteSettings()

  // Get current page from URL, default to 0
  const currentPage = parseInt(searchParams.get('page') || '0', 10)

  const totalPages = allArticles ? Math.ceil(allArticles.length / ITEMS_PER_PAGE) : 0
  const startIndex = currentPage * ITEMS_PER_PAGE
  const articles = allArticles?.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.slug}`)
  }

  const handlePageChange = (page: number) => {
    if (page === 0) {
      setSearchParams({})
    } else {
      setSearchParams({ page: String(page) })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get sidebar content from Site Settings
  const sidebarAnnouncementId =
    typeof siteSettings?.articlesSidebarAnnouncement === 'string'
      ? siteSettings.articlesSidebarAnnouncement
      : (siteSettings?.articlesSidebarAnnouncement as any)?.id

  const sidebarAnnouncement = sidebarAnnouncementId
    ? announcements?.find((a) => String(a.id) === String(sidebarAnnouncementId))
    : announcements?.[3] // fallback

  const fullWidthAnnouncementId =
    typeof siteSettings?.articlesFullWidthAnnouncement === 'string'
      ? siteSettings.articlesFullWidthAnnouncement
      : (siteSettings?.articlesFullWidthAnnouncement as any)?.id

  const fullWidthAnnouncement = fullWidthAnnouncementId
    ? announcements?.find((a) => String(a.id) === String(fullWidthAnnouncementId))
    : announcements?.[2] // fallback

  const sidebarAdvertisement = siteSettings?.articlesSidebarAdvertisement

  return (
    <div className="articles-page">
      <section className="page-container">
        <CrPageHeader title="Articles" showEyebrow={false} showActionButton={false} />
      </section>

      {/* 2/3 + 1/3 Layout - Featured Article */}
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          {articles && articles[0] && (
            <CrCard
              variant="default"
              bannerHeight="tall"
              textLayout="stacked"
              type="article"
              backgroundImage={getImageUrl(articles[0])}
              preheader={getCategoryName(articles[0])}
              title={articles[0].title}
              contentSummary={articles[0].excerpt}
              authorBy={`by ${articles[0].author}`}
              eventDate={getPublishedDate(articles[0])}
              tags={getTags(articles[0])}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[0])}
            />
          )}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {sidebarAnnouncement && (
            <CrAnnouncement
              variant={sidebarAnnouncement.variant}
              widthVariant="third"
              textureBackground={sidebarAnnouncement.textureBackground}
              headlineText={sidebarAnnouncement.headlineText}
              bodyText={typeof sidebarAnnouncement.bodyText === 'string' ? sidebarAnnouncement.bodyText : undefined}
              showLink={sidebarAnnouncement.showLink}
              linkText={sidebarAnnouncement.linkText}
              linkUrl={sidebarAnnouncement.linkUrl}
              buttonCount={sidebarAnnouncement.buttonCount}
              button1Text={sidebarAnnouncement.button1Text}
              button1Icon={sidebarAnnouncement.button1Icon}
              button2Text={sidebarAnnouncement.button2Text}
              button2Icon={sidebarAnnouncement.button2Icon}
              currentAmount={sidebarAnnouncement.currentAmount}
              targetAmount={sidebarAnnouncement.targetAmount}
            />
          )}
          {sidebarAdvertisement && (
            <>
              <CrAdSpace
                size={(sidebarAdvertisement as any).size || 'large-rectangle'}
                customWidth={(sidebarAdvertisement as any).customWidth}
                customHeight={(sidebarAdvertisement as any).customHeight}
                contentType={(sidebarAdvertisement as any).contentType}
                src={(sidebarAdvertisement as any).imageUrl || (sidebarAdvertisement as any).image?.url}
                alt={(sidebarAdvertisement as any).alt}
                htmlContent={(sidebarAdvertisement as any).htmlContent}
                videoSrc={(sidebarAdvertisement as any).videoUrl || (sidebarAdvertisement as any).video?.url}
                embedCode={(sidebarAdvertisement as any).embedCode}
                href={(sidebarAdvertisement as any).href}
                target={(sidebarAdvertisement as any).target}
                showLabel={(sidebarAdvertisement as any).showLabel}
              />
            </>
          )}
        </div>
      </div>

      {/* 50/50 Layout - 4 Articles */}
      <section className="page-layout-2col">
        <div className="page-layout-2col__column">
          {articles && articles[1] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getImageUrl(articles[1])}
              preheader={getCategoryName(articles[1])}
              title={articles[1].title}
              authorBy={`by ${articles[1].author}`}
              eventDate={getPublishedDate(articles[1])}
              tags={getTags(articles[1])}
              contentSummary={articles[1].excerpt}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[1])}
            />
          )}
          {articles && articles[2] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getImageUrl(articles[2])}
              preheader={getCategoryName(articles[2])}
              title={articles[2].title}
              authorBy={`by ${articles[2].author}`}
              eventDate={getPublishedDate(articles[2])}
              tags={getTags(articles[2])}
              contentSummary={articles[2].excerpt}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[2])}
            />
          )}
        </div>
        <div className="page-layout-2col__column">
          {articles && articles[3] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getImageUrl(articles[3])}
              preheader={getCategoryName(articles[3])}
              title={articles[3].title}
              authorBy={`by ${articles[3].author}`}
              eventDate={getPublishedDate(articles[3])}
              tags={getTags(articles[3])}
              contentSummary={articles[3].excerpt}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[3])}
            />
          )}
          {articles && articles[4] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getImageUrl(articles[4])}
              preheader={getCategoryName(articles[4])}
              title={articles[4].title}
              authorBy={`by ${articles[4].author}`}
              eventDate={getPublishedDate(articles[4])}
              tags={getTags(articles[4])}
              contentSummary={articles[4].excerpt}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[4])}
            />
          )}
        </div>
      </section>

      {/* Announcement */}
      <section className="page-section">
        <div className="page-container">
          {fullWidthAnnouncement && (
            <CrAnnouncement
              variant={fullWidthAnnouncement.variant}
              textureBackground={fullWidthAnnouncement.textureBackground}
              headlineText={fullWidthAnnouncement.headlineText}
              bodyText={typeof fullWidthAnnouncement.bodyText === 'string' ? fullWidthAnnouncement.bodyText : undefined}
              showLink={fullWidthAnnouncement.showLink}
              linkText={fullWidthAnnouncement.linkText}
              linkUrl={fullWidthAnnouncement.linkUrl}
              buttonCount={fullWidthAnnouncement.buttonCount}
              button1Text={fullWidthAnnouncement.button1Text}
              button1Icon={fullWidthAnnouncement.button1Icon}
              button2Text={fullWidthAnnouncement.button2Text}
              button2Icon={fullWidthAnnouncement.button2Icon}
              currentAmount={fullWidthAnnouncement.currentAmount}
              targetAmount={fullWidthAnnouncement.targetAmount}
            />
          )}
        </div>
      </section>

      {/* 1/3 + 1/3 + 1/3 Layout - 3 Articles */}
      <section className="page-layout-3col">
        <div className="page-layout-3col__column">
          {articles && articles[5] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={getImageUrl(articles[5])}
              preheader={getCategoryName(articles[5])}
              title={articles[5].title}
              authorBy={`by ${articles[5].author}`}
              eventDate={getPublishedDate(articles[5])}
              tags={getTags(articles[5])}
              contentSummary={articles[5].excerpt}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[5])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {articles && articles[6] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={getImageUrl(articles[6])}
              preheader={getCategoryName(articles[6])}
              title={articles[6].title}
              authorBy={`by ${articles[6].author}`}
              eventDate={getPublishedDate(articles[6])}
              tags={getTags(articles[6])}
              contentSummary={articles[6].excerpt}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[6])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {articles && articles[7] && (
            <CrCard
              variant="narrow"
              type="article"
              bannerHeight="tall"
              textLayout="stacked"
              showMetaTop={true}
              backgroundImage={getImageUrl(articles[7])}
              preheader={getCategoryName(articles[7])}
              title={articles[7].title}
              authorBy={`by ${articles[7].author}`}
              eventDate={getPublishedDate(articles[7])}
              tags={getTags(articles[7])}
              contentSummary={articles[7].excerpt}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[7])}
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

export default ArticlesPage
