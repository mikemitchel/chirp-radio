// CrMenuButton.tsx
import React from 'react'
import { PiDotsThreeOutlineVerticalFill, PiXBold } from 'react-icons/pi'
import './CrMenuButton.css'

interface CrMenuButtonProps {
  variant?: string
  layout?: string
  text?: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function CrMenuButton({
  variant = 'menu', // 'menu', 'close', 'dots'
  layout = 'icon-left', // 'icon-left', 'icon-right', 'icon-only'
  text = 'MENU',
  icon,
  onClick,
  className = '',
  disabled = false,
}: CrMenuButtonProps) {
  // Get the appropriate icon based on variant
  const getIcon = () => {
    if (icon) return icon // Custom icon override

    switch (variant) {
      case 'close':
        return <PiXBold />
      case 'dots':
        return <PiDotsThreeOutlineVerticalFill />
      case 'menu':
      default:
        // Default menu icon (3 dots in circle)
        return (
          <div className="cr-menu-button__dots-container">
            <div className="cr-menu-button__dot"></div>
            <div className="cr-menu-button__dot"></div>
            <div className="cr-menu-button__dot"></div>
          </div>
        )
    }
  }

  // Determine classes
  const buttonClasses = [
    'cr-menu-button',
    `cr-menu-button--${variant}`,
    `cr-menu-button--${layout}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={variant === 'close' ? 'Close' : 'Menu'}
    >
      <div className="cr-menu-button__icon">{getIcon()}</div>

      {layout !== 'icon-only' && <span className="cr-menu-button__text">{text}</span>}
    </button>
  )
}
