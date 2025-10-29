import React, { useState, useRef, useEffect } from 'react'
import { PiCaretDown } from 'react-icons/pi'
import CrButton from './CrButton'
import CrSelect from './CrSelect'
import './CrSelectButtonInteraction.css'

interface CrSelectButtonInteractionProps {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  options?: any[]
  onSelect?: (option: any) => void
  size?: string
  variant?: string
  color?: string
  disabled?: boolean
  theme?: string
  className?: string
}

export default function CrSelectButtonInteraction({
  children = 'Select',
  leftIcon,
  options = [],
  onSelect,
  size = 'medium',
  variant = 'solid',
  color = 'default',
  disabled = false,
  theme = 'light',
  className = '',
  ...buttonProps
}: CrSelectButtonInteractionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const closeMenu = () => {
    setIsClosing(true)
    animationTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 150)
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (containerRef.current && !(containerRef.current as any).contains(event.target)) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    function handleEscape(event: any) {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  const handleButtonClick = () => {
    if (!disabled) {
      if (isOpen || isClosing) {
        closeMenu()
      } else {
        setIsOpen(true)
        setIsClosing(false)
      }
    }
  }

  const handleOptionSelect = (option: any) => {
    closeMenu()
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleMouseLeave = () => {
    // Only start close timer if menu is actually open
    if (isOpen && !isClosing) {
      closeTimeoutRef.current = setTimeout(() => {
        closeMenu()
      }, 150) as any
    }
  }

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (isClosing) {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
        animationTimeoutRef.current = null
      }
      setIsClosing(false)
    }
  }

  const containerClasses = ['cr-select-button-interaction', className].filter(Boolean).join(' ')

  const menuClasses = [
    'cr-select-button-interaction__menu',
    isClosing ? 'cr-select-button-interaction__menu--closing' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={containerClasses}
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <CrButton
        size={size}
        variant={variant}
        color={color}
        disabled={disabled}
        leftIcon={leftIcon}
        rightIcon={<PiCaretDown />}
        onClick={handleButtonClick}
        {...buttonProps}
      >
        {children}
      </CrButton>

      {(isOpen || isClosing) && (
        <div className={menuClasses}>
          <CrSelect options={options} onSelect={handleOptionSelect} theme={theme} />
        </div>
      )}
    </div>
  )
}
