import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with children', () => {
      render(<Button>Click Me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should render with different variants', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const
      
      variants.forEach(variant => {
        const { container } = render(<Button variant={variant}>Test</Button>)
        expect(container.firstChild).toBeInTheDocument()
      })
    })

    it('should render with different sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      
      sizes.forEach(size => {
        const { container } = render(<Button size={size}>Test</Button>)
        expect(container.firstChild).toBeInTheDocument()
      })
    })
  })

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<Button onClick={handleClick}>Click Me</Button>)
      await user.click(screen.getByRole('button', { name: /click me/i }))
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      await user.click(screen.getByRole('button', { name: /disabled/i }))
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should be focusable', () => {
      render(<Button>Focusable</Button>)
      const button = screen.getByRole('button', { name: /focusable/i })
      button.focus()
      expect(button).toHaveFocus()
    })

    it('should have correct type attribute', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button', { name: /submit/i })).toHaveAttribute('type', 'submit')
    })
  })
})
