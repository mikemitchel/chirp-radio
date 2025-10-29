// CrToast.tsx
import React, { useEffect } from 'react'
import {
  PiMinusSquare,
  PiCheckSquare,
  PiInfo,
  PiWarningCircle,
  PiFloppyDiskLight,
} from 'react-icons/pi'
import CrMenuButton from './CrMenuButton'
import './CrToast.css'

interface CrToastProps {
  type?: 'success' | 'remove' | 'add' | 'save' | 'info' | 'warning' | 'error'
  title?: string
  message?: string
  linkText?: string
  linkHref?: string
  onLinkClick?: () => void
  onClose?: () => void
  showDismiss?: boolean
  isVisible?: boolean
  duration?: number
}

export default function CrToast({
  type = 'success',
  title = 'Action completed',
  message = '',
  linkText = '',
  linkHref = '#',
  onLinkClick,
  onClose,
  showDismiss = true,
  isVisible = true,
  duration = 5000,
}: CrToastProps) {
  const [isFadingOut, setIsFadingOut] = React.useState(false)

  useEffect(() => {
    // Reset fade state when becoming visible
    if (isVisible) {
      setIsFadingOut(false)
    }

    if (isVisible && duration > 0 && onClose) {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true)
      }, duration - 300) // Start fade 300ms before close

      const closeTimer = setTimeout(() => {
        onClose()
      }, duration)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(closeTimer)
      }
    }
  }, [isVisible, duration, onClose])
  const getIcon = () => {
    switch (type) {
      case 'remove':
        return <PiMinusSquare />
      case 'success':
      case 'add':
        return <PiCheckSquare />
      case 'save':
        return <PiFloppyDiskLight />
      case 'info':
        return <PiInfo />
      case 'warning':
      case 'error':
        return <PiWarningCircle />
      default:
        return <PiInfo />
    }
  }

  const getColorClass = () => {
    switch (type) {
      case 'remove':
      case 'success':
      case 'add':
      case 'save':
        return 'cr-toast--success'
      case 'info':
        return 'cr-toast--info'
      case 'warning':
        return 'cr-toast--warning'
      case 'error':
        return 'cr-toast--error'
      default:
        return 'cr-toast--info'
    }
  }

  const handleLinkClick = (e: any) => {
    if (onLinkClick) {
      e.preventDefault()
      onLinkClick()
    }
  }

  const handleDismiss = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div
      className={`cr-toast ${getColorClass()} ${isFadingOut ? 'cr-toast--fade-out' : ''}`}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      style={{ '--toast-duration': `${duration}ms` } as React.CSSProperties}
    >
      <div className="cr-toast__content">
        <div className="cr-toast__icon">{getIcon()}</div>
        <div className="cr-toast__text">
          <div className="cr-toast__title">{title}</div>
          {message && (
            <div className="cr-toast__message">
              {message}
              {linkText && (
                <>
                  {' '}
                  <a href={linkHref} className="cr-toast__link" onClick={handleLinkClick}>
                    {linkText}
                  </a>
                  .
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showDismiss && (
        <div className="cr-toast__dismiss">
          <CrMenuButton
            variant="close"
            layout="icon-only"
            onClick={handleDismiss}
            className="cr-toast__dismiss-button"
          />
        </div>
      )}
    </div>
  )
}
