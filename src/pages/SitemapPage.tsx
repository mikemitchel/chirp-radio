// src/pages/SitemapPage.tsx
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import { sitemapSections } from '../config/routes'

export default function SitemapPage() {
  const navigate = useNavigate()

  // Filter out hidden routes from sitemap
  const visibleSections = sitemapSections
    .map((section) => ({
      ...section,
      routes: section.routes.filter((route) => !route.hidden),
    }))
    .filter((section) => section.routes.length > 0)

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
        <div>
          <div style={{ marginBottom: 'var(--cr-space-8)' }}>
            <h2 className="cr-title-lg" style={{ marginBottom: 'var(--cr-space-3)' }}>
              Home
            </h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginLeft: 'var(--cr-space-4)',
              }}
            >
              <li style={{ marginBottom: 'var(--cr-space-2)' }}>
                <button
                  onClick={() => handleLinkClick('/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'var(--cr-body-md)',
                    color: 'var(--cr-primary-500)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textAlign: 'left',
                  }}
                >
                  • Landing Page
                </button>
              </li>
            </ul>
          </div>

          {visibleSections.map((section, index) => (
            <div key={index} style={{ marginBottom: 'var(--cr-space-8)' }}>
              <h2 className="cr-title-lg" style={{ marginBottom: 'var(--cr-space-3)' }}>
                {section.title}
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  marginLeft: 'var(--cr-space-4)',
                }}
              >
                {section.routes.map((route, routeIndex) => (
                  <li key={routeIndex} style={{ marginBottom: 'var(--cr-space-2)' }}>
                    <button
                      onClick={() => handleLinkClick(route.path)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        font: 'var(--cr-body-md)',
                        color: 'var(--cr-primary-500)',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textAlign: 'left',
                      }}
                    >
                      • {route.label}
                      {route.protected && ' 🔒'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
