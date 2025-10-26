// src/pages/ArticlesPage.tsx
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPagination from '../stories/CrPagination'
import { useArticles, useAnnouncements, useSiteSettings } from '../hooks/useData'

const ITEMS_PER_PAGE = 8

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
      : siteSettings?.articlesSidebarAnnouncement?.id

  const sidebarAnnouncement = sidebarAnnouncementId
    ? announcements?.find((a) => a.id === sidebarAnnouncementId)
    : announcements?.[3] // fallback

  const fullWidthAnnouncementId =
    typeof siteSettings?.articlesFullWidthAnnouncement === 'string'
      ? siteSettings.articlesFullWidthAnnouncement
      : siteSettings?.articlesFullWidthAnnouncement?.id

  const fullWidthAnnouncement = fullWidthAnnouncementId
    ? announcements?.find((a) => a.id === fullWidthAnnouncementId)
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
              backgroundImage={articles[0].featuredImage}
              preheader={typeof articles[0].category === "string" ? articles[0].category : articles[0].category?.name}
              title={articles[0].title}
              contentSummary={articles[0].excerpt}
              authorBy={`by ${articles[0].author}`}
              eventDate={new Date(articles[0].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              tags={articles[0].tags}
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
              bodyText={sidebarAnnouncement.bodyText}
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
            <CrAdSpace
              size={sidebarAdvertisement.size || 'large-rectangle'}
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
              backgroundImage={articles[3].featuredImage}
              preheader={typeof articles[3].category === "string" ? articles[3].category : articles[3].category?.name}
              title={articles[3].title}
              authorBy={`by ${articles[3].author}`}
              eventDate={new Date(articles[3].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              tags={articles[3].tags}
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
              backgroundImage={articles[4].featuredImage}
              preheader={typeof articles[4].category === "string" ? articles[4].category : articles[4].category?.name}
              title={articles[4].title}
              authorBy={`by ${articles[4].author}`}
              eventDate={new Date(articles[4].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              tags={articles[4].tags}
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
              bodyText={fullWidthAnnouncement.bodyText}
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
              backgroundImage={articles[5].featuredImage}
              preheader={typeof articles[5].category === "string" ? articles[5].category : articles[5].category?.name}
              title={articles[5].title}
              authorBy={`by ${articles[5].author}`}
              eventDate={new Date(articles[5].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              tags={articles[5].tags}
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
              backgroundImage={articles[6].featuredImage}
              preheader={typeof articles[6].category === "string" ? articles[6].category : articles[6].category?.name}
              title={articles[6].title}
              authorBy={`by ${articles[6].author}`}
              eventDate={new Date(articles[6].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              tags={articles[6].tags}
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
              backgroundImage={articles[7].featuredImage}
              preheader={typeof articles[7].category === "string" ? articles[7].category : articles[7].category?.name}
              title={articles[7].title}
              authorBy={`by ${articles[7].author}`}
              eventDate={new Date(articles[7].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              tags={articles[7].tags}
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
