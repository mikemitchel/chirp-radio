// CrToggle.tsx
import './CrToggle.css'

interface CrToggleProps {
  checked?: boolean
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  size?: string
  variant?: string
  leftLabel?: string
  rightLabel?: string
  'aria-label'?: string
  id?: string
}

export default function CrToggle({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  variant = 'boolean', // 'boolean' or 'selection'
  leftLabel,
  rightLabel,
  'aria-label': ariaLabel,
  id,
  ...props
}: CrToggleProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      '🎵 [CrToggle] handleChange called, checked:',
      event.target.checked,
      'disabled:',
      disabled,
      'hasOnChange:',
      !!onChange
    )
    if (!disabled && onChange) {
      onChange(event.target.checked, event)
    }
  }

  const toggleClasses = [
    'cr-toggle',
    `cr-toggle--${size}`,
    `cr-toggle--${variant}`,
    checked ? 'cr-toggle--checked' : '',
    disabled ? 'cr-toggle--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleTrackClick = () => {
    console.log(
      '🎵 [CrToggle] handleTrackClick called, checked:',
      checked,
      'willBe:',
      !checked,
      'disabled:',
      disabled,
      'hasOnChange:',
      !!onChange
    )
    if (!disabled && onChange) {
      onChange(!checked, { target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <div className={toggleClasses}>
      {leftLabel && <span className="cr-toggle__label cr-toggle__label--left">{leftLabel}</span>}

      <input
        type="checkbox"
        className="cr-toggle__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        id={id}
        {...props}
      />
      <div className="cr-toggle__track" onClick={handleTrackClick}>
        <div className="cr-toggle__thumb" />
      </div>

      {rightLabel && <span className="cr-toggle__label cr-toggle__label--right">{rightLabel}</span>}
    </div>
  )
}
