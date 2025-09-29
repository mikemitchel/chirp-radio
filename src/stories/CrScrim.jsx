// CrScrim.jsx
import React from 'react';
import './CrScrim.css';

export default function CrScrim({
  isVisible = false,
  onClick,
  opacity = 0.5,
  zIndex = 1000,
  className = '',
  children,
  center = true,
  padding = true,
  animationDuration = 0.2
}) {
  
  if (!isVisible) return null;

  const scrimClasses = [
    'cr-scrim',
    center && 'cr-scrim--center',
    padding && 'cr-scrim--padding',
    className
  ].filter(Boolean).join(' ');

  const scrimStyle = {
    backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    zIndex,
    animationDuration: `${animationDuration}s`
  };

  return (
    <div 
      className={scrimClasses}
      style={scrimStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}