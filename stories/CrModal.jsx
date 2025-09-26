// CrModal.jsx
import React from 'react';
import CrButton from './CrButton';
import CrCurrentDj from './CrCurrentDj';
import CrMenuButton from './CrMenuButton';
import CrScrim from './CrScrim';
import './CrModal.css';

export default function CrModal({
  title = "Modal",
  children,
  showDjInfo = false,
  djName = "DJ Current",
  showName = "Current Show",
  isOnAir = true,
  statusText = "On-Air",
  className = "",
  size = "default", // default, small, large
  onClose,
  showCloseButton = true,
  scrimOpacity = 0.5,
  scrimOnClick
}) {

  const modalClasses = [
    'cr-modal',
    'cr-bg-textured',
    'cr-bg-natural-d100',
    `cr-modal--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <CrScrim 
      isVisible={true}
      opacity={scrimOpacity}
      onClick={scrimOnClick}
      center={true}
      padding={true}
    >
      <div 
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // Prevent scrim click when clicking modal
      >
        {/* Modal Header */}
        <div className="cr-modal__header">
          <div className="cr-modal__header-content">
            <div className="cr-modal__title-section">
              <h2 id="modal-title" className="cr-modal__title">
                {title}
              </h2>
            </div>
            
            {/* DJ Info Section - only show when showDjInfo is true */}
            {showDjInfo && (
              <div className="cr-modal__dj-info">
                <CrCurrentDj
                  djName={djName}
                  showName={showName}
                  isOnAir={isOnAir}
                  statusText={statusText}
                />
              </div>
            )}
          </div>
          
          {/* Close Button - Now using CrMenuButton */}
          {showCloseButton && (
            <div className="cr-modal__close">
              <CrMenuButton
                variant="close"
                layout="icon-only"
                onClick={onClose}
                className="cr-modal__close-button"
              />
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="cr-modal__content">
          {children}
        </div>
      </div>
    </CrScrim>
  );
}