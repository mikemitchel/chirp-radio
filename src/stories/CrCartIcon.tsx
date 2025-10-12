// CrCartIcon.tsx
import './CrCartIcon.css'

interface CrCartIconProps {
  badgeCount?: number
  showBadge?: boolean
  size?: string
  onClick?: (e: any) => void
  className?: string
  ariaLabel?: string
}

export default function CrCartIcon({
  badgeCount = 0,
  showBadge = true,
  size = '36',
  onClick,
  className = '',
  ariaLabel,
}: CrCartIconProps) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  const containerClasses = ['cr-cart-icon', className].filter(Boolean).join(' ')

  return (
    <div
      className={containerClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={
        ariaLabel ||
        (showBadge && badgeCount > 0 ? `Shopping cart with ${badgeCount} items` : 'Shopping cart')
      }
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleClick(e)
              }
            }
          : undefined
      }
      style={{
        '--cart-icon-size': `${size}px`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cr-cart-icon__svg"
      >
        <path
          d="M5.79588 24.6828C4.50896 19.5351 3.8655 16.9613 5.21675 15.2306C6.568 13.5 9.22105 13.5 14.5272 13.5H21.4732C26.7793 13.5 29.4324 13.5 30.7836 15.2306C32.1349 16.9613 31.4914 19.5351 30.2045 24.6828C29.386 27.9568 28.9767 29.5938 27.756 30.5469C26.5354 31.5 24.848 31.5 21.4732 31.5H14.5272C11.1524 31.5 9.465 31.5 8.24432 30.5469C7.02364 29.5938 6.61439 27.9568 5.79588 24.6828Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          opacity="0.5"
          d="M29.25 14.25L28.1844 10.342C27.7735 8.83507 27.5681 8.08162 27.1467 7.5142C26.727 6.94909 26.1568 6.51351 25.5012 6.25728C24.8429 6 24.0619 6 22.5 6M6.75 14.25L7.81559 10.342C8.22648 8.83507 8.43192 8.08162 8.85331 7.5142C9.27299 6.94909 9.84323 6.51351 10.4988 6.25728C11.1571 6 11.9381 6 13.5 6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M13.5 6C13.5 5.17157 14.1716 4.5 15 4.5H21C21.8284 4.5 22.5 5.17157 22.5 6C22.5 6.82843 21.8284 7.5 21 7.5H15C14.1716 7.5 13.5 6.82843 13.5 6Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      {showBadge && <span className="cr-cart-icon__badge">{badgeCount}</span>}
    </div>
  )
}
