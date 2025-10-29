// CrFooter.tsx
import CrSocialIcon from './CrSocialIcon'
import './CrFooter.css'
import { useSiteSettings } from '../hooks/useData'

interface CrFooterProps {
  onPrivacyPolicyClick?: () => void
  onTermsOfServiceClick?: () => void
  onSitemapClick?: () => void
  onCallibrityClick?: () => void
  onSocialClick?: (platform: string) => void
}

const CrFooter = ({
  onPrivacyPolicyClick,
  onTermsOfServiceClick,
  onSitemapClick,
  onCallibrityClick,
  onSocialClick,
}: CrFooterProps) => {
  const currentYear = new Date().getFullYear()
  const { data: siteSettings, loading } = useSiteSettings()

  const handleSocialClick = (platform: any) => {
    if (onSocialClick) {
      onSocialClick(platform)
    }
  }

  if (loading) return null

  return (
    <footer className="cr-footer cr-bg-textured cr-bg-rice-d100">
      <div className="cr-footer__container">
        {/* Left section - Copyright and Social */}
        <div className="cr-footer__left">
          <div className="cr-footer__copyright">
            <p>
              {siteSettings?.copyrightText?.replace('{year}', currentYear.toString()) ||
                `©2008–${currentYear} Chicago Independent Radio Project. CHIRP, CHIRP Radio, and Chicago Independent Radio Project are registered trademarks.`}
            </p>
          </div>

          <div className="cr-footer__attribution">
            <p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (onPrivacyPolicyClick) onPrivacyPolicyClick()
                }}
              >
                Privacy Policy
              </a>
              <span className="cr-footer__separator"> | </span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (onTermsOfServiceClick) onTermsOfServiceClick()
                }}
              >
                Terms of Service
              </a>
              <span className="cr-footer__separator"> | </span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (onSitemapClick) onSitemapClick()
                }}
              >
                Sitemap
              </a>
            </p>
          </div>

          <div className="cr-footer__social">
            {siteSettings?.socialLinks?.map((link: any) => (
              <CrSocialIcon
                key={link.platform}
                platform={link.platform}
                size={32}
                onClick={handleSocialClick}
                className="cr-footer__social-button"
              />
            ))}
          </div>
        </div>

        {/* Middle section - Event images */}
        <div className="cr-footer__middle">
          {siteSettings?.showChirpFilmFestLogo && (
            <button
              className="cr-footer__event-image cr-footer__event-image--film-fest"
              onClick={() => {
                if (siteSettings.chirpFilmFestLogoUrl) {
                  window.open(siteSettings.chirpFilmFestLogoUrl, '_blank')
                }
              }}
              aria-label="CHIRP Film Fest"
            >
              <img
                src={
                  siteSettings.chirpFilmFestLogo?.url ||
                  '/images/chirp-logos/chirp-film-fest.jpg'
                }
                alt="CHIRP Film Fest Logo"
              />
            </button>
          )}

          {siteSettings?.showFirstTimeLogo && (
            <button
              className="cr-footer__event-image cr-footer__event-image--first-time"
              onClick={() => {
                if (siteSettings.firstTimeLogoUrl) {
                  window.open(siteSettings.firstTimeLogoUrl, '_blank')
                }
              }}
              aria-label="First Time Listening"
            >
              <img
                src={
                  siteSettings.firstTimeLogo?.url || '/images/chirp-logos/FirstTimeLogo.png'
                }
                alt="First Time Listening Logo"
              />
            </button>
          )}
        </div>

        {/* Right section - Callibrity */}
        <div className="cr-footer__right">
          <div className="cr-footer__callibrity-text">
            <p>
              Chirp Radio web and mobile apps created by{' '}
              <a href="https://callibrity.com" target="_blank" rel="noopener noreferrer">
                callibrity.com
              </a>
              .
            </p>
          </div>

          <button
            className="cr-footer__callibrity-logo"
            onClick={onCallibrityClick}
            aria-label="Visit Callibrity website"
          >
            <img src="/images/callibrity-logo/Callibrity-Plum.svg" alt="Callibrity Logo" />
          </button>

          <div className="cr-footer__tagline">Curiosity is in Our Programming</div>
        </div>
      </div>
    </footer>
  )
}

export default CrFooter
