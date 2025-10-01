// CrButton.tsx
import React from 'react';
import './CrButton.css';

interface CrButtonProps {
  children?: React.ReactNode;
  size?: string;
  variant?: string;
  color?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function CrButton({
  children = "Button",
  size = "medium",
  variant = "solid",
  color = "default",
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button"
}: CrButtonProps) {
  const buttonClass = `cr-btn cr-btn--${size} cr-btn--${variant} cr-btn--${color}`;

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && (
        <span className="cr-btn__icon cr-btn__icon--left">
          {leftIcon}
        </span>
      )}
      <span className="cr-btn__text">
        {children}
      </span>
      {rightIcon && (
        <span className="cr-btn__icon cr-btn__icon--right">
          {rightIcon}
        </span>
      )}
    </button>
  );
}