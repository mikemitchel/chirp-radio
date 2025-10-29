// CrAccountSettingsPage.tsx
import CrSettingsToggles from './CrSettingsToggles'
import CrButton from './CrButton'
import CrSocialIcon from './CrSocialIcon'
import { PiPaperclip, PiNotepad } from 'react-icons/pi'
import './CrAccountSettingsPage.css'

interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  bluesky?: string
  linkedin?: string
}

interface CrAccountSettingsPageProps {
  isLoggedIn?: boolean
  userEmail?: string
  firstName?: string
  lastName?: string
  djName?: string
  showName?: string
  location?: string
  avatarSrc?: string
  avatarAlt?: string
  memberSince?: string
  socialLinks?: SocialLinks
  streamingQuality?: string
  onStreamingQualityChange?: (quality: string) => void
  pushNotifications?: boolean
  onPushNotificationsChange?: (checked: boolean) => void
  darkMode?: boolean
  onDarkModeChange?: (checked: boolean) => void
  onLogin?: () => void
  onLogout?: () => void
  onSignUp?: () => void
  onForgotPassword?: () => void
  onShareApp?: () => void
  onLikeAppStore?: () => void
  onAppSupport?: () => void
  onTermsPrivacy?: () => void
  onEditProfile?: () => void
}

export default function CrAccountSettingsPage({
  isLoggedIn = false,
  userEmail = 'account@gmail.com',
  firstName = 'John',
  lastName = 'Dough',
  djName,
  showName,
  location = 'Chicago, Illinois',
  avatarSrc = 'https://i.pravatar.cc/150?img=33',
  avatarAlt = 'User avatar',
  memberSince,
  socialLinks,
  streamingQuality = '128',
  onStreamingQualityChange,
  pushNotifications = false,
  onPushNotificationsChange,
  darkMode = false,
  onDarkModeChange,
  onLogin,
  onLogout,
  onSignUp,
  onForgotPassword,
  onShareApp,
  onLikeAppStore,
  onAppSupport,
  onTermsPrivacy,
  ...props
}: CrAccountSettingsPageProps) {
  return (
    <div className="cr-account-settings-page" {...props}>
      <div className="cr-account-settings-page__content">
        {/* Profile Header - only shown when logged in */}
        {isLoggedIn && (
          <section className="cr-account-settings-page__profile">
            <div className="cr-account-settings-page__profile-header">
              <h2 className="cr-account-settings-page__name">
                {firstName} {lastName}
              </h2>
              <div className="cr-account-settings-page__avatar-container">
                <div className="cr-account-settings-page__avatar">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={avatarAlt}
                      className="cr-account-settings-page__avatar-image"
                    />
                  ) : (
                    <div className="cr-account-settings-page__avatar-placeholder">
                      <svg className="cr-account-settings-page__avatar-icon" viewBox="0 0 100 100">
                        <circle cx="50" cy="35" r="18" />
                        <path d="M20 80 Q20 65 50 65 Q80 65 80 80 L80 85 Q80 90 75 90 L25 90 Q20 90 20 85 Z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="cr-account-settings-page__details">
              {djName && (
                <div className="cr-account-settings-page__detail-item">
                  <span className="cr-account-settings-page__detail-label">DJ Name:</span>
                  <span className="cr-account-settings-page__detail-value">{djName}</span>
                </div>
              )}

              {showName && (
                <div className="cr-account-settings-page__detail-item">
                  <span className="cr-account-settings-page__detail-label">Show Name:</span>
                  <span className="cr-account-settings-page__detail-value">{showName}</span>
                </div>
              )}

              <div className="cr-account-settings-page__detail-item">
                <span className="cr-account-settings-page__detail-label">Location:</span>
                <span className="cr-account-settings-page__detail-value">{location}</span>
              </div>

              <div className="cr-account-settings-page__detail-item">
                <span className="cr-account-settings-page__detail-label">Email:</span>
                <div className="cr-account-settings-page__detail-value-with-action">
                  <span className="cr-account-settings-page__detail-value">{userEmail}</span>
                  <CrButton variant="text" color="default" size="small" onClick={onLogout}>
                    log out
                  </CrButton>
                </div>
              </div>

              {memberSince && (
                <div className="cr-account-settings-page__detail-item">
                  <span className="cr-account-settings-page__detail-label">Member Since:</span>
                  <span className="cr-account-settings-page__detail-value">
                    {new Date(memberSince).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {socialLinks && Object.keys(socialLinks).length > 0 && (
                <div className="cr-account-settings-page__social-links">
                  {socialLinks.facebook && (
                    <div className="cr-account-settings-page__social-link-item">
                      <CrSocialIcon platform="facebook" url={socialLinks.facebook} size={32} />
                      <a
                        href={
                          socialLinks.facebook.startsWith('http')
                            ? socialLinks.facebook
                            : `https://${socialLinks.facebook}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cr-account-settings-page__social-url"
                      >
                        {socialLinks.facebook}
                      </a>
                    </div>
                  )}
                  {socialLinks.instagram && (
                    <div className="cr-account-settings-page__social-link-item">
                      <CrSocialIcon platform="instagram" url={socialLinks.instagram} size={32} />
                      <a
                        href={
                          socialLinks.instagram.startsWith('http')
                            ? socialLinks.instagram
                            : `https://${socialLinks.instagram}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cr-account-settings-page__social-url"
                      >
                        {socialLinks.instagram}
                      </a>
                    </div>
                  )}
                  {socialLinks.twitter && (
                    <div className="cr-account-settings-page__social-link-item">
                      <CrSocialIcon platform="twitter" url={socialLinks.twitter} size={32} />
                      <a
                        href={
                          socialLinks.twitter.startsWith('http')
                            ? socialLinks.twitter
                            : `https://${socialLinks.twitter}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cr-account-settings-page__social-url"
                      >
                        {socialLinks.twitter}
                      </a>
                    </div>
                  )}
                  {socialLinks.linkedin && (
                    <div className="cr-account-settings-page__social-link-item">
                      <CrSocialIcon platform="linkedin" url={socialLinks.linkedin} size={32} />
                      <a
                        href={
                          socialLinks.linkedin.startsWith('http')
                            ? socialLinks.linkedin
                            : `https://${socialLinks.linkedin}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cr-account-settings-page__social-url"
                      >
                        {socialLinks.linkedin}
                      </a>
                    </div>
                  )}
                  {socialLinks.bluesky && (
                    <div className="cr-account-settings-page__social-link-item">
                      <CrSocialIcon platform="bluesky" url={socialLinks.bluesky} size={32} />
                      <a
                        href={
                          socialLinks.bluesky.startsWith('http')
                            ? socialLinks.bluesky
                            : `https://${socialLinks.bluesky}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cr-account-settings-page__social-url"
                      >
                        {socialLinks.bluesky}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Settings Sections */}
        <div className="cr-account-settings-page__settings">
          <CrSettingsToggles
            streamingQuality={streamingQuality}
            onStreamingQualityChange={onStreamingQualityChange}
            pushNotifications={pushNotifications}
            onPushNotificationsChange={onPushNotificationsChange}
            darkMode={darkMode as unknown as 'light' | 'dark' | 'device' | undefined}
            onDarkModeChange={onDarkModeChange as ((mode: 'light' | 'dark' | 'device') => void) | undefined}
          />
        </div>

        {/* Account Section - only shown when not logged in */}
        {!isLoggedIn && (
          <div className="cr-account-settings-page__account-section">
            <span className="cr-account-settings-page__account-label">Account</span>
            <div className="cr-account-settings-page__account-action">
              <CrButton variant="solid" color="primary" size="medium" onClick={onLogin}>
                log in
              </CrButton>
              <CrButton variant="text" color="default" size="xsmall" onClick={onForgotPassword}>
                forgot password
              </CrButton>
            </div>
          </div>
        )}

        {/* Sign Up Section - only shown when not logged in */}
        {!isLoggedIn && (
          <div className="cr-account-settings-page__signup-section">
            <h2 className="cr-account-settings-page__signup-title">
              Don't have a Chirp Radio Account?
            </h2>
            <p className="cr-account-settings-page__signup-description">
              A profile allows you to interact with the site in all sorts of helpful ways:
            </p>
            <ul className="cr-account-settings-page__signup-benefits">
              <li>
                You can add songs to your collection that you hear across our web and mobile
                applications so you don't forget them
              </li>
              <li>Your can save your information for store purchases and donations</li>
              <li>Your profile settings will be saved between your mobile and web experiences</li>
            </ul>
            <p className="cr-account-settings-page__signup-cta">
              So create your profile today, and start getting the maximum benefit from
              CHIRPradio.org!
            </p>
            <CrButton variant="solid" color="secondary" size="medium" onClick={onSignUp}>
              sign up
            </CrButton>
          </div>
        )}

        {/* App Promotion Section */}
        <div className="cr-account-settings-page__app-section">
          <h3 className="cr-account-settings-page__app-title">Like the CHIRP Radio App?</h3>
          <div className="cr-account-settings-page__app-actions">
            <CrButton variant="outline" color="default" size="small" onClick={onShareApp}>
              share app on social media
            </CrButton>
            <CrButton variant="outline" color="default" size="small" onClick={onLikeAppStore}>
              like on app store
            </CrButton>
          </div>
        </div>

        {/* Footer Links */}
        <div className="cr-account-settings-page__footer-links">
          <CrButton
            variant="text"
            color="default"
            size="small"
            leftIcon={<PiPaperclip />}
            onClick={onAppSupport}
          >
            app support & feedback
          </CrButton>
          <CrButton
            variant="text"
            color="default"
            size="small"
            leftIcon={<PiNotepad />}
            onClick={onTermsPrivacy}
          >
            terms & privacy
          </CrButton>
        </div>
      </div>
    </div>
  )
}
