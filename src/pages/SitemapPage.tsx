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
          <div className="sitemap-section">
            <h2 className="cr-title-lg mb-3">Home</h2>
            <ul className="sitemap-list">
              <li>
                <button onClick={() => handleLinkClick('/')} className="link-button">
                  • Landing Page
                </button>
              </li>
            </ul>
          </div>

          {visibleSections.map((section, index) => (
            <div key={index} className="sitemap-section">
              <h2 className="cr-title-lg mb-3">{section.title}</h2>
              <ul className="sitemap-list">
                {section.routes.map((route, routeIndex) => (
                  <li key={routeIndex}>
                    <button onClick={() => handleLinkClick(route.path)} className="link-button">
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
