// CrSocialIcon.tsx
import { FaFacebookSquare, FaInstagram, FaTwitterSquare, FaLinkedin } from 'react-icons/fa'
import { SiBluesky } from 'react-icons/si'
import './CrSocialIcon.css'

const socialPlatforms = {
  facebook: {
    icon: FaFacebookSquare,
    color: '#1877f2',
    label: 'Facebook',
  },
  instagram: {
    icon: FaInstagram,
    color: '#e4405f',
    label: 'Instagram',
  },
  twitter: {
    icon: FaTwitterSquare,
    color: '#1da1f2',
    label: 'Twitter',
  },
  bluesky: {
    icon: SiBluesky,
    color: '#00a8e8',
    label: 'Bluesky',
  },
  linkedin: {
    icon: FaLinkedin,
    color: '#0077b5',
    label: 'LinkedIn',
  },
}

interface CrSocialIconProps {
  platform?: string
  size?: number
  url?: string
  onClick?: (platform: string, url?: string) => void
  className?: string
  ariaLabel?: string
}

export default function CrSocialIcon({
  platform,
  size = 24,
  url,
  onClick,
  className = '',
  ariaLabel,
  ...props
}: CrSocialIconProps) {
  const platformConfig = socialPlatforms[platform]

  if (!platformConfig) {
    console.warn(`CrSocialIcon: Unknown platform "${platform}"`)
    return null
  }

  const IconComponent = platformConfig.icon

  const componentClasses = ['cr-social-icon', className].filter(Boolean).join(' ')

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault()
      onClick(platform, url)
    }
  }

  const iconElement = (
    <IconComponent
      className="cr-social-icon__svg"
      size={size}
      style={{
        '--cr-social-icon-color': platformConfig.color,
        '--cr-social-icon-size': `${size}px`,
      }}
    />
  )

  const commonProps = {
    className: componentClasses,
    'aria-label': ariaLabel || `${platformConfig.label} social media link`,
    ...props,
  }

  if (url && !onClick) {
    return (
      <a
        href={url.startsWith('http') ? url : `https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {iconElement}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={handleClick} {...commonProps}>
        {iconElement}
      </button>
    )
  }

  return <span {...commonProps}>{iconElement}</span>
}
