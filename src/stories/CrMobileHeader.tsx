// CrMobileHeader.tsx
import React from 'react'
import CrLogo from './CrLogo'
import CrMenuButton from './CrMenuButton'
import './CrMobileHeader.css'

interface CrMobileHeaderProps {
  pageTitle?: string
  onMenuClick?: () => void
  onLogoClick?: () => void
  variant?: 'default' | 'transparent'
}

export default function CrMobileHeader({
  pageTitle = 'Page Title',
  onMenuClick,
  onLogoClick,
  variant = 'default',
}: CrMobileHeaderProps) {
  const headerClasses = ['cr-mobile-header', `cr-mobile-header--${variant}`]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={headerClasses}>
      <div className="cr-mobile-header__logo" onClick={onLogoClick}>
        <CrLogo variant="vertical" className="cr-mobile-header__logo-image" />
      </div>
      <div className="cr-mobile-header__page-title">{pageTitle}</div>
      <CrMenuButton variant="menu" layout="icon-right" text="MENU" onClick={onMenuClick} />
    </div>
  )
}
