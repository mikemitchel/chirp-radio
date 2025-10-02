import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  test('renders with label', () => {
    render(<Button label="Click Me" />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button label="Click" onClick={handleClick} />)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when `disabled` prop is true', () => {
    render(<Button label="Disabled" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
