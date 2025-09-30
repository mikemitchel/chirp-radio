// CrDonationBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import './CrDonationBar.css';

export default function CrDonationBar({
  currentAmount = 7271,
  targetAmount = 48000,
  onDonateClick,
  className = ""
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);

  // Calculate percentage
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, [hasAnimated]);

  const componentClasses = [
    'cr-donation-bar',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={barRef}
      className={componentClasses}
      onClick={onDonateClick}
      role={onDonateClick ? "button" : undefined}
      tabIndex={onDonateClick ? 0 : undefined}
      onKeyDown={onDonateClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDonateClick();
        }
      } : undefined}
      aria-label={`Donation progress: ${formatCurrency(currentAmount)} raised of ${formatCurrency(targetAmount)} goal, ${Math.round(percentage)}% complete`}
    >
      <div className="cr-donation-bar__container">
        
        {/* White text - always visible on red background */}
        <div className="cr-donation-bar__current-white">
          <span className="cr-donation-bar__amount cr-donation-bar__amount--white">
            {formatCurrency(currentAmount)}
          </span>
        </div>
        
        {/* Progress Bar with clipped red text inside */}
        <div className="cr-donation-bar__progress">
          <div 
            className={`cr-donation-bar__fill ${isVisible ? 'cr-donation-bar__fill--animate' : ''}`}
            style={{ '--progress-width': `${percentage}%` }}
            aria-hidden="true"
          >
            {/* Red text - gets clipped by the white bar boundaries */}
            <div className="cr-donation-bar__current-red">
              <span className="cr-donation-bar__amount cr-donation-bar__amount--red">
                {formatCurrency(currentAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Target Amount */}
        <div className="cr-donation-bar__target">
          <span className="cr-donation-bar__amount">
            {formatCurrency(targetAmount)}
          </span>
        </div>

      </div>
      
      {/* Screen reader only percentage */}
      <span className="sr-only">
        {Math.round(percentage)}% of goal reached
      </span>
    </div>
  );
}