// CrChip.tsx
import React from 'react'
import './CrChip.css'

interface CrChipProps {
  children?: React.ReactNode
  variant?: string
  size?: string
  squared?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function CrChip({
  children,
  variant = 'light', // 'primary', 'secondary', 'secondary-light', 'light'
  size = 'medium', // 'small', 'medium', 'large'
  squared = false, // New prop for squared corners
  className = '',
  style,
}: CrChipProps) {
  const chipClass = `cr-chip cr-chip--${variant} cr-chip--${size} ${squared ? 'cr-chip--squared' : ''} ${className}`

  return (
    <div className={chipClass} style={style}>
      <span className="cr-chip__text">{children}</span>
    </div>
  )
}
