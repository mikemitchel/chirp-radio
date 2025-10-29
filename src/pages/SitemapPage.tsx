// src/pages/SitemapPage.tsx
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrButton from '../stories/CrButton'
import { sitemapSections } from '../config/routes'

export default function SitemapPage() {
  const navigate = useNavigate()

  // Filter out hidden routes from sitemap
  const visibleSections = sitemapSections.map(section => ({
    ...section,
    routes: section.routes.filter(route => !route.hidden),
  })).filter(section => section.routes.length > 0)

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
          {visibleSections.map((section, index) => (
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
              {section.description && (
                <p style={{
                  font: 'var(--cr-body-sm)',
                  color: 'var(--cr-default-600)',
                  marginBottom: 'var(--cr-space-4)',
                }}>
                  {section.description}
                </p>
              )}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.routes.map((route, routeIndex) => (
                  <li key={routeIndex} style={{ marginBottom: 'var(--cr-space-2)' }}>
                    <CrButton
                      variant="text"
                      size="small"
                      color="default"
                      onClick={() => handleLinkClick(route.path)}
                    >
                      {route.label}
                      {route.protected && (
                        <span style={{
                          marginLeft: 'var(--cr-space-2)',
                          fontSize: '0.75em',
                          color: 'var(--cr-default-400)',
                        }}>
                          🔒
                        </span>
                      )}
                    </CrButton>
                    {route.description && (
                      <p style={{
                        font: 'var(--cr-body-xs)',
                        color: 'var(--cr-default-500)',
                        marginTop: 'var(--cr-space-1)',
                        marginLeft: 'var(--cr-space-3)',
                      }}>
                        {route.description}
                      </p>
                    )}
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
