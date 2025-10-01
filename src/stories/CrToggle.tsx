// CrToggle.tsx
import React from 'react';
import './CrToggle.css';

interface CrToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean, event: any) => void;
  disabled?: boolean;
  size?: string;
  variant?: string;
  leftLabel?: string;
  rightLabel?: string;
  'aria-label'?: string;
  id?: string;
}

export default function CrToggle({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  variant = 'boolean', // 'boolean' or 'selection'
  leftLabel,
  rightLabel,
  'aria-label': ariaLabel,
  id,
  ...props
}: CrToggleProps) {
  const handleChange = (event) => {
    if (!disabled && onChange) {
      onChange(event.target.checked, event);
    }
  };

  const toggleClasses = [
    'cr-toggle',
    `cr-toggle--${size}`,
    `cr-toggle--${variant}`,
    checked ? 'cr-toggle--checked' : '',
    disabled ? 'cr-toggle--disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={toggleClasses}>
      {leftLabel && (
        <span className="cr-toggle__label cr-toggle__label--left">
          {leftLabel}
        </span>
      )}
      
      <input
        type="checkbox"
        className="cr-toggle__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        id={id}
        {...props}
      />
      <div className="cr-toggle__track">
        <div className="cr-toggle__thumb" />
      </div>
      
      {rightLabel && (
        <span className="cr-toggle__label cr-toggle__label--right">
          {rightLabel}
        </span>
      )}
    </div>
  );
}