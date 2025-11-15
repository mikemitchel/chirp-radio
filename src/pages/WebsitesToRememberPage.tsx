// src/pages/WebsitesToRememberPage.tsx
import { Helmet } from 'react-helmet-async'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import { usePageBySlug } from '../hooks/useData'
import { lexicalToHtml } from '../utils/lexicalSerializer'

const websiteSections = [
  {
    id: 'general-links',
    title: 'General Links',
    description: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
    links: [
      {
        text: 'CHIRP Passport',
        description:
          'New to CHIRP? Check out this guide to the many ways you can get involved, and earn a free t-shirt!',
        url: '#',
      },
      {
        text: 'Log your hours',
        description: 'Log in to Volunteer Impact to log your hours.',
        url: '#',
      },
      {
        text: 'Past Hell Yeah Award Winners',
        description:
          'Each month, we recognize a volunteer who has gone above and beyond expectations in support of CHIRP. Here is a list of past winners!',
        url: '#',
      },
      {
        text: 'Production Studio calendar',
        description:
          'Use this calendar to book the production studio for a DJ audition, for Production work, or for Features work. Book multiple consecutive events for time over 60 minutes.',
        url: '#',
      },
      { text: 'Review Tracker App', description: 'Sign up for albums to review here.', url: '#' },
      {
        text: 'Setting Up the CHIRP Tent',
        description:
          "Here's a short video to show you the basic setup for the CHIRP tent. You can just reverse engineer it to take it down. This video will show you about attaching the back wall, but it's pretty self explanatory with the velcro connectors that attach to the frame. Please be gentle when setting up or taking down the tent -- never force anything!",
        url: '#',
      },
      {
        text: 'Social Media Post Request Form',
        description:
          "When you'd like something posted on one (or more) of CHIRP's social media assets (Facebook, Twitter, Instagram) or in the newsletter, use this form to submit the details. Be sure to give plenty of notice.",
        url: '#',
      },
      {
        text: 'Staff Ticket Sign-up',
        description:
          'Sign up here for available CHIRP staff tickets to upcoming shows. Remember to limit sign-ups to one per 30 days!',
        url: '#',
      },
    ],
  },
  {
    id: 'mailing-lists',
    title: 'Mailing Lists',
    description: 'Here are links to all of the CHIRP Radio Mailing Lists',
    links: [
      {
        text: 'CHIRP DJ list',
        description: 'This is the list for all active CHIRP DJs, weekly and sub',
        url: '#',
      },
      {
        text: 'CHIRP Features list',
        description:
          'This is the list for volunteers interested in conducting and producing artist interviews',
        url: '#',
      },
      {
        text: 'CHIRP Marketing and Outreach list',
        description:
          'This is the list for volunteers interested in working on marketing, design, and outreach projects',
        url: '#',
      },
      {
        text: 'CHIRP Production list',
        description:
          'This is a group for volunteers interested in producing, mixing, voicing, or recording projects, including station promos, podcasts, and special features',
        url: '#',
      },
      {
        text: 'CHIRP Record Fair list',
        description:
          'This is the list for volunteers interested in working on the CHIRP Record Fairs',
        url: '#',
      },
      {
        text: 'Main Volunteer Mailing List',
        description: 'The mailing list for all general CHIRP news and station business.',
        url: '#',
      },
    ],
  },
  {
    id: 'dj-items',
    title: 'DJ Items',
    description:
      'These links relate to DJ training sessions, helpful resources, and collaborative Spotify playlists',
    links: [
      {
        text: 'CHIRP DJ 202 - engineering, on-air presentation, and programming your show',
        description:
          'This is the general discussion portion of the DJ202 session, covering topics relating to engineering, on-air presentation, and programming your show',
        url: '#',
      },
      {
        text: 'CHIRP DJ202 - Advanced Techniques with Spotify, Traktor, and the DJDB',
        description:
          'This is a run-through of advanced techniques for playing single tracks, building collaborative playlists, searching and identifying label information in Spotify, setting cue points and searching in Traktor, and using filters in the DJDB.',
        url: '#',
      },
      {
        text: 'How to cue in Traktor when something is playing on the other deck',
        description:
          "Here's a video from Mike Nikolich made to show how to cue something in Traktor when you've already got a track playing on the other deck. Thanks, Mike!",
        url: '#',
      },
      {
        text: 'Show resources',
        description:
          'Upcoming show listings, local news, events, and music reviews, weather, and general info to help enhance your show',
        url: '#',
      },
    ],
  },
]

export default function WebsitesToRememberPage() {
  const { data: pageConfig } = usePageBySlug('websites-to-remember')

  const renderLinksContent = (links: { text: string; description?: string; url: string }[]) => {
    if (links.length === 0) return ''

    return links
      .map((link) => {
        if (link.description) {
          return `<p><strong><a href="${link.url}">${link.text}</a></strong> - ${link.description}</p>`
        }
        return `<p><a href="${link.url}">${link.text}</a></p>`
      })
      .join('')
  }

  // Extract header content (first block) and section cards (remaining blocks)
  const headerBlock = pageConfig?.layout?.[0]
  const sectionBlocks = pageConfig?.layout?.slice(1) || []

  return (
    <>
      <Helmet>
        <title>{pageConfig?.title || 'Websites to Remember | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="websites-to-remember-page">
        <section className="page-container">
          {headerBlock ? (
            <>
              <CrPageHeader
                eyebrowText="CHIRP RADIO - VOLUNTEERS"
                title={headerBlock.title as string}
                titleTag={(headerBlock.titleTag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') || 'h1'}
                titleSize="xl"
                showEyebrow={true}
                showActionButton={false}
              />
              {headerBlock.content && (
                <div
                  style={{ marginBottom: 'var(--cr-space-8)' }}
                  dangerouslySetInnerHTML={{
                    __html: lexicalToHtml(headerBlock.content),
                  }}
                />
              )}
            </>
          ) : (
            <>
              <CrPageHeader
                eyebrowText="CHIRP RADIO - VOLUNTEERS"
                title="Websites to Remember"
                titleTag="h1"
                titleSize="xl"
                showEyebrow={true}
                showActionButton={false}
              />
              <p style={{ marginBottom: 'var(--cr-space-8)' }}>
                Welcome to your volunteer resource hub! This page contains essential links and tools
                you'll need as a CHIRP volunteer. From logging your hours to booking the production
                studio, accessing DJ resources, and joining mailing lists — everything you need is
                organized here for easy reference. Bookmark this page and check back regularly for
                updates.
              </p>
            </>
          )}
        </section>

        <section className="page-layout-masonry">
          {sectionBlocks.length > 0
            ? sectionBlocks.map((block: any, index: number) => (
                <div key={index}>
                  <CrCard
                    variant="article"
                    imagePosition="none"
                    title={block.title}
                    titleSize="sm"
                    content={block.content}
                    showTicketButton={false}
                    showShareButton={false}
                    showCardDetails={false}
                    showEyebrow={false}
                    bannerBackgroundColor="light"
                  />
                </div>
              ))
            : websiteSections.map((section) => (
                <div key={section.id}>
                  <CrCard
                    variant="article"
                    imagePosition="none"
                    title={section.title}
                    titleSize="sm"
                    content={`<p>${section.description}</p>${section.links.length > 0 ? renderLinksContent(section.links) : ''}`}
                    showTicketButton={false}
                    showShareButton={false}
                    showCardDetails={false}
                    showEyebrow={false}
                    bannerBackgroundColor="light"
                  />
                </div>
              ))}
        </section>
      </div>
    </>
  )
}
