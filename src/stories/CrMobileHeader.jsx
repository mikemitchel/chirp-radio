// CrMobileHeader.tsx
import React from 'react';
import CrLogo from './CrLogo';
import CrMenuButton from './CrMenuButton';
import './CrMobileHeader.css';

export default function CrMobileHeader({
  pageTitle = 'Page Title',
  onMenuClick,
  onLogoClick
}) {
  return (
    <div className="cr-mobile-header">
      <div className="cr-mobile-header__logo" onClick={onLogoClick}>
        <CrLogo variant="vertical" className="cr-mobile-header__logo-image" />
      </div>
      <div className="cr-mobile-header__page-title">{pageTitle}</div>
      <CrMenuButton
        variant="menu"
        layout="icon-right"
        text="MENU"
        onClick={onMenuClick}
      />
    </div>
  );
}