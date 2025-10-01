// CrMobileSplash.tsx
import React from 'react';
import CrLogo from './CrLogo';
import './CrMobileSplash.css';

interface CrMobileSplashProps {
  className?: string;
}

export default function CrMobileSplash({
  className = ''
}: CrMobileSplashProps) {
  return (
    <div className={`cr-mobile-splash ${className}`}>
      <div className="cr-mobile-splash__content">
        <CrLogo
          variant="vertical"
          color="white"
          className="cr-mobile-splash__logo"
        />
      </div>
    </div>
  );
}
