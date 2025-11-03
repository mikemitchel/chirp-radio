// CrAccount.tsx
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router'
import CrAvatar from './CrAvatar'
import CrChip from './CrChip'
import CrButton from './CrButton'
import CrSelect from './CrSelect'
import LoginRequiredModal from '../components/LoginRequiredModal'
import './CrAccount.css'

interface CrAccountProps {
  isLoggedIn?: boolean
  isVolunteer?: boolean
  userName?: string
  userAvatar?: string
  showTags?: boolean
  tags?: string[]
  onLoginClick?: () => void
  onSignUpClick?: () => void
  onVolunteerDropdown?: () => void
  onProfileClick?: () => void
  onFavoritesClick?: () => void
  onSignOutClick?: () => void
  onVolunteerDirectoryClick?: () => void
  onLeadershipDirectoryClick?: () => void
  onVolunteerCalendarClick?: () => void
  onWebsitesClick?: () => void
  onDownloadsClick?: () => void
}

export default function CrAccount({
  isLoggedIn = false,
  isVolunteer = false,
  userName = 'Johanna Dough',
  userAvatar = '',
  showTags = true,
  tags = ['Hello World', 'Hello World', 'Hello World'],
  onLoginClick,
  onSignUpClick,
  onProfileClick,
  onFavoritesClick,
  onSignOutClick,
  onVolunteerDirectoryClick,
  onLeadershipDirectoryClick,
  onVolunteerCalendarClick,
  onWebsitesClick,
  onDownloadsClick,
}: CrAccountProps) {
  const DownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )

  // All hooks must be called unconditionally at the top (Rules of Hooks)
  // Modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // Logged-in state hooks (will be used only when isLoggedIn is true)
  let location = null
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation()
  } catch {
    // Router not available
  }
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [volunteerMenuOpen, setVolunteerMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const volunteerMenuRef = useRef<HTMLDivElement>(null)

  // Close menus when clicking outside (only relevant when logged in, but must be at top)
  useEffect(() => {
    if (!isLoggedIn) return // Skip effect when logged out

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
      if (volunteerMenuRef.current && !volunteerMenuRef.current.contains(event.target as Node)) {
        setVolunteerMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLoggedIn])

  const handleLoginButtonClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleModalLogin = () => {
    setIsLoginModalOpen(false)
    if (onLoginClick) {
      onLoginClick()
    }
  }

  const handleModalSignUp = () => {
    setIsLoginModalOpen(false)
    if (onSignUpClick) {
      onSignUpClick()
    }
  }

  // Logged out state
  if (!isLoggedIn) {
    return (
      <>
        <div className="cr-account">
          <CrAvatar isLoggedIn={false} />
          <button className="cr-account__login-button" onClick={handleLoginButtonClick}>
            Log In
          </button>
        </div>

        <LoginRequiredModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleModalLogin}
          onSignUp={handleModalSignUp}
        />
      </>
    )
  }

  // Logged in state
  // Note: All hooks have been moved to the top of the component

  const userMenuOptions = [
    {
      label: 'Your Profile',
      value: 'profile',
      onClick: onProfileClick,
      isActive: location?.pathname === '/profile',
    },
    {
      label: 'Your Collection',
      value: 'collection',
      onClick: onFavoritesClick,
      isActive: location?.pathname === '/collection',
    },
    { label: 'Sign Out', value: 'signout', onClick: onSignOutClick, isActive: false },
  ]

  const volunteerMenuOptions = [
    {
      label: 'Volunteer Directory',
      value: 'directory',
      onClick: onVolunteerDirectoryClick,
      isActive: location?.pathname === '/volunteer-directory',
    },
    {
      label: 'Leadership Directory',
      value: 'leadership',
      onClick: onLeadershipDirectoryClick,
      isActive: location?.pathname === '/leadership-directory',
    },
    {
      label: 'Volunteer Calendar',
      value: 'calendar',
      onClick: onVolunteerCalendarClick,
      isActive: location?.pathname === '/volunteer-calendar',
    },
    {
      label: 'Websites to Remember',
      value: 'websites',
      onClick: onWebsitesClick,
      isActive: location?.pathname === '/websites-to-remember',
    },
    {
      label: 'Volunteer Downloads',
      value: 'downloads',
      onClick: onDownloadsClick,
      isActive: location?.pathname === '/volunteer-downloads',
    },
  ]

   
  const handleUserMenuSelect = (option: any) => {
    if (option.onClick) {
      option.onClick()
    }
    setUserMenuOpen(false)
  }

   
  const handleVolunteerMenuSelect = (option: any) => {
    if (option.onClick) {
      option.onClick()
    }
    setVolunteerMenuOpen(false)
  }

  return (
    <div className="cr-account">
      <CrAvatar src={userAvatar} alt={userName} isLoggedIn={true} />

      {/* User greeting dropdown */}
      <div className="cr-account__dropdown-wrapper" ref={userMenuRef}>
        <CrButton
          size="xsmall"
          variant="outline"
          color="default"
          rightIcon={<DownIcon />}
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          Hello {userName}
        </CrButton>
        {userMenuOpen && (
          <div className="cr-account__dropdown-menu">
            <CrSelect options={userMenuOptions} onSelect={handleUserMenuSelect} />
          </div>
        )}
      </div>

      {/* Volunteer dropdown */}
      {isVolunteer && (
        <div className="cr-account__volunteer-dropdown" ref={volunteerMenuRef}>
          <CrButton
            size="xsmall"
            variant="outline"
            color="default"
            rightIcon={<DownIcon />}
            onClick={() => setVolunteerMenuOpen(!volunteerMenuOpen)}
          >
            Volunteer
          </CrButton>
          {volunteerMenuOpen && (
            <div className="cr-account__dropdown-menu">
              <CrSelect options={volunteerMenuOptions} onSelect={handleVolunteerMenuSelect} />
            </div>
          )}
        </div>
      )}

      {/* Tags (volunteer mode) */}
      {isVolunteer && showTags && (
        <div className="cr-account__tags">
          {tags.map((tag, index) => (
            <CrChip key={index} variant="secondary" size="small">
              {tag}
            </CrChip>
          ))}
        </div>
      )}
    </div>
  )
}
