// CrFooter.tsx
import React from 'react';
import CrSocialIcon from './CrSocialIcon';
import chirpFilmFest from '../src/assets/chirp-logos/chirp-film-fest.jpg';
import firstTimeLogo from '../src/assets/chirp-logos/FirstTimeLogo.png';
import callibrityLogo from '../src/assets/callibrity-logo/Callibrity-Plum.svg';
import './CrFooter.css';

const CrFooter = ({ 
  onPrivacyPolicyClick,
  onTermsOfServiceClick,
  onSitemapClick,
  onCallibrityClick,
  onSocialClick
}) => {
  const socialPlatforms = ['facebook', 'instagram', 'twitter', 'bluesky', 'linkedin'];

  const handleSocialClick = (platform) => {
    if (onSocialClick) {
      onSocialClick(platform);
    }
  };

  return (
    <footer className="cr-footer cr-bg-textured cr-bg-rice-d100">
      <div className="cr-footer__container">
        {/* Left section - Copyright and Social */}
        <div className="cr-footer__left">
          <div className="cr-footer__copyright">
            <p>
              ©2008–2025 Chicago Independent Radio Project. CHIRP, CHIRP Radio, and Chicago Independent Radio Project are registered trademarks.
            </p>
          </div>

          <div className="cr-footer__social">
            {socialPlatforms.map(platform => (
              <CrSocialIcon 
                key={platform}
                platform={platform}
                size={32}
                onClick={handleSocialClick}
                className="cr-footer__social-button"
              />
            ))}
          </div>
        </div>

        {/* Middle section - Event images */}
        <div className="cr-footer__middle">
          <button 
            className="cr-footer__event-image cr-footer__event-image--film-fest"
            onClick={() => console.log('Film Fest image clicked')}
            aria-label="CHIRP Film Fest"
          >
            <img 
              src={chirpFilmFest}
              alt="CHIRP Film Fest Logo"
            />
          </button>

          <button 
            className="cr-footer__event-image cr-footer__event-image--first-time"
            onClick={() => console.log('First Time Listening image clicked')}
            aria-label="First Time Listening"
          >
            <img 
              src={firstTimeLogo}
              alt="First Time Listening Logo"
            />
          </button>
        </div>

        {/* Right section - Attribution and Callibrity */}
        <div className="cr-footer__right">
          <div className="cr-footer__attribution">
            <p>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onPrivacyPolicyClick) onPrivacyPolicyClick();
                }}
              >
                Privacy Policy
              </a>
              <span className="cr-footer__separator"> | </span>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onTermsOfServiceClick) onTermsOfServiceClick();
                }}
              >
                Terms of Service
              </a>
              <span className="cr-footer__separator"> | </span>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSitemapClick) onSitemapClick();
                }}
              >
                Sitemap
              </a>
            </p>
          </div>

          <button 
            className="cr-footer__callibrity-logo"
            onClick={onCallibrityClick}
            aria-label="Visit Callibrity website"
          >
            <img 
              src={callibrityLogo}
              alt="Callibrity Logo"
            />
          </button>

          <div className="cr-footer__tagline">
            Curiosity is in Our Programming
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CrFooter;