// src/pages/AboutPage.tsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import CrCard from '../stories/CrCard'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import { usePageBySlug, useBoardMembers } from '../hooks/useData'
import { formatShowTime } from '../utils/formatShowTime'

const AboutPage: React.FC = () => {
  const { data: pageConfig } = usePageBySlug('about')
  const { data: boardMembers } = useBoardMembers()

  return (
    <>
      <Helmet>
        <title>{pageConfig?.title || 'About | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="about-page">
        <div className="page-layout-main-sidebar">
          <div className="page-layout-main-sidebar__main">
            {!pageConfig && <div>Loading page...</div>}
            {pageConfig && !pageConfig.layout && <div>No layout blocks found</div>}
            {pageConfig?.layout && pageConfig.layout.length === 0 && <div>Layout is empty</div>}
            {pageConfig?.layout?.map((block: any, index: number) => {
              if (block.blockType === 'contentCard') {
                return (
                  <CrCard
                    key={block.id || index}
                    variant="article"
                    type="page"
                    imagePosition={block.imagePosition || 'none'}
                    articleImageAspectRatio="16:9"
                    backgroundImage={block.backgroundImage || block.backgroundImageUrl}
                    bannerBackgroundColor="none"
                    preheader={block.preheader || ''}
                    title={block.title}
                    titleTag={block.titleTag || 'h2'}
                    titleSize={index === 0 ? 'xl' : undefined}
                    textLayout="stacked"
                    bannerHeight={index === 0 ? 'tall' : 'narrow'}
                    content={block.content}
                    showTicketButton={false}
                    showShareButton={false}
                  />
                )
              }
              return null
            })}
          </div>

          <div className="page-layout-main-sidebar__sidebar">
            <CrPageHeader
              title="The CHIRP Radio Board"
              showEyebrow={false}
              showActionButton={false}
              titleSize="md"
              titleTag="h3"
            />
            {boardMembers?.map((member) => {
              const displayName = `${member.firstName || ''} ${member.lastName || ''}`.trim() || member.username || 'Board Member'
              const imageSrc = typeof member.profileImage === 'string'
                ? member.profileImage
                : typeof member.profileImage === 'object' && member.profileImage !== null && 'url' in member.profileImage
                ? member.profileImage.url
                : ''

              return (
                <CrDjOverview
                  key={member.id}
                  size="large"
                  djName={displayName}
                  title={member.boardPosition}
                  showTime={member.djName && member.showTime ? formatShowTime(member.showTime) : ''}
                  description={member.bio}
                  imageSrc={imageSrc}
                  content=""
                  showContent={false}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
