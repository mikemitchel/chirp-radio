// src/pages/VolunteerDownloadsPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'

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
  const navigate = useNavigate()

  const renderLinksContent = (links: { text: string; url: string }[]) => {
    if (links.length === 0) return ''

    return links.map((link) => `<li><a href="${link.url}">${link.text}</a></li>`).join('')
  }

  return (
    <div className="volunteer-downloads-page">
      <section className="page-container">
        <CrPageHeader
          eyebrowText="CHIRP RADIO - VOLUNTEERS"
          title="Volunteer Downloads"
          titleTag="h1"
          titleSize="xl"
          showEyebrow={true}
          showActionButton={false}
        />

        <p style={{ marginBottom: 'var(--cr-space-8)' }}>
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean eu leo quam.
          Pellentesque ornare sem lacinia quam venenatis vestibulum. Praesent commodo cursus magna,
          vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
          faucibus dolor auctor. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec
          id elit non mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque ornare sem
          lacinia quam venenatis vestibulum.
        </p>
      </section>

      <section className="page-layout-masonry">
        {downloadSections.map((section) => (
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
        ))}
      </section>
    </div>
  )
}
