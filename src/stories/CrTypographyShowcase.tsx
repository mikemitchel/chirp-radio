// CrTypographyShowcase.tsx
import React from 'react';

export default function CrTypographyShowcase() {
  return (
    <div className="sg-section">      
      <div className="sg-component-grid">
        {/* Font Families */}
        <div className="sg-example-card">
          <h2>Font Families</h2>
          <div className="sg-margin-bottom">
            <div className="sg-font-antonio sg-font-sample">
              <div className="sg-font-info">
                <strong>Antonio</strong> - Display &amp; Headlines
                <a 
                  href="https://fonts.google.com/specimen/Antonio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="sg-font-link"
                >
                  View on Google Fonts
                </a>
              </div>
            </div>
            <div className="sg-font-roboto-serif sg-font-sample">
              <div className="sg-font-info">
                <strong>Roboto Serif</strong> - Body Text
                <a 
                  href="https://fonts.google.com/specimen/Roboto+Serif" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="sg-font-link"
                >
                  View on Google Fonts
                </a>
              </div>
            </div>
            <div className="sg-font-roboto sg-font-sample">
              <div className="sg-font-info">
                <strong>Roboto</strong> - Navigation &amp; UI
                <a 
                  href="https://fonts.google.com/specimen/Roboto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="sg-font-link"
                >
                  View on Google Fonts
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Title Hierarchy */}
        <div className="sg-example-card">
          <h2>Title Hierarchy</h2>
          <div className="cr-title-2xl sg-font-sample">Title 2XL</div>
          <div className="cr-title-xl sg-font-sample">Title XL</div>
          <div className="cr-title-lg sg-font-sample">Title LG</div>
          <div className="cr-title-md sg-font-sample">Title MD</div>
          <div className="cr-title-sm sg-font-sample">Title SM</div>
          <div className="cr-title-xs sg-font-sample">Title XS</div>
          <div className="cr-title-2xs sg-font-sample">Title 2XS</div>
          <div className="cr-title-eyebrow sg-font-sample">Eyebrow Text</div>
        </div>

        {/* Body Text */}
        <div className="sg-example-card">
          <h2>Body Text Styles</h2>
          <div className="cr-body-reg sg-margin-bottom">
            Body Regular - This is the default body text used for most content. It provides excellent readability for longer passages of text.
          </div>
          <div className="cr-body-sm sg-margin-bottom">
            Body Small - Used for secondary content, captions, or supporting text that needs to be smaller than regular body text.
          </div>
          <div className="cr-body-xs">
            Body XS - Used for fine print, disclaimers, or very small supplementary text.
          </div>
        </div>

        {/* Navigation */}
        <div className="sg-example-card">
          <h2>Navigation Styles</h2>
          <div className="cr-nav1 sg-font-sample">Nav Level 1</div>
          <div className="cr-nav2 sg-font-sample">Nav Level 2</div>
          <div className="cr-nav3 sg-font-sample">Nav Level 3</div>
          <div className="cr-nav-support sg-font-sample">Nav Support</div>
        </div>

        {/* Player Styles */}
        <div className="sg-example-card">
          <h2>Player Text Styles</h2>
          <div className="cr-player-song sg-font-sample">Song Title</div>
          <div className="cr-player-artist sg-font-sample">Artist Name</div>
          <div className="cr-player-album sg-font-sample">Album Name</div>
          <div className="cr-player-label sg-font-sample">Record Label • Label Name</div>
          <div className="cr-player-dj sg-font-sample">DJ: DJ Name</div>
        </div>

        {/* Typography Usage Guidelines */}
        <div className="sg-example-card">
          <h2 className="sg-card-title">Typography Usage Guidelines</h2>
          <div className="cr-body-reg sg-margin-bottom">
            <strong>Antonio Font:</strong> Used for all headlines, titles, buttons, and display text. Creates bold, impactful typography that represents the radio station's energetic personality.
          </div>
          <div className="cr-body-reg sg-margin-bottom">
            <strong>Roboto Serif:</strong> Used for body content, articles, and longer text passages. Provides excellent readability while maintaining a slightly editorial feel appropriate for radio content.
          </div>
          <div className="cr-body-reg">
            <strong>Roboto:</strong> Used for navigation, player interface, and UI elements. Clean and functional for interface components.
          </div>
        </div>
      </div>
    </div>
  );
}