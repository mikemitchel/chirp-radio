// CrButtonGroup.tsx - Use CrButton for all states
import CrButton from './CrButton'
import './CrButtonGroup.css'

interface CrButtonGroupProps {
  day?: string
  isActive?: boolean
  isToday?: boolean
  onClick?: () => void
  options?: any[]
  selectedValue?: string | null
  onSelectionChange?: (value: string) => void
  layout?: string
  variant?: string
  size?: string
  className?: string
}

export default function CrButtonGroup({
  // Legacy DJ schedule props (for backward compatibility)
  day,
  isActive = false,
  isToday = false,
  onClick,

  // New generic button group props
  options = [],
  selectedValue = null,
  onSelectionChange,
  layout = 'horizontal',
  variant = 'schedule',
  size = 'small',
  className = '',
}: CrButtonGroupProps) {
  // Handle legacy DJ schedule usage (backward compatible)
  if (day && !options.length) {
    return renderScheduleTab()
  }

  // Handle new generic usage
  return renderButtonGroup()

  // Legacy DJ schedule tab rendering (unchanged)
  function renderScheduleTab() {
    const getTabLabel = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200
      if (width < 540) {
        return day?.slice(0, 1).toUpperCase()
      } else if (width < 820) {
        return day?.slice(0, 3).toUpperCase()
      } else {
        return day
      }
    }

    const getButtonVariant = () => {
      if (isActive) return 'solid'
      if (isToday) return 'solid'
      return 'text'
    }

    const getButtonColor = () => {
      if (isActive) return 'secondary'
      if (isToday) return 'default'
      return 'default'
    }

    return (
      <div
        className={`cr-dj-schedule-tab ${isActive ? 'cr-dj-schedule-tab--active' : ''} ${isToday && !isActive ? 'cr-dj-schedule-tab--today' : ''} ${className}`}
        role="tab"
        aria-selected={isActive}
        aria-controls="schedule-panel"
      >
        <CrButton
          variant={getButtonVariant()}
          color={getButtonColor()}
          size="small"
          onClick={onClick}
        >
          {getTabLabel()}
        </CrButton>
      </div>
    )
  }

  // New generic button group rendering - ALL USE CrButton
  function renderButtonGroup() {
    const componentClasses = [
      'cr-button-group',
      `cr-button-group--${layout}`,
      `cr-button-group--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const handleOptionClick = (optionValue: any) => {
      if (selectedValue !== optionValue) {
        onSelectionChange?.(optionValue)
      }
    }

    return (
      <div className={componentClasses}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value

          // ALL buttons use CrButton - just different variants/colors for selected state
          return (
            <CrButton
              key={option.value}
              variant={isSelected ? 'solid' : 'text'}
              color={isSelected ? 'secondary' : 'default'}
              size={size}
              onClick={() => handleOptionClick(option.value)}
              leftIcon={option.leftIcon}
              rightIcon={option.rightIcon}
            >
              {option.label}
            </CrButton>
          )
        })}
      </div>
    )
  }
}
