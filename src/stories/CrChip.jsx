// CrChip.jsx
import React from 'react';
import './CrChip.css';

export default function CrChip({ 
  children,
  variant = 'light', // 'primary', 'secondary', 'light'
  size = 'medium', // 'small', 'medium', 'large'
  squared = false, // New prop for squared corners
  className = ''
}) {
  const chipClass = `cr-chip cr-chip--${variant} cr-chip--${size} ${squared ? 'cr-chip--squared' : ''} ${className}`;

  return (
    <div className={chipClass}>
      <span className="cr-chip__text">
        {children}
      </span>
    </div>
  );
}