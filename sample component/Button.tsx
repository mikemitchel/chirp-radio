// src/components/Button/Button.tsx
import React from 'react'
import './Button.css'

export type ButtonProps = {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({ label, onClick, type = 'button', disabled = false }: ButtonProps) {
  return (
    <button className="btn" type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  )
}
