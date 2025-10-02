// CrPageHeader.tsx
import React from 'react'
import CrButton from './CrButton'
import './CrPageHeader.css'

interface CrPageHeaderProps {
  eyebrowText?: string
  title?: string
  description?: string
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleSize?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'
  showEyebrow?: boolean
  showActionButton?: boolean
  actionButtonText?: string
  actionButtonIcon?: React.ReactNode
  onActionClick?: () => void
  className?: string
}

export default function CrPageHeader({
  eyebrowText = 'CHIRP Radio',
  title = 'Profile - Edit',
  titleTag = 'h1',
  titleSize = 'xl',
  showEyebrow = true,
  showActionButton = true,
  actionButtonText = 'Edit',
  actionButtonIcon,
  onActionClick,
  className = '',
}: CrPageHeaderProps) {
  const componentClasses = ['cr-page-header', className].filter(Boolean).join(' ')

  const titleClasses = ['cr-page-header__title', `cr-title-${titleSize}`].filter(Boolean).join(' ')

  const TitleTag = titleTag

  return (
    <header className={componentClasses}>
      <div className="cr-page-header__text">
        {showEyebrow && <div className="cr-page-header__eyebrow">{eyebrowText}</div>}
        <TitleTag className={titleClasses}>{title}</TitleTag>
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
  )
}
