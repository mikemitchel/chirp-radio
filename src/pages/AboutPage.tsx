// src/pages/AboutPage.tsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import PageLayout from '../components/PageLayout'
import { usePageBySlug, useBoardMembers } from '../hooks/useData'
import { formatShowTime } from '../utils/formatShowTime'

const AboutPage: React.FC = () => {
  const { data: pageConfig } = usePageBySlug('about')
  const { data: boardMembers } = useBoardMembers()

  const sidebarContent = (
    <>
      <CrPageHeader
        title="The CHIRP Radio Board"
        showEyebrow={false}
        showActionButton={false}
        titleSize="md"
        titleTag="h3"
      />
      {boardMembers?.map((member) => {
        const displayName =
          `${member.firstName || ''} ${member.lastName || ''}`.trim() ||
          member.username ||
          'Board Member'
        const imageSrc =
          typeof member.profileImage === 'string'
            ? member.profileImage
            : typeof member.profileImage === 'object' &&
                member.profileImage !== null &&
                'url' in member.profileImage
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
    </>
  )

  return (
    <>
      <Helmet>
        <title>{pageConfig?.title || 'About | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="about-page">
        {!pageConfig && <div>Loading page...</div>}
        {pageConfig && (
          <PageLayout
            layoutTemplate={pageConfig.layoutTemplate || 'sidebar-right'}
            layoutBlocks={pageConfig.layout}
            sidebar={sidebarContent}
          />
        )}
      </div>
    </>
  )
}

export default AboutPage
