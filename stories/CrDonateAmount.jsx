// CrDonateAmount.jsx
import React from 'react';
import CrButton from './CrButton';
import './CrDonateAmount.css';

export default function CrDonateAmount({
  selectedAmount = null,
  onAmountChange,
  amounts = [10, 20, 60, 120, 180, 240, 365, 500],
  amountLabels = null,
  showOtherOption = true,
  customAmount = '',
  onCustomAmountChange,
  className = ""
}) {
  // Restore original callback handler
  const handleAmountClick = (amount) => {
    if (onAmountChange) {
      onAmountChange(amount);
    }
  };

  const formatAmount = (amount) => `$${amount.toFixed(2)}`;
  
  const formatCurrency = (amount) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 3).replace(/\.?0+$/, '')},${String(amount % 1000).padStart(3, '0')}`;
    }
    return `$${amount}`;
  };

  const getAmountLabel = (amount, index) => {
    if (amountLabels && amountLabels[index]) {
      const item = amountLabels[index];
      return `${item.label} ${formatCurrency(amount)}`;
    }
    return formatAmount(amount);
  };

  return (
    <div className={`cr-donate-amount ${className}`}>
      <h3 className="cr-donate-amount__title">
        Choose a donation amount
      </h3>
      
      <div className="cr-donate-amount__grid">
        {amounts.map((amount, index) => (
          <CrButton
            key={amount}
            variant={selectedAmount === amount ? 'solid' : 'text'}
            color={selectedAmount === amount ? 'secondary' : 'default'}
            size="small"
            onClick={() => handleAmountClick(amount)}
          >
            {getAmountLabel(amount, index)}
          </CrButton>
        ))}
        
        {showOtherOption && (
          <CrButton
            key="other"
            variant={selectedAmount === 'other' ? 'solid' : 'text'}
            color={selectedAmount === 'other' ? 'secondary' : 'default'}
            size="small"
            onClick={() => handleAmountClick('other')}
          >
            OTHER
          </CrButton>
        )}
      </div>

      {showOtherOption && selectedAmount === 'other' && (
        <div className="cr-donate-amount__other-section">
          <label className="cr-donate-amount__label">
            Other Donation Amount
          </label>
          <div className="cr-donate-amount__custom-input-wrapper">
            <span className="cr-donate-amount__dollar-sign">$</span>
            <input
              type="text"
              className="cr-donate-amount__custom-input"
              value={customAmount}
              onChange={(e) => onCustomAmountChange?.(e.target.value)}
              placeholder="0.00"
              aria-label="Other donation amount"
            />
          </div>
        </div>
      )}
    </div>
  );
}