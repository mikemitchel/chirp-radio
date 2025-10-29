// CrSupport.tsx
import './CrSupport.css'
import { useSiteSettings } from '../hooks/useData'

interface CrSupportProps {
  showAdditionalLogos?: boolean
  additionalLogos?: Array<{ src: string; alt?: string }>
}

const CrSupport = ({ showAdditionalLogos, additionalLogos }: CrSupportProps) => {
  const { data: siteSettings, loading } = useSiteSettings()
  const logos = additionalLogos || []

  if (loading) return null

  // Convert Lexical rich text to HTML for support content
  const getSupportContentHtml = () => {
    if (!siteSettings?.supportContent) return null

    // If it's already a string, use it directly
    if (typeof siteSettings.supportContent === 'string') {
      return siteSettings.supportContent
    }

    // If it's a Lexical object, convert to simple HTML
    if ((siteSettings.supportContent as any).root?.children) {
      return (siteSettings.supportContent as any).root.children
        .map((node: any) => {
          if (node.type === 'paragraph') {
            const text = node.children?.map((child: any) => child.text || '').join('') || ''
            return `<p>${text}</p>`
          }
          return ''
        })
        .join('')
    }

    return null
  }

  const supportContentHtml = getSupportContentHtml()

  return (
    <div className="cr-support">
      {supportContentHtml ? (
        <div className="cr-support__primary-text">
          <div dangerouslySetInnerHTML={{ __html: supportContentHtml }} />
        </div>
      ) : (
        <div className="cr-support__primary-text">
          <p>
            <span>CHIRP is partially supported by a </span>
            <span className="cr-support__grant-name">
              CityArts Grant from the City of Chicago Department of Cultural Affairs & Special
              Events
            </span>
            <span>, as well as through funding from the </span>
            <span className="cr-support__grant-name">Illinois Arts Council</span>
            <span>.</span>
          </p>
        </div>
      )}

      <div className="cr-support__main-logos">
        {siteSettings?.showDCaseLogo && (
          <div className="cr-support__logo cr-support__logo--dcase">
            <a
              href={(siteSettings as any).dCaseLogoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="cr-support__logo-image"
                src={
                  String((siteSettings as any).dCaseLogo?.url ||
                  '/images/support-logos/DCASE-HORIZ-COLOR.png')
                }
                alt="Chicago Department of Cultural Affairs & Special Events"
              />
            </a>
          </div>
        )}

        {siteSettings?.showIlArtsCouncilLogo && (
          <div className="cr-support__logo cr-support__logo--iac">
            <a
              href={(siteSettings as any).ilArtsCouncilLogoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="cr-support__logo-image"
                src={
                  String((siteSettings as any).ilArtsCouncilLogo?.url ||
                  '/images/support-logos/Blk and Green IAC Logo.png')
                }
                alt="Illinois Arts Council"
              />
            </a>
          </div>
        )}
      </div>

      {/* Additional logos from Site Settings */}
      {(siteSettings as any)?.additionalLogos && (siteSettings as any).additionalLogos.length > 0 && (
        <div className="cr-support__additional-section">
          <div className="cr-support__additional-text">
            <p>Additional funding for CHIRP provided by...</p>
          </div>

          <div className="cr-support__additional-logos">
            {(siteSettings as any).additionalLogos
              .filter((logoItem: any) => logoItem.logo?.url) // Only show logos that have an image
              .slice(0, 3)
              .map((logoItem: any, index: number) => (
                <div key={logoItem.id || index} className="cr-support__additional-logo">
                  {logoItem.logoUrl ? (
                    <a href={logoItem.logoUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={logoItem.logo.url}
                        alt={logoItem.alt || `Additional supporter ${index + 1}`}
                        className="cr-support__additional-logo-image"
                      />
                    </a>
                  ) : (
                    <img
                      src={logoItem.logo.url}
                      alt={logoItem.alt || `Additional supporter ${index + 1}`}
                      className="cr-support__additional-logo-image"
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Legacy prop-based additional logos (fallback) */}
      {showAdditionalLogos && logos.length > 0 && !(siteSettings as any)?.additionalLogos && (
        <div className="cr-support__additional-section">
          <div className="cr-support__additional-text">
            <p>Additional funding for CHIRP provided by...</p>
          </div>

          <div className="cr-support__additional-logos">
            {logos.slice(0, 3).map((logo, index) => (
              <div key={index} className="cr-support__additional-logo">
                <img
                  src={logo.src}
                  alt={logo.alt || `Additional supporter ${index + 1}`}
                  className="cr-support__additional-logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

CrSupport.defaultProps = {
  showAdditionalLogos: false,
  additionalLogos: [],
}

export default CrSupport
