// CrToast.jsx
import React from 'react';
import { PiMinusSquare, PiCheckSquare, PiInfo, PiWarningCircle, PiFloppyDiskLight } from 'react-icons/pi';
import CrMenuButton from './CrMenuButton';
import './CrToast.css';

export default function CrToast({
  type = "success",
  title = "Action completed",
  message = "",
  linkText = "",
  linkHref = "#",
  onLinkClick,
  onClose,
  showDismiss = true
}) {
  const getIcon = () => {
    switch (type) {
      case "remove":
        return <PiMinusSquare />;
      case "success":
      case "add":
        return <PiCheckSquare />;
      case "save":
        return <PiFloppyDiskLight />;
      case "info":
        return <PiInfo />;
      case "warning":
      case "error":
        return <PiWarningCircle />;
      default:
        return <PiInfo />;
    }
  };

  const getColorClass = () => {
    switch (type) {
      case "remove":
      case "success":
      case "add":
      case "save":
        return "cr-toast--success";
      case "info":
        return "cr-toast--info";
      case "warning":
        return "cr-toast--warning";
      case "error":
        return "cr-toast--error";
      default:
        return "cr-toast--info";
    }
  };

  const handleLinkClick = (e) => {
    if (onLinkClick) {
      e.preventDefault();
      onLinkClick();
    }
  };

  const handleDismiss = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`cr-toast ${getColorClass()}`} role="alert" aria-live={type === 'error' ? 'assertive' : 'polite'}>
      <div className="cr-toast__content">
        <div className="cr-toast__icon">
          {getIcon()}
        </div>
        <div className="cr-toast__text">
          <div className="cr-toast__title">
            {title}
          </div>
          {message && (
            <div className="cr-toast__message">
              {message}
              {linkText && (
                <>
                  {' '}
                  <a 
                    href={linkHref}
                    className="cr-toast__link"
                    onClick={handleLinkClick}
                  >
                    {linkText}
                  </a>
                  .
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showDismiss && (
        <div className="cr-toast__dismiss">
          <CrMenuButton
            variant="close"
            layout="icon-only"
            onClick={handleDismiss}
            className="cr-toast__dismiss-button"
          />
        </div>
      )}
    </div>
  );
}