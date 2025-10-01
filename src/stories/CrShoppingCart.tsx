// CrShoppingCart.tsx
import React from 'react';
import { PiArrowRight } from 'react-icons/pi';
import CrButton from './CrButton';
import CrCartIcon from './CrCartIcon';
import './CrShoppingCart.css';

interface CrShoppingCartProps {
  items?: Array<{
    name: string;
    price: number;
    details?: string;
    quantity?: number;
  }>;
  onEmptyCart?: () => void;
  onCheckout?: () => void;
  className?: string;
}

export default function CrShoppingCart({
  items = [],
  onEmptyCart,
  onCheckout,
  className = ""
}: CrShoppingCartProps) {
  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className={`cr-shopping-cart ${className}`}>
      {/* Header */}
      <div className="cr-shopping-cart__header">
        <h2 className="cr-shopping-cart__title">Your Cart</h2>
        <CrCartIcon 
          badgeCount={totalItems} 
          showBadge={totalItems > 0} 
          size="60"
          className="cr-shopping-cart__icon"
        />
      </div>

      {/* Items */}
      <div className="cr-shopping-cart__items">
        {items.length === 0 ? (
          <div className="cr-shopping-cart__empty">
            Your cart is empty
          </div>
        ) : (
          items.map((item, index) => (
            <div key={`item-${index}`} className="cr-shopping-cart__item">
              <div className="cr-shopping-cart__item-header">
                <span className="cr-shopping-cart__item-name">{item.name}</span>
                <span className="cr-shopping-cart__item-price">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </span>
              </div>
              {item.details && (
                <div className="cr-shopping-cart__item-details">
                  {item.details} {item.quantity && item.quantity > 1 ? `× ${item.quantity}` : ''}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          {/* Divider */}
          <hr className="cr-shopping-cart__divider" />

          {/* Total */}
          <div className="cr-shopping-cart__total">
            <span className="cr-shopping-cart__total-label">TOTAL</span>
            <span className="cr-shopping-cart__total-price">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Spacer */}
          <div className="cr-shopping-cart__spacer"></div>

          {/* Actions */}
          <div className="cr-shopping-cart__actions">
            <CrButton
              variant="outline"
              color="default"
              size="medium"
              onClick={onEmptyCart}
            >
              Empty Cart
            </CrButton>

            <CrButton
              variant="solid"
              color="primary" 
              size="medium"
              onClick={onCheckout}
              iconRight={React.createElement(PiArrowRight)}
            >
              Checkout
            </CrButton>
          </div>
        </>
      )}
    </div>
  );
}