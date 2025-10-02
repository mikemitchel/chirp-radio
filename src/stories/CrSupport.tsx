// CrSupport.tsx
import React from 'react'
import './CrSupport.css'

interface CrSupportProps {
  showAdditionalLogos?: boolean
  additionalLogos?: Array<{ src: string; alt?: string }>
}

const CrSupport = ({ showAdditionalLogos, additionalLogos }: CrSupportProps) => {
  const logos = additionalLogos || []

  return (
    <div className="cr-support">
      <div className="cr-support__primary-text">
        <p>
          <span>CHIRP is partially supported by a </span>
          <span className="cr-support__grant-name">
            CityArts Grant from the City of Chicago Department of Cultural Affairs & Special Events
          </span>
          <span>, as well as through funding from the </span>
          <span className="cr-support__grant-name">Illinois Arts Council</span>
          <span>.</span>
        </p>
      </div>

      <div className="cr-support__main-logos">
        <div className="cr-support__logo cr-support__logo--dcase">
          <img
            className="cr-support__logo-image"
            src="/images/support-logos/DCASE-HORIZ-COLOR.png"
            alt="Chicago Department of Cultural Affairs & Special Events"
          />
        </div>

        <div className="cr-support__logo cr-support__logo--iac">
          <img
            className="cr-support__logo-image"
            src="/images/support-logos/Blk and Green IAC Logo.png"
            alt="Illinois Arts Council"
          />
        </div>
      </div>

      {showAdditionalLogos && logos.length > 0 && (
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
