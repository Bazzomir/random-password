// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
    it('renders the PasswordGenerator component', () => {
        render(<App />)

        expect(screen.getByText('Password Generator')).toBeInTheDocument()
        expect(screen.getByText('Create secure passwords with a single click')).toBeInTheDocument()
    })
})