import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordGenerator from '../components/PasswordGenerator'

Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn(() => Promise.resolve())
    }
})

describe('PasswordGenerator', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the component correctly', () => {
        render(<PasswordGenerator />)

        expect(screen.getByText('Password Generator')).toBeInTheDocument()
        expect(screen.getByText('Create secure passwords with a single click')).toBeInTheDocument()
        expect(screen.getByText('Your password will appear here')).toBeInTheDocument()

        expect(screen.getByText('4-Digit PIN')).toBeInTheDocument()
        expect(screen.getByText('8 Characters')).toBeInTheDocument()
        expect(screen.getByText('12 Characters')).toBeInTheDocument()
        expect(screen.getByText('22 Characters')).toBeInTheDocument()
    })

    it('generates a 4-digit PIN when the option is clicked', async () => {
        render(<PasswordGenerator />)

        await userEvent.click(screen.getByText('4-Digit PIN'))

        const passwordElement = screen.queryByText('Your password will appear here')
        expect(passwordElement).not.toBeInTheDocument()

        const generatedPassword = screen.getByText(/^\d{4}$/)
        expect(generatedPassword).toBeInTheDocument()
    })

    it('generates an 8-character password when the option is clicked', async () => {
        render(<PasswordGenerator />)

        await userEvent.click(screen.getByText('8 Characters'))

        const passwordElement = screen.queryByText('Your password will appear here')
        expect(passwordElement).not.toBeInTheDocument()
    })

    it('copies the password to clipboard when copy button is clicked', async () => {
        render(<PasswordGenerator />)

        await userEvent.click(screen.getByText('8 Characters'))

        const copyButton = screen.getByTitle('Copy to clipboard')
        await userEvent.click(copyButton)
        
        await waitFor(() => {
            expect(screen.getByText('Password copied! 📋')).toBeInTheDocument()
        })
    })

    it('generates a new password when refresh button is clicked', async () => {
        const { container } = render(<PasswordGenerator />)

        await userEvent.click(screen.getByText('8 Characters'))

        const initialHTML = container.innerHTML

        const firstPasswordDisplay = screen.getByTestId('password-display');
        const firstPassword = firstPasswordDisplay.textContent || '';

        const refreshButton = screen.getByTitle('Generate new password')
        await userEvent.click(refreshButton)

        expect(container.innerHTML).not.toBe(initialHTML)

        const newPasswordDisplay = screen.getByTestId('password-display')
        const newPassword = newPasswordDisplay.textContent || ''

        expect(firstPassword).not.toBe(newPassword)
    })

    it('updates the strength indicator based on password length', async () => {
        render(<PasswordGenerator />)

        await userEvent.click(screen.getByText('4-Digit PIN'))
        let strengthIndicator = document.querySelector('.bg-red-500')
        expect(strengthIndicator).toBeInTheDocument()

        await userEvent.click(screen.getByText('8 Characters'))
        strengthIndicator = document.querySelector('.bg-yellow-500')
        expect(strengthIndicator).toBeInTheDocument()

        await userEvent.click(screen.getByText('12 Characters'))
        strengthIndicator = document.querySelector('.bg-green-500')
        expect(strengthIndicator).toBeInTheDocument()

        await userEvent.click(screen.getByText('22 Characters'))
        strengthIndicator = document.querySelector('.bg-purple-500')
        expect(strengthIndicator).toBeInTheDocument()
    })
})