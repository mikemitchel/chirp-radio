// CrAppIconSelector.tsx
import { useState, useEffect } from 'react'
import CrButton from './CrButton'
import './CrAppIconSelector.css'

interface IconOption {
  id: string
  name: string
  preview: string
  description?: string
}

interface CrAppIconSelectorProps {
  icons?: IconOption[]
  currentIcon?: string
  onIconChange?: (iconId: string) => void
  onApply?: (iconId: string) => Promise<void>
}

const defaultIcons: IconOption[] = [
  {
    id: 'icon1',
    name: 'Icon 1',
    preview: '/images/app-icons/App Icon 1.png',
  },
  {
    id: 'icon2',
    name: 'Icon 2',
    preview: '/images/app-icons/icon2.png',
  },
  {
    id: 'icon3',
    name: 'Icon 3',
    preview: '/images/app-icons/icon3.png',
  },
  {
    id: 'icon4',
    name: 'Icon 4',
    preview: '/images/app-icons/icon4.png',
  },
  {
    id: 'icon5',
    name: 'Icon 5',
    preview: '/images/app-icons/icon5.png',
  },
  {
    id: 'icon6',
    name: 'Icon 6',
    preview: '/images/app-icons/icon6.png',
  },
  {
    id: 'icon7',
    name: 'Icon 7',
    preview: '/images/app-icons/icon7.png',
  },
  {
    id: 'icon8',
    name: 'Icon 8',
    preview: '/images/app-icons/icon8.png',
  },
]

export default function CrAppIconSelector({
  icons = defaultIcons,
  currentIcon = 'icon1',
  onIconChange,
  onApply,
}: CrAppIconSelectorProps) {
  const [selectedIcon, setSelectedIcon] = useState(currentIcon)
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    setSelectedIcon(currentIcon)
  }, [currentIcon])

  const handleIconSelect = async (iconId: string) => {
    console.log('[CrAppIconSelector] Icon selected:', iconId)

    if (iconId === currentIcon) {
      console.log('[CrAppIconSelector] Already using this icon, skipping')
      return
    }

    setSelectedIcon(iconId)
    if (onIconChange) {
      onIconChange(iconId)
    }

    // Apply immediately on click
    if (onApply) {
      setIsApplying(true)
      try {
        console.log('[CrAppIconSelector] Auto-applying icon:', iconId)
        await onApply(iconId)
        console.log('[CrAppIconSelector] Icon change completed successfully')
      } catch (error) {
        console.error('[CrAppIconSelector] Failed to change icon:', error)
      } finally {
        setIsApplying(false)
      }
    }
  }

  const handleApply = async () => {
    console.log('[CrAppIconSelector] handleApply called. selectedIcon:', selectedIcon, 'currentIcon:', currentIcon, 'onApply:', !!onApply)

    if (!onApply || selectedIcon === currentIcon) {
      console.log('[CrAppIconSelector] Skipping apply - no changes or no handler')
      return
    }

    console.log('[CrAppIconSelector] Starting icon change to:', selectedIcon)
    setIsApplying(true)
    try {
      await onApply(selectedIcon)
      console.log('[CrAppIconSelector] Icon change completed successfully')
    } catch (error) {
      console.error('[CrAppIconSelector] Failed to change icon:', error)
    } finally {
      setIsApplying(false)
    }
  }

  const hasChanges = selectedIcon !== currentIcon

  return (
    <div className="cr-app-icon-selector">
      <div className="cr-app-icon-selector__header">
        <h3 className="cr-app-icon-selector__title">Choose App Icon</h3>
        <p className="cr-app-icon-selector__description">
          Select an icon to personalize your home screen
        </p>
      </div>

      <div className="cr-app-icon-selector__grid">
        {icons.map((icon) => (
          <button
            key={icon.id}
            className={`cr-app-icon-selector__option ${
              selectedIcon === icon.id ? 'cr-app-icon-selector__option--selected' : ''
            } ${currentIcon === icon.id ? 'cr-app-icon-selector__option--current' : ''}`}
            onClick={() => handleIconSelect(icon.id)}
            type="button"
          >
            <div className="cr-app-icon-selector__preview">
              <img src={icon.preview} alt={icon.name} className="cr-app-icon-selector__image" />
            </div>
          </button>
        ))}
      </div>

      {hasChanges && (
        <div className="cr-app-icon-selector__actions">
          <CrButton
            variant="solid"
            color="primary"
            size="medium"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? 'Applying...' : 'Apply Icon'}
          </CrButton>
        </div>
      )}
    </div>
  )
}
