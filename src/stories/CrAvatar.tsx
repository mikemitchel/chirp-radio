// CrAvatar.tsx
import CrLogo from './CrLogo'
import './CrAvatar.css'

interface CrAvatarProps {
  src?: string
  alt?: string
  isLoggedIn?: boolean
  fallbackText?: string
}

export default function CrAvatar({
  src,
  alt = 'User avatar',
  isLoggedIn = false,
}: CrAvatarProps) {
  // Generic user icon SVG
  const UserIcon = () => (
    <svg width="28" height="26" viewBox="0 0 28 26" className="cr-avatar__icon">
      <path d="M14 13.5C17.5 13.5 20.3 10.7 20.3 7.2C20.3 3.7 17.5 0.9 14 0.9C10.5 0.9 7.7 3.7 7.7 7.2C7.7 10.7 10.5 13.5 14 13.5ZM14 16.2C9.8 16.2 1.4 18.3 1.4 22.5V25.2H26.6V22.5C26.6 18.3 18.2 16.2 14 16.2Z" />
    </svg>
  )

  const avatarClass = `cr-avatar ${isLoggedIn ? 'cr-avatar--logged-in' : 'cr-avatar--logged-out'}`

  // Not logged in - show bird logo
  if (!isLoggedIn) {
    return (
      <div className={avatarClass}>
        <div style={{ width: '28px', height: '28px' }}>
          <CrLogo variant="bird" />
        </div>
      </div>
    )
  }

  // Logged in with image
  if (src) {
    return (
      <div className={avatarClass}>
        <img
          src={src}
          alt={alt}
          className="cr-avatar__image"
          onError={(e) => {
            e.target.style.display = 'none'
            const iconContainer = e.target.parentNode.querySelector('.cr-avatar__fallback')
            if (iconContainer) {
              iconContainer.style.display = 'flex'
            }
          }}
        />
        <div className="cr-avatar__fallback">
          <UserIcon />
        </div>
      </div>
    )
  }

  // Logged in without image - show user icon
  return (
    <div className={avatarClass}>
      <UserIcon />
    </div>
  )
}
