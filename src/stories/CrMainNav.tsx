// CrMainNav.tsx
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { PiMagnifyingGlass } from 'react-icons/pi'
import CrButton from './CrButton'
import CrCartIcon from './CrCartIcon'
import CrMenuButton from './CrMenuButton'
import CrSelect from './CrSelect'
import './CrMainNav.css'

interface CrMainNavProps {
  onMenuClick?: () => void
  onSearchClick?: () => void
  onListenClick?: () => void
  onEventsClick?: () => void
  onArticlesClick?: () => void
  onStoreClick?: () => void
  onWaysToGiveClick?: () => void
  onDonateClick?: () => void
  storeBadgeCount?: number
  showStoreBadge?: boolean
  variant?: string
}

export default function CrMainNav({
  onMenuClick,
  onSearchClick,
  onListenClick,
  onEventsClick,
  onArticlesClick,
  onStoreClick,
  onWaysToGiveClick,
  onDonateClick,
  storeBadgeCount = 5,
  showStoreBadge = true,
  variant = 'desktop', // 'desktop' or 'mobile'
}: CrMainNavProps) {
  // Try to use navigate, but handle case where Router isn't available (e.g., Storybook)
  let navigate: ((path: string) => void) | null = null
  try {
    navigate = useNavigate()
  } catch (e) {
    // Router not available, will use callback props instead
  }

  const [showWaysToGive, setShowWaysToGive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const waysToGiveOptions = [
    { label: 'Donate', value: 'donate', route: '/donate' },
    { label: 'Vinyl Circle', value: 'vinyl-circle', route: '/vinyl-circle' },
    { label: 'Vehicle Donation', value: 'car-donation', route: '/car-donation' },
    { label: 'Other Ways to Give', value: 'other-ways-to-give', route: '/other-ways-to-give' },
  ]

  const handleWaysToGiveSelect = (option: any) => {
    if (option.route && navigate) {
      navigate(option.route)
    } else if (onWaysToGiveClick) {
      onWaysToGiveClick()
    }
    setShowWaysToGive(false)
  }

  const handleNavClick = (path: string, callback?: () => void) => {
    if (navigate) {
      navigate(path)
    } else if (callback) {
      callback()
    }
  }

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWaysToGive(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowWaysToGive(false)
      }
    }

    if (showWaysToGive) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showWaysToGive])
  // Dropdown arrow
  const DropdownIcon = () => (
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

  return (
    <nav className={`cr-main-nav cr-main-nav--${variant}`}>
      <div className="cr-main-nav__container">
        {/* Left navigation items */}
        <div className="cr-main-nav__left">
          <CrMenuButton variant="dots" layout="icon-left" text="Menu" onClick={onMenuClick} />

          <div className="cr-main-nav__nav-items">
            {navigate ? (
              <Link to="/listen" className="cr-main-nav__nav-link">
                Listen
              </Link>
            ) : (
              <button
                className="cr-main-nav__nav-link"
                onClick={onListenClick}
              >
                Listen
              </button>
            )}
            {navigate ? (
              <Link to="/events" className="cr-main-nav__nav-link">
                Events
              </Link>
            ) : (
              <button
                className="cr-main-nav__nav-link"
                onClick={onEventsClick}
              >
                Events
              </button>
            )}
            {navigate ? (
              <Link to="/articles" className="cr-main-nav__nav-link">
                Articles
              </Link>
            ) : (
              <button
                className="cr-main-nav__nav-link"
                onClick={onArticlesClick}
              >
                Articles
              </button>
            )}
            {/* Search */}
            <button
              className="cr-main-nav__search-button"
              onClick={onSearchClick}
              aria-label="Search"
            >
              <PiMagnifyingGlass />
            </button>
          </div>
        </div>

        {/* Right navigation items */}
        <div className="cr-main-nav__right">

          {/* Store with cart icon */}
          {navigate ? (
            <Link
              to="/shop"
              className="cr-main-nav__store-button"
              aria-label={
                showStoreBadge && storeBadgeCount > 0
                  ? `Store - ${storeBadgeCount} items in cart`
                  : 'Store'
              }
            >
              <span className="cr-main-nav__store-text">Store</span>
              <CrCartIcon
                badgeCount={storeBadgeCount}
                showBadge={showStoreBadge}
                size="36"
                className="cr-main-nav__store-icon"
              />
            </Link>
          ) : (
            <button
              className="cr-main-nav__store-button"
              onClick={onStoreClick}
              aria-label={
                showStoreBadge && storeBadgeCount > 0
                  ? `Store - ${storeBadgeCount} items in cart`
                  : 'Store'
              }
            >
              <span className="cr-main-nav__store-text">Store</span>
              <CrCartIcon
                badgeCount={storeBadgeCount}
                showBadge={showStoreBadge}
                size="36"
                className="cr-main-nav__store-icon"
              />
            </button>
          )}

          {/* Ways to Give dropdown */}
          <div className="cr-main-nav__ways-dropdown" ref={dropdownRef}>
            <button
              className="cr-main-nav__ways-button"
              onClick={() => setShowWaysToGive(!showWaysToGive)}
              aria-label="Ways to Give"
              aria-expanded={showWaysToGive}
            >
              <span className="cr-main-nav__ways-text">Ways to Give</span>
              <DropdownIcon />
            </button>
            {showWaysToGive && (
              <div className="cr-main-nav__ways-menu">
                <CrSelect
                  options={waysToGiveOptions}
                  onSelect={handleWaysToGiveSelect}
                  theme="light"
                />
              </div>
            )}
          </div>

          {/* Donate button */}
          {navigate ? (
            <Link to="/donate">
              <CrButton variant="solid" color="primary" size="small">
                Donate
              </CrButton>
            </Link>
          ) : (
            <CrButton variant="solid" color="primary" size="small" onClick={onDonateClick}>
              Donate
            </CrButton>
          )}
        </div>
      </div>
    </nav>
  )
}
