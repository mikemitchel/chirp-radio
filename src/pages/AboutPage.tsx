// src/pages/AboutPage.tsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import CrCard from '../stories/CrCard'
import CrImageRow from '../stories/CrImageRow'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import { usePageBySlug } from '../hooks/useData'

const AboutPage: React.FC = () => {
  const { data: pageConfig } = usePageBySlug('about')

  // Board member data
  const boardMembers = [
    {
      id: 'board-001',
      name: 'Sarah Chen',
      title: 'President',
      showTitle: 'Morning Vibes',
      showTime: 'Mon 6am - 9am',
      description: 'Long-time CHIRP volunteer and indie rock enthusiast.',
      imageSrc:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-002',
      name: 'Marcus Thompson',
      title: 'President',
      showTitle: 'Rhythm & Blues',
      showTime: 'Tue 3pm - 6pm',
      description: 'Community organizer and R&B aficionado.',
      imageSrc:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-003',
      name: 'Jennifer Rodriguez',
      title: 'Secretary',
      description: 'Non-profit management professional and CHIRP advocate.',
      imageSrc:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
      isDJ: false,
    },
    {
      id: 'board-004',
      name: 'James Park',
      title: 'Treasurer',
      showTitle: 'Jazz Hour',
      showTime: 'Wed 7pm - 9pm',
      description: 'Financial analyst and jazz enthusiast.',
      imageSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-005',
      name: 'Aisha Williams',
      showTitle: 'Hip Hop Essentials',
      showTime: 'Thu 6pm - 9pm',
      description: 'Hip hop historian and community radio advocate.',
      imageSrc:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
      isDJ: true,
    },
    {
      id: 'board-006',
      name: "Ryan O'Brien",
      description: 'Marketing professional and music lover.',
      imageSrc:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',
      isDJ: false,
    },
    {
      id: 'board-007',
      name: 'Maya Patel',
      description: 'Tech entrepreneur and community radio supporter.',
      imageSrc:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces',
      isDJ: false,
    },
  ]

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
            {boardMembers.map((member) => (
              <CrDjOverview
                key={member.id}
                size="large"
                djName={member.name}
                title={member.title}
                showTime={member.isDJ ? member.showTime : ''}
                description={member.description}
                imageSrc={member.imageSrc}
                content=""
                showContent={false}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
