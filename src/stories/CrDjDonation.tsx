// CrDjDonation.tsx
import React from 'react'
import CrButton from './CrButton'
import { PiHandHeart } from 'react-icons/pi'
import './CrDjDonation.css'

interface CrDjDonationProps {
  djName?: string
  donationLink?: string
  onDonateClick?: () => void
  className?: string
}

export default function CrDjDonation({
  djName = 'this DJ',
  donationLink,
  onDonateClick,
  className = '',
}: CrDjDonationProps) {
  const handleDonateClick = () => {
    if (donationLink) {
      window.open(donationLink, '_blank')
    } else if (onDonateClick) {
      onDonateClick()
    }
  }

  return (
    <div className={`cr-dj-donation ${className}`}>
      <div className="cr-dj-donation__container">
        <div className="cr-dj-donation__icon">
          <PiHandHeart size={48} />
        </div>
        <div className="cr-dj-donation__content">
          <h3 className="cr-dj-donation__title">Support CHIRP Radio</h3>
          <p className="cr-dj-donation__description">
            Donate to {djName}'s personal fundraising page and help them raise money for CHIRP this
            year!
          </p>
        </div>
        <div className="cr-dj-donation__action">
          <CrButton
            variant="solid"
            color="primary"
            onClick={handleDonateClick}
            rightIcon={<PiHandHeart />}
          >
            Donate Now
          </CrButton>
        </div>
      </div>
    </div>
  )
}
