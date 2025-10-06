// CrAdSpace.tsx
import { useState, useRef, useEffect } from 'react'
import { PiEye, PiEyeSlash } from 'react-icons/pi'
import './CrAdSpace.css'

interface CrAdSpaceProps {
  size?: string
  customWidth?: number
  customHeight?: number
  contentType?: string
  src?: string
  alt?: string
  htmlContent?: string
  videoSrc?: string
  embedCode?: string
  href?: string
  target?: string
  className?: string
  loading?: boolean
  showLabel?: boolean
  onLoad?: () => void
  onError?: () => void
  onClick?: (e: any) => void
  onImpression?: () => void
}

const CrAdSpace = ({
  size = 'large-rectangle',
  customWidth,
  customHeight,
  contentType = 'image',
  src,
  alt = 'Advertisement',
  htmlContent,
  videoSrc,
  embedCode,
  href,
  target = '_blank',
  className = '',
  loading = false,
  showLabel = true,
  onLoad,
  onError,
  onClick,
  onImpression,
  ...props
}: CrAdSpaceProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [impressionTracked, setImpressionTracked] = useState(false)
  const containerRef = useRef(null)

  // Predefined ad sizes
  const adSizes = {
    'large-rectangle': { width: 336, height: 280, label: 'Large Rectangle' },
    leaderboard: { width: 728, height: 90, label: 'Leaderboard' },
    'medium-rectangle': { width: 300, height: 250, label: 'Medium Rectangle' },
    'mobile-banner': { width: 300, height: 50, label: 'Mobile Banner' },
    'wide-skyscraper': { width: 160, height: 600, label: 'Wide Skyscraper' },
    custom: {
      width: customWidth || 300,
      height: customHeight || 250,
      label: 'Custom Size',
    },
  }

  const currentSize = adSizes[size] || adSizes['large-rectangle']
  const isSkyscraper = size === 'wide-skyscraper'

  // Intersection Observer for impression tracking
  useEffect(() => {
    if (!onImpression || impressionTracked) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !impressionTracked) {
          setImpressionTracked(true)
          onImpression()
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [onImpression, impressionTracked])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
    onError?.()
  }

  const handleClick = (e) => {
    onClick?.(e)
    // If href is provided and no custom click handler prevents default
    if (href && !e.defaultPrevented) {
      window.open(href, target)
      e.preventDefault()
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="cr-ad-space__loading">
          <div className="cr-ad-space__loading-spinner" />
          <span className="cr-ad-space__loading-text">Loading ad...</span>
        </div>
      )
    }

    if (hasError) {
      return (
        <div className="cr-ad-space__error">
          <PiEyeSlash className="cr-ad-space__error-icon" />
          <span className="cr-ad-space__error-text">Ad failed to load</span>
        </div>
      )
    }

    switch (contentType) {
      case 'image':
        return src ? (
          <img
            src={src}
            alt={alt}
            className="cr-ad-space__image"
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        ) : (
          <div className="cr-ad-space__placeholder">
            <PiEye className="cr-ad-space__placeholder-icon" />
            <span className="cr-ad-space__placeholder-text">
              {showLabel && currentSize.label}
              <br />
              {currentSize.width} × {currentSize.height}px
            </span>
          </div>
        )

      case 'video':
        return videoSrc ? (
          <video
            src={videoSrc}
            className="cr-ad-space__video"
            controls={false}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleLoad}
            onError={handleError}
          />
        ) : (
          <div className="cr-ad-space__placeholder">
            <span className="cr-ad-space__placeholder-text">Video Ad Space</span>
          </div>
        )

      case 'html':
        return htmlContent ? (
          <div
            className="cr-ad-space__html"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            onLoad={handleLoad}
          />
        ) : (
          <div className="cr-ad-space__placeholder">
            <span className="cr-ad-space__placeholder-text">HTML Ad Space</span>
          </div>
        )

      case 'embed':
        return embedCode ? (
          <div className="cr-ad-space__embed">
            <iframe
              srcDoc={embedCode}
              className="cr-ad-space__iframe"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onLoad={handleLoad}
              onError={handleError}
              title={alt}
            />
          </div>
        ) : (
          <div className="cr-ad-space__placeholder">
            <span className="cr-ad-space__placeholder-text">Embed Ad Space</span>
          </div>
        )

      default:
        return (
          <div className="cr-ad-space__placeholder">
            <span className="cr-ad-space__placeholder-text">Ad Space</span>
          </div>
        )
    }
  }

  const containerStyles = {
    width: currentSize.width,
    height: currentSize.height,
    maxWidth: '100%',
  }

  return (
    <div
      ref={containerRef}
      className={`cr-ad-space cr-ad-space--${size} ${isSkyscraper ? 'cr-ad-space--skyscraper' : ''} ${className}`}
      style={containerStyles}
      onClick={handleClick}
      role={href ? 'link' : 'img'}
      tabIndex={href ? 0 : -1}
      aria-label={href ? `Advertisement: ${alt}` : alt}
      {...props}
    >
      <div className="cr-ad-space__container">{renderContent()}</div>

      {/* Screen reader skip link */}
      <a href="#main-content" className="cr-ad-space__skip-link" aria-label="Skip advertisement">
        Skip Ad
      </a>
    </div>
  )
}

export default CrAdSpace
