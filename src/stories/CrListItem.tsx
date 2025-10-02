// CrListItem.tsx
import React from 'react'
import { PiPlusSquare } from 'react-icons/pi'
import CrButton from './CrButton'
import './CrListItem.css'

interface CrListItemProps {
  ranking?: number
  songName?: string
  artistName?: string
  recordCompany?: string
  showAddButton?: boolean
  onAddClick?: () => void
}

export default function CrListItem({
  ranking = 1,
  songName = 'Song Name',
  artistName = 'Artist Name',
  recordCompany = 'Record Company',
  showAddButton = true,
  onAddClick,
}: CrListItemProps) {
  return (
    <div className="cr-rating-list-item">
      <div className="cr-rating-list-item__content">
        <span className="cr-rating-list-item__ranking">{ranking}.</span>
        <span className="cr-rating-list-item__song">{songName}</span>
        <span className="cr-rating-list-item__separator"> - </span>
        <span className="cr-rating-list-item__artist">{artistName}</span>
        <span className="cr-rating-list-item__company"> ({recordCompany})</span>
      </div>

      {showAddButton && (
        <CrButton
          size="xsmall"
          variant="text"
          color="secondary"
          rightIcon={<PiPlusSquare />}
          onClick={onAddClick}
        >
          Add
        </CrButton>
      )}
    </div>
  )
}
