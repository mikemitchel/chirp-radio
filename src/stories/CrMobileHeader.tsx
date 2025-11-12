// CrMobileHeader.tsx
import React from 'react'
import { Capacitor } from '@capacitor/core'
import CrLogo from './CrLogo'
import CrMenuButton from './CrMenuButton'
import './CrMobileHeader.css'

interface CrMobileHeaderProps {
  pageTitle?: string
  onMenuClick?: () => void
  onLogoClick?: () => void
  variant?: 'default' | 'transparent'
  actionButton?: React.ReactNode
}

export default function CrMobileHeader({
  pageTitle = 'Page Title',
  onMenuClick,
  onLogoClick,
  variant = 'default',
  actionButton,
}: CrMobileHeaderProps) {
  const isAndroid = Capacitor.getPlatform() === 'android'
  const headerClasses = [
    'cr-mobile-header',
    `cr-mobile-header--${variant}`,
    isAndroid ? 'cr-mobile-header--android' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={headerClasses}>
      <div className="cr-mobile-header__logo" onClick={onLogoClick}>
        <CrLogo variant="vertical" className="cr-mobile-header__logo-image" />
      </div>
      <div className="cr-mobile-header__title-section">
        <div className="cr-mobile-header__page-title">{pageTitle}</div>
        {actionButton && <div className="cr-mobile-header__action">{actionButton}</div>}
      </div>
      <CrMenuButton variant="menu" layout="icon-right" text="MENU" onClick={onMenuClick} />
    </div>
  )
}
