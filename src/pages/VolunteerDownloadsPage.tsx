// src/pages/VolunteerDownloadsPage.tsx
import { Helmet } from 'react-helmet-async'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import { usePageBySlug } from '../hooks/useData'

const downloadSections = [
  {
    id: 'production',
    title: 'Production processes, instructions, and tips',
    description: 'Instructions, tips, and guides relating to production-related tasks',
    links: [
      { text: 'Field Recorder checkout process', url: '#' },
      { text: 'Field recorder use with built-in mics', url: '#' },
      { text: 'Field recorder use with shotgun mic', url: '#' },
      { text: 'Field recorder use with standard mic', url: '#' },
      { text: 'First Time event-recording procedures', url: '#' },
      {
        text: "Why You're Doing Audio Levels Wrong, and Why It Really Does Matter (Current.org)",
        url: '#',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing, Partnerships, and Sponsorships',
    description: 'Media kit, partnership and DJ services info, sponsorship packages, etc.',
    links: [
      { text: 'Street Team Tips', url: '#' },
      { text: 'Tabling for CHIRP: Everything You Need To Know', url: '#' },
    ],
  },
  {
    id: 'skills',
    title: 'Skills and Tips',
    description: 'Articles on improving your skills and other interesting topics.',
    links: [
      {
        text: 'Getting Over the Fear of Asking for Donations (from grassrootsfundraising.org)',
        url: '#',
      },
      { text: 'Great DJ Tips', url: '#' },
      {
        text: 'Interview Questions to Avoid - wisdom from Brendan Kelly of the Lawrence Arms',
        url: '#',
      },
      { text: 'Tabling for CHIRP: Everything You Need To Know', url: '#' },
      { text: 'Ways to Promote via Social Media (from airmedia.org)', url: '#' },
    ],
  },
  {
    id: 'hr',
    title: 'HR Documents',
    description: 'Policy manuals and other documents',
    links: [{ text: 'CHIRP Policy Manual', url: '#' }],
  },
  {
    id: 'volunteer-files',
    title: 'Volunteer Files',
    description: 'Files for new volunteers to learn about how CHIRP works.',
    links: [
      { text: 'CHIRP Guidelines for Photography', url: '#' },
      { text: 'CHIRP Script Standards', url: '#' },
      { text: 'CHIRP Talking Points', url: '#' },
    ],
  },
  {
    id: 'fundraising',
    title: 'Fundraising Information and Donation Forms',
    description:
      "Here, you'll find forms for people who want to donate items to CHIRP, or who would like to make monetary donations offline.",
    links: [
      {
        text: 'Getting Over the Fear of Asking for Donations (from grassrootsfundraising.org)',
        url: '#',
      },
      { text: 'In-Kind Donation Form & Instructions', url: '#' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal Documents',
    description: 'Aenean lacinia bibendum nulla sed consectetur.',
    links: [],
  },
  {
    id: 'flyers',
    title: 'Flyers/Postcards',
    description:
      "We'll keep an updated list of files you can download and print out to help promote CHIRP events.",
    links: [],
  },
  {
    id: 'dj-forms',
    title: 'DJ Forms',
    description: 'Shift applications and more...',
    links: [
      { text: 'CHIRP New DJ Application', url: '#' },
      { text: 'DJ Rig Operating Instructions', url: '#' },
    ],
  },
  {
    id: 'logos',
    title: 'Logos',
    description:
      'These are various logos for CHIRP Radio and the Chicago Independent Radio Project.',
    links: [
      { text: 'CHIRP horizontal broadcast logo PDF', url: '#' },
      { text: 'CHIRP Record Album Logo PDF', url: '#' },
    ],
  },
]

export default function VolunteerDownloadsPage() {
  const { data: pageConfig } = usePageBySlug('volunteer-downloads')

  const renderLinksContent = (links: { text: string; url: string }[]) => {
    if (links.length === 0) return ''

    return links.map((link) => `<li><a href="${link.url}">${link.text}</a></li>`).join('')
  }

  // Extract header content (first block) and section cards (remaining blocks)
  const headerBlock = pageConfig?.layout?.[0]
  const sectionBlocks = pageConfig?.layout?.slice(1) || []

  return (
    <>
      <Helmet>
        <title>{pageConfig?.title || 'Volunteer Downloads | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="volunteer-downloads-page">
        <section className="page-container">
          {headerBlock ? (
            <>
              <CrPageHeader
                eyebrowText="CHIRP RADIO - VOLUNTEERS"
                title={headerBlock.title as string}
                titleTag={(headerBlock.titleTag || 'h1') as any}
                titleSize="xl"
                showEyebrow={true}
                showActionButton={false}
              />
              {headerBlock.content && (
                <div
                  style={{ marginBottom: 'var(--cr-space-8)' }}
                  dangerouslySetInnerHTML={{
                    __html: (headerBlock.content as any).root ?
                      (headerBlock.content as any).root.children.map((child: any) =>
                        `<p>${child.children.map((c: any) => c.text).join('')}</p>`
                      ).join('') : ''
                  }}
                />
              )}
            </>
          ) : (
            <>
              <CrPageHeader
                eyebrowText="CHIRP RADIO - VOLUNTEERS"
                title="Volunteer Downloads"
                titleTag="h1"
                titleSize="xl"
                showEyebrow={true}
                showActionButton={false}
              />
              <p style={{ marginBottom: 'var(--cr-space-8)' }}>
                Access essential documents, forms, guides, and resources for CHIRP volunteers. From production guides to marketing materials, DJ forms to legal documents — everything you need to support your volunteer work is here.
              </p>
            </>
          )}
        </section>

        <section className="page-layout-masonry">
          {sectionBlocks.length > 0 ? (
            sectionBlocks.map((block: any, index: number) => (
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
          ) : (
            downloadSections.map((section) => (
              <div key={section.id}>
                <CrCard
                  variant="article"
                  imagePosition="none"
                  title={section.title}
                  titleSize="sm"
                  content={`<p>${section.description}</p>${section.links.length > 0 ? `<ul>${renderLinksContent(section.links)}</ul>` : ''}`}
                  showTicketButton={false}
                  showShareButton={false}
                  showCardDetails={false}
                  showEyebrow={false}
                  bannerBackgroundColor="light"
                />
              </div>
            ))
          )}
        </section>
      </div>
    </>
  )
}
