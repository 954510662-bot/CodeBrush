import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render input element', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should render with label when provided', () => {
      render(<Input label="Email Address" />)
      expect(screen.getByText(/email address/i)).toBeInTheDocument()
    })

    it('should render with error message when provided', () => {
      render(<Input error="This field is required" />)
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should accept text input', async () => {
      const user = userEvent.setup()
      render(<Input placeholder="Enter text" />)
      
      const input = screen.getByPlaceholderText(/enter text/i)
      await user.type(input, 'Hello World')
      
      expect(input).toHaveValue('Hello World')
    })

    it('should call onChange when value changes', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      
      render(<Input onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('should have error styling when error prop is provided', () => {
      render(<Input error="Error" />)
      const input = screen.getByRole('textbox')
      expect(input.className).toContain('border-red-500')
    })

    it('should apply custom className', () => {
      render(<Input className="custom-class" />)
      const input = screen.getByRole('textbox')
      expect(input.className).toContain('custom-class')
    })
  })
})
