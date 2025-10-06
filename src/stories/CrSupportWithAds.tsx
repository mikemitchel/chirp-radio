// CrSupportWithAds.tsx
import React from 'react'
import CrSupport from './CrSupport'
import CrAdSpace from './CrAdSpace'
import './CrSupportWithAds.css'

interface CrSupportWithAdsProps {
  showAdditionalLogos?: boolean
  additionalLogos?: Array<{ src: string; alt?: string }>
  adSize?: string
  adContentType?: string
  adSrc?: string
  adAlt?: string
  adHref?: string
  adTarget?: string
  adLoading?: boolean
  adShowLabel?: boolean
  adCustomWidth?: string
  adCustomHeight?: string
  adHtmlContent?: string
  adVideoSrc?: string
  adEmbedCode?: string
  onAdLoad?: () => void
  onAdError?: () => void
  onAdClick?: () => void
  onAdImpression?: () => void
  className?: string
}

const CrSupportWithAds = ({
  // Support component props
  showAdditionalLogos = false,
  additionalLogos = [],

  // Ad component props
  adSize = 'medium-rectangle',
  adContentType = 'image',
  adSrc,
  adAlt = 'Advertisement',
  adHref,
  adTarget = '_blank',
  adLoading = false,
  adShowLabel = true,
  adCustomWidth,
  adCustomHeight,
  adHtmlContent,
  adVideoSrc,
  adEmbedCode,
  onAdLoad,
  onAdError,
  onAdClick,
  onAdImpression,

  // Layout props
  className = '',
  ...props
}: CrSupportWithAdsProps) => {
  return (
    <div className={`cr-support-with-ads ${className}`} {...props}>
      {/* Support section - 2/3 width on web, full width on mobile (top) */}
      <div className="cr-support-with-ads__support">
        <CrSupport showAdditionalLogos={showAdditionalLogos} additionalLogos={additionalLogos} />
      </div>

      {/* Ad section - 1/3 width on web, full width on mobile (bottom) */}
      <div className="cr-support-with-ads__ads">
        <CrAdSpace
          size={adSize}
          customWidth={adCustomWidth}
          customHeight={adCustomHeight}
          contentType={adContentType}
          src={adSrc}
          alt={adAlt}
          htmlContent={adHtmlContent}
          videoSrc={adVideoSrc}
          embedCode={adEmbedCode}
          href={adHref}
          target={adTarget}
          loading={adLoading}
          showLabel={adShowLabel}
          onLoad={onAdLoad}
          onError={onAdError}
          onClick={onAdClick}
          onImpression={onAdImpression}
        />
      </div>
    </div>
  )
}

export default CrSupportWithAds
