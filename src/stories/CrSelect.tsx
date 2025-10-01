// CrDropdownMenu.tsx
import React from 'react';
import './CrSelect.css';

interface CrSelectProps {
  options?: any[];
  onSelect?: (option: any) => void;
  theme?: string;
  className?: string;
}

export default function CrSelect({
  options = [],
  onSelect,
  theme = "light", // 'light' or 'dark'
  className = ""
}: CrSelectProps) {
  
  const handleOptionClick = (option) => {
    if (onSelect) {
      onSelect(option);
    }
  };

  const menuClasses = [
    'cr-dropdown-menu',
    `cr-dropdown-menu--${theme}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={menuClasses}>
      <ul className="cr-dropdown-menu__options">
        {options.map((option) => (
          <li key={option.value} className="cr-dropdown-menu__option-wrapper">
            <button
              type="button"
              className="cr-dropdown-menu__option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}