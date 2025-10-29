// CrMainNav.tsx
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import {
  PiMagnifyingGlass,
  PiX,
  PiNewspaper,
  PiCalendarDot,
  PiHeadphones,
  PiMicrophone,
  PiShoppingBag,
} from 'react-icons/pi'
import CrButton from './CrButton'
import CrCartIcon from './CrCartIcon'
import CrMenuButton from './CrMenuButton'
import CrSelect from './CrSelect'
import CrModal from './CrModal'
import { useSearch } from '../hooks/useSearch'
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
  // Try to use navigate and location, but handle case where Router isn't available (e.g., Storybook)
  // Note: Hooks must be called unconditionally (Rules of Hooks)
  let navigate: ((path: string) => void) | null = null
  let location: { pathname: string } | null = null
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation()
  } catch {
    // Router not available (e.g., Storybook), will use callback props instead
    navigate = null
    location = null
  }

  const [showWaysToGive, setShowWaysToGive] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { results, isSearching } = useSearch(searchQuery)

  const waysToGiveOptions = [
    { label: 'Donate', value: 'donate', route: '/donate' },
    { label: 'Vinyl Circle', value: 'vinyl-circle', route: '/vinyl-circle' },
    { label: 'Vehicle Donation', value: 'car-donation', route: '/car-donation' },
    { label: 'Other Ways to Give', value: 'other-ways-to-give', route: '/other-ways-to-give' },
  ]

  const isWaysToGiveActive =
    location && waysToGiveOptions.some((option) => location.pathname === option.route)

   
  const handleWaysToGiveSelect = (option: any) => {
    if (option.route && navigate) {
      navigate(option.route)
    } else if (onWaysToGiveClick) {
      onWaysToGiveClick()
    }
    setShowWaysToGive(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleNavClick = (path: string, callback?: () => void) => {
  //   if (navigate) {
  //     navigate(path)
  //   } else if (callback) {
  //     callback()
  //   }
  // }

  const handleSearchOpen = () => {
    setShowSearch(true)
    if (onSearchClick) {
      onSearchClick()
    }
  }

  const handleSearchClose = () => {
    setShowSearch(false)
    setSearchQuery('')
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Search happens automatically via useSearch hook
    // Submit just focuses the first result if available
  }

  const handleResultClick = (url?: string) => {
    if (url && navigate) {
      navigate(url)
      handleSearchClose()
    }
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <PiNewspaper />
      case 'event':
        return <PiCalendarDot />
      case 'dj':
        return <PiHeadphones />
      case 'podcast':
        return <PiMicrophone />
      case 'shop':
        return <PiShoppingBag />
      default:
        return <PiNewspaper />
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

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

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

          {navigate ? (
            <Link
              to="/listen"
              className={`cr-main-nav__nav-link ${location?.pathname === '/listen' ? 'cr-main-nav__nav-link--active' : ''}`}
            >
              Listen
            </Link>
          ) : (
            <button className="cr-main-nav__nav-link" onClick={onListenClick}>
              Listen
            </button>
          )}
          {navigate ? (
            <Link
              to="/events"
              className={`cr-main-nav__nav-link ${location?.pathname === '/events' ? 'cr-main-nav__nav-link--active' : ''}`}
            >
              Events
            </Link>
          ) : (
            <button className="cr-main-nav__nav-link" onClick={onEventsClick}>
              Events
            </button>
          )}
          {navigate ? (
            <Link
              to="/articles"
              className={`cr-main-nav__nav-link ${location?.pathname === '/articles' ? 'cr-main-nav__nav-link--active' : ''}`}
            >
              Articles
            </Link>
          ) : (
            <button className="cr-main-nav__nav-link" onClick={onArticlesClick}>
              Articles
            </button>
          )}

          {/* Search button - moved from center */}
          <button
            className="cr-main-nav__search-button"
            onClick={handleSearchOpen}
            aria-label="Search"
          >
            <PiMagnifyingGlass />
          </button>
        </div>

        {/* Right navigation items */}
        <div className="cr-main-nav__right">
          {/* Search button for responsive - hidden on desktop */}
          <button
            className="cr-main-nav__search-button cr-main-nav__search-button--responsive"
            onClick={handleSearchOpen}
            aria-label="Search"
          >
            <PiMagnifyingGlass />
          </button>

          {/* Store with cart icon */}
          {navigate ? (
            <Link
              to="/shop"
              className={`cr-main-nav__store-button ${location?.pathname === '/shop' ? 'cr-main-nav__store-button--active' : ''}`}
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
              className={`cr-main-nav__ways-button ${isWaysToGiveActive ? 'cr-main-nav__ways-button--active' : ''}`}
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

      {/* Search Modal */}
      <CrModal
        isOpen={showSearch}
        onClose={handleSearchClose}
        scrimOnClick={handleSearchClose}
        title="Search"
        size="default"
        className="cr-main-nav__search-modal"
      >
        <div className="cr-main-nav__search-container">
          <form onSubmit={handleSearchSubmit} className="cr-main-nav__search-form">
            <PiMagnifyingGlass className="cr-main-nav__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="cr-main-nav__search-input"
              placeholder="Search CHIRP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="cr-main-nav__search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <PiX />
              </button>
            )}
          </form>

          {/* Search Results */}
          {searchQuery && searchQuery.length >= 2 && (
            <div className="cr-main-nav__search-results">
              {isSearching ? (
                <div className="cr-main-nav__search-loading">Searching...</div>
              ) : results.length > 0 ? (
                <>
                  <div className="cr-main-nav__search-results-header">
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </div>
                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      className="cr-main-nav__search-result"
                      onClick={() => handleResultClick(result.url)}
                    >
                      {result.image && (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="cr-main-nav__search-result-image"
                        />
                      )}
                      <div className="cr-main-nav__search-result-content">
                        <div className="cr-main-nav__search-result-header">
                          <span className="cr-main-nav__search-result-icon">
                            {getResultIcon(result.type)}
                          </span>
                          <span className="cr-main-nav__search-result-type">{result.type}</span>
                        </div>
                        <div className="cr-main-nav__search-result-title">{result.title}</div>
                        {result.subtitle && (
                          <div className="cr-main-nav__search-result-subtitle">
                            {result.subtitle}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="cr-main-nav__search-empty">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </CrModal>
    </nav>
  )
}
