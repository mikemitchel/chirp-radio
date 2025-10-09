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
  storeBadgeCount?: number
  showStoreBadge?: boolean
  variant?: string
}

export default function CrMainNav({
  onMenuClick,
  onSearchClick,
  storeBadgeCount = 5,
  showStoreBadge = true,
  variant = 'desktop', // 'desktop' or 'mobile'
}: CrMainNavProps) {
  const navigate = useNavigate()
  const [showWaysToGive, setShowWaysToGive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const waysToGiveOptions = [
    { label: 'Other Ways to Give', value: 'ways-to-give', route: '/ways-to-give' },
    { label: 'Vehicle Donation', value: 'car-donation', route: '/car-donation' },
    { label: 'Vinyl Circle', value: 'vinyl-circle', route: '/vinyl-circle' },
  ]

  const handleWaysToGiveSelect = (option: any) => {
    if (option.route) {
      navigate(option.route)
    }
    setShowWaysToGive(false)
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
            <Link to="/listen" className="cr-main-nav__nav-link">
              Listen
            </Link>
            <Link to="/events" className="cr-main-nav__nav-link">
              Events
            </Link>
            <Link to="/articles" className="cr-main-nav__nav-link">
              Articles
            </Link>
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
          <Link to="/donate">
            <CrButton variant="solid" color="primary" size="small">
              Donate
            </CrButton>
          </Link>
        </div>
      </div>
    </nav>
  )
}
