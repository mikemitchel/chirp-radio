// CrCurrentDj.tsx
import React from 'react';
import CrChip from './CrChip';
import './CrCurrentDj.css';

interface CrCurrentDjProps {
  djName?: string;
  showName?: string;
  isOnAir?: boolean;
  statusText?: string;
}

export default function CrCurrentDj({
  djName = "DJ Current",
  showName = "Current Show",
  isOnAir = true,
  statusText = "On-Air"
}: CrCurrentDjProps) {
  return (
    <div className="cr-current-dj">
      <div className="cr-current-dj__info">
        <div className="cr-current-dj__name">
          {djName}
        </div>
        <div className="cr-current-dj__show">
          {showName}
        </div>
      </div>
      
      {isOnAir && (
        <div className="cr-current-dj__status">
          <CrChip variant="primary">
            {statusText}
          </CrChip>
        </div>
      )}
    </div>
  );
}