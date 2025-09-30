// CrPageHeader.tsx
import React from 'react';
import CrButton from './CrButton';
import './CrPageHeader.css';

export default function CrPageHeader({
  eyebrowText = "CHIRP Radio",
  title = "Profile - Edit",
  showEyebrow = true,
  showActionButton = true,
  actionButtonText = "Edit",
  actionButtonIcon,
  onActionClick,
  className = ""
}) {
  const componentClasses = [
    'cr-page-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <header className={componentClasses}>
      <div className="cr-page-header__text">
        {showEyebrow && (
          <div className="cr-page-header__eyebrow">{eyebrowText}</div>
        )}
        <h1 className="cr-page-header__title">{title}</h1>
      </div>
      
      {showActionButton && (
        <div className="cr-page-header__action">
          <CrButton
            size="small"
            variant="outline"
            color="default"
            leftIcon={actionButtonIcon}
            onClick={onActionClick}
          >
            {actionButtonText}
          </CrButton>
        </div>
      )}
    </header>
  );
}