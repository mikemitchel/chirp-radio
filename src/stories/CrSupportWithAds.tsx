// CrSupportWithAds.tsx
import React from 'react'
import CrSupport from './CrSupport'
import CrAdSpace from './CrAdSpace'
import './CrSupportWithAds.css'
import { useSiteSettings } from '../hooks/useData'

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

  // Ad component props (legacy props, will be overridden by Site Settings)
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
  const { data: siteSettings, loading } = useSiteSettings()

  // Get advertisement from Site Settings
  const advertisement = siteSettings?.supportAdvertisement

  // Determine ad props from Site Settings or fall back to component props
  const finalAdSize = advertisement?.size || adSize
  const finalAdContentType = advertisement?.contentType || adContentType
  const finalAdSrc = advertisement?.imageUrl || advertisement?.image?.url || adSrc
  const finalAdAlt = advertisement?.alt || adAlt
  const finalAdHref = advertisement?.href || adHref
  const finalAdTarget = advertisement?.target || adTarget
  const finalAdShowLabel = advertisement?.showLabel ?? adShowLabel
  const finalAdCustomWidth = advertisement?.customWidth || adCustomWidth
  const finalAdCustomHeight = advertisement?.customHeight || adCustomHeight
  const finalAdHtmlContent = advertisement?.htmlContent || adHtmlContent
  const finalAdVideoSrc = advertisement?.videoUrl || advertisement?.video?.url || adVideoSrc
  const finalAdEmbedCode = advertisement?.embedCode || adEmbedCode

  if (loading) return null

  return (
    <div className={`cr-support-with-ads ${className}`} {...props}>
      {/* Support section - 2/3 width on web, full width on mobile (top) */}
      <div className="cr-support-with-ads__support">
        <CrSupport showAdditionalLogos={showAdditionalLogos} additionalLogos={additionalLogos} />
      </div>

      {/* Ad section - 1/3 width on web, full width on mobile (bottom) */}
      {(advertisement || adSrc || adHtmlContent || adVideoSrc || adEmbedCode) && (
        <div className="cr-support-with-ads__ads">
          <CrAdSpace
            size={finalAdSize}
            customWidth={finalAdCustomWidth}
            customHeight={finalAdCustomHeight}
            contentType={finalAdContentType}
            src={finalAdSrc}
            alt={finalAdAlt}
            htmlContent={finalAdHtmlContent}
            videoSrc={finalAdVideoSrc}
            embedCode={finalAdEmbedCode}
            href={finalAdHref}
            target={finalAdTarget}
            loading={adLoading}
            showLabel={finalAdShowLabel}
            onLoad={onAdLoad}
            onError={onAdError}
            onClick={onAdClick}
            onImpression={onAdImpression}
          />
        </div>
      )}
    </div>
  )
}

export default CrSupportWithAds
