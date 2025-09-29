// CrLogo.jsx
import React from 'react';
import './CrLogo.css';

export default function CrLogo({ 
  variant = 'horizontal', // 'horizontal', 'horizontal-reversed', 'vertical', 'record', 'bird'
  color = 'primary', // 'primary' or 'white'
  className = ''
}) {
  
  // Map variants to their corresponding SVG files
  const getLogoSrc = (variant) => {
    const logoMap = {
      'horizontal': '../src/assets/chirp-logos/CHIRP_Logo_FM URL_horizontal.svg',
      'horizontal-reversed': '../src/assets/chirp-logos/CHIRP_Logo_FM URL_horizontal-reversed.svg',
      'vertical': '../src/assets/chirp-logos/CHIRP_Logo_FM URL_vertical.svg', 
      'record': '../src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg',
      'bird': '../src/assets/chirp-logos/CHIRP-bird.svg'
    };
    return logoMap[variant] || logoMap['horizontal'];
  };

  // Get alt text based on variant and color
  const getAltText = (variant, color) => {
    const baseText = {
      'horizontal': 'CHIRP Radio horizontal logo',
      'horizontal-reversed': 'CHIRP Radio horizontal reversed logo',
      'vertical': 'CHIRP Radio vertical logo',
      'record': 'CHIRP Radio record logo', 
      'bird': 'CHIRP Radio bird icon'
    };
    
    const base = baseText[variant] || baseText['horizontal'];
    return color === 'white' ? `${base} (white)` : base;
  };

  // Determine the CSS class for the logo
  const getLogoClass = () => {
    const colorClass = color === 'white' ? 'cr-logo--white' : 'cr-logo--primary';
    return `cr-logo cr-logo--${variant} ${colorClass} ${className}`;
  };

  // Generate aria-label for accessibility
  const getAriaLabel = () => {
    const logoType = variant.charAt(0).toUpperCase() + variant.slice(1).replace('-', ' ');
    const colorVariant = color === 'white' ? 'white' : 'primary';
    return `CHIRP Radio ${logoType} logo (${colorVariant})`;
  };

  return (
    <div className={getLogoClass()}>
      <img 
        src={getLogoSrc(variant)}
        alt={getAltText(variant, color)}
        className="cr-logo__image"
        role="img" 
        aria-label={getAriaLabel()}
      />
    </div>
  );
}