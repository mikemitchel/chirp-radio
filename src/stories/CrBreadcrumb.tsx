// CrBreadcrumb.tsx
import React from 'react'
import CrLogo from './CrLogo'
import './CrBreadcrumb.css'

interface CrBreadcrumbProps {
  items?: any[]
  onItemClick?: (item: any) => void
  showLogo?: boolean
}

export default function CrBreadcrumb({
  items = [],
  onItemClick,
  showLogo = true,
}: CrBreadcrumbProps) {
  return (
    <nav className="cr-breadcrumb" aria-label="Breadcrumb">
      <div className="cr-breadcrumb__content">
        {/* Logo */}
        {showLogo && (
          <div className="cr-breadcrumb__logo">
            <CrLogo variant="bird" reversed={false} />
          </div>
        )}

        {/* Breadcrumb Items */}
        <div className="cr-breadcrumb__items">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {/* Breadcrumb Item */}
              <div className="cr-breadcrumb__item">
                {item.isClickable ? (
                  <button
                    className="cr-breadcrumb__link"
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick()
                      } else if (onItemClick) {
                        onItemClick(item)
                      }
                    }}
                    type="button"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="cr-breadcrumb__current">{item.label}</span>
                )}
              </div>

              {/* Separator */}
              {index < items.length - 1 && <div className="cr-breadcrumb__separator">/</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  )
}
