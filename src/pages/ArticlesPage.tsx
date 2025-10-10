// src/pages/ArticlesPage.tsx
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPagination from '../stories/CrPagination'
import { useArticles, useAnnouncements } from '../hooks/useData'

const ITEMS_PER_PAGE = 8

const ArticlesPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: allArticles } = useArticles()
  const { data: announcements } = useAnnouncements()

  // Get current page from URL, default to 0
  const currentPage = parseInt(searchParams.get('page') || '0', 10)

  const totalPages = allArticles ? Math.ceil(allArticles.length / ITEMS_PER_PAGE) : 0
  const startIndex = currentPage * ITEMS_PER_PAGE
  const articles = allArticles?.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
              preheader={articles[0].category}
              title={articles[0].title}
              contentSummary={articles[0].excerpt}
              authorBy={`by ${articles[0].author.name}`}
              eventDate={new Date(articles[0].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
              tags={articles[0].tags}
              showTicketButton={false}
              onClick={() => handleArticleClick(articles[0])}
            />
          )}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[3] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[3].backgroundColor}
              headlineText={announcements[3].title}
              bodyText={announcements[3].message}
              showLink={!!announcements[3].ctaText}
              linkText={announcements[3].ctaText}
              linkUrl={announcements[3].ctaUrl}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
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
              preheader={articles[1].category}
              title={articles[1].title}
              authorBy={`by ${articles[1].author.name}`}
              eventDate={new Date(articles[1].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
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
              preheader={articles[2].category}
              title={articles[2].title}
              authorBy={`by ${articles[2].author.name}`}
              eventDate={new Date(articles[2].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
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
              preheader={articles[3].category}
              title={articles[3].title}
              authorBy={`by ${articles[3].author.name}`}
              eventDate={new Date(articles[3].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
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
              preheader={articles[4].category}
              title={articles[4].title}
              authorBy={`by ${articles[4].author.name}`}
              eventDate={new Date(articles[4].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
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
          {announcements && announcements[2] && (
            <CrAnnouncement
              variant="motivation"
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
              preheader={articles[5].category}
              title={articles[5].title}
              authorBy={`by ${articles[5].author.name}`}
              eventDate={new Date(articles[5].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
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
              preheader={articles[6].category}
              title={articles[6].title}
              authorBy={`by ${articles[6].author.name}`}
              eventDate={new Date(articles[6].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
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
              preheader={articles[7].category}
              title={articles[7].title}
              authorBy={`by ${articles[7].author.name}`}
              eventDate={new Date(articles[7].publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
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
