// CrMainNav.tsx
import { PiMagnifyingGlass } from 'react-icons/pi'
import CrButton from './CrButton'
import CrCartIcon from './CrCartIcon'
import CrMenuButton from './CrMenuButton'
import './CrMainNav.css'

interface CrMainNavProps {
  onMenuClick?: () => void
  onListenClick?: () => void
  onEventsClick?: () => void
  onArticlesClick?: () => void
  onSearchClick?: () => void
  onStoreClick?: () => void
  storeBadgeCount?: number
  onWaysToGiveClick?: () => void
  onDonateClick?: () => void
  showStoreBadge?: boolean
  variant?: string
}

export default function CrMainNav({
  onMenuClick,
  onListenClick,
  onEventsClick,
  onArticlesClick,
  onSearchClick,
  onStoreClick,
  storeBadgeCount = 5,
  onWaysToGiveClick,
  onDonateClick,
  showStoreBadge = true,
  variant = 'desktop', // 'desktop' or 'mobile'
}: CrMainNavProps) {
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
            <button className="cr-main-nav__nav-link" onClick={onListenClick}>
              Listen
            </button>
            <button className="cr-main-nav__nav-link" onClick={onEventsClick}>
              Events
            </button>
            <button className="cr-main-nav__nav-link" onClick={onArticlesClick}>
              Articles
            </button>
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

          {/* Ways to Give dropdown */}
          <button
            className="cr-main-nav__ways-button"
            onClick={onWaysToGiveClick}
            aria-label="Ways to Give"
          >
            <span className="cr-main-nav__ways-text">Ways to Give</span>
            <DropdownIcon />
          </button>

          {/* Donate button */}
          <CrButton variant="solid" color="primary" size="small" onClick={onDonateClick}>
            Donate
          </CrButton>
        </div>
      </div>
    </nav>
  )
}
