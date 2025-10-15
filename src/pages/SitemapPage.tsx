// src/pages/SitemapPage.tsx
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrButton from '../stories/CrButton'

export default function SitemapPage() {
  const navigate = useNavigate()

  const sitemapSections = [
    {
      title: 'Listen & Discover',
      links: [
        { label: 'Listen Live', path: '/listen' },
        { label: 'Playlist', path: '/playlist' },
        { label: 'Recently Played', path: '/playlist' },
        { label: 'DJs', path: '/djs' },
        { label: 'Schedule', path: '/schedule' },
        { label: 'Podcast', path: '/podcast' },
        { label: 'Other Ways to Listen', path: '/other-ways-to-listen' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Events', path: '/events' },
        { label: 'Articles', path: '/articles' },
        { label: 'About CHIRP', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Support CHIRP',
      links: [
        { label: 'Donate', path: '/donate' },
        { label: 'Ways to Give', path: '/ways-to-give' },
        { label: 'Vinyl Circle', path: '/vinyl-circle' },
        { label: 'Car Donation', path: '/car-donation' },
        { label: 'Shop', path: '/shop' },
      ],
    },
    {
      title: 'Get Involved',
      links: [
        { label: 'Become a Volunteer', path: '/volunteer' },
        { label: 'Request a Song', path: '/request' },
        { label: 'Volunteer Resources', path: '/volunteer/resources' },
        { label: 'Volunteer Calendar', path: '/volunteer/calendar' },
        { label: 'Volunteer Downloads', path: '/volunteer/downloads' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Account Settings', path: '/account-settings' },
        { label: 'Your Collection', path: '/my-collection' },
      ],
    },
    {
      title: 'Legal & Information',
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms of Service', path: '/terms-of-service' },
        { label: 'Websites to Remember', path: '/volunteer/websites' },
      ],
    },
  ]

  const handleLinkClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="sitemap-page">
      <section className="page-container">
        <CrPageHeader
          eyebrowText="NAVIGATION"
          title="Sitemap"
          showEyebrow={true}
          showActionButton={false}
          titleSize="xl"
          titleTag="h1"
        />
      </section>

      <section className="page-container">
        <p style={{
          font: 'var(--cr-body-lg)',
          color: 'var(--cr-default-600)',
          marginBottom: 'var(--cr-space-8)',
          textAlign: 'center'
        }}>
          Browse all pages and sections of the CHIRP Radio website.
        </p>

        <div className="grid-2col-equal" style={{ gap: 'var(--cr-space-6)' }}>
          {sitemapSections.map((section, index) => (
            <div
              key={index}
              style={{
                background: 'var(--cr-paper)',
                padding: 'var(--cr-space-6)',
                borderRadius: 'var(--cr-radius-md)',
                border: '1px solid var(--cr-border)',
              }}
            >
              <h2 style={{
                font: 'var(--cr-h3)',
                color: 'var(--cr-primary-500)',
                marginBottom: 'var(--cr-space-4)',
                paddingBottom: 'var(--cr-space-2)',
                borderBottom: '2px solid var(--cr-primary-500)',
              }}>
                {section.title}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: 'var(--cr-space-2)' }}>
                    <CrButton
                      variant="text"
                      size="small"
                      color="default"
                      onClick={() => handleLinkClick(link.path)}
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {link.label}
                    </CrButton>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          padding: 'var(--cr-space-8) var(--cr-space-4)',
          background: 'var(--cr-default-100)',
          borderRadius: 'var(--cr-radius-md)',
          marginTop: 'var(--cr-space-8)',
        }}>
          <p style={{ font: 'var(--cr-body-lg)', color: 'var(--cr-default-600)', margin: 0 }}>
            Can't find what you're looking for?{' '}
            <CrButton
              variant="text"
              size="small"
              color="primary"
              onClick={() => handleLinkClick('/contact')}
            >
              Contact us
            </CrButton>{' '}
            and we'll be happy to help.
          </p>
        </div>
      </section>
    </div>
  )
}
