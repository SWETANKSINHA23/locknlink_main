import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from './AuthForm';
import { vi } from 'vitest';

describe('AuthForm', () => {
    const mockOnAuth = vi.fn();

    beforeEach(() => {
        mockOnAuth.mockClear();
    });

    it('renders login form by default', () => {
        render(<AuthForm onAuth={mockOnAuth} isLoading={false} error="" />);
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    });

    it('switches to register mode', async () => {
        const user = userEvent.setup();
        render(<AuthForm onAuth={mockOnAuth} isLoading={false} error="" />);

        const switchButton = screen.getByRole('button', { name: /create one/i });
        await user.click(switchButton);

        expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
        expect(screen.getByText(/join us/i)).toBeInTheDocument();
    });

    it('submits form with credentials', async () => {
        const user = userEvent.setup();
        render(<AuthForm onAuth={mockOnAuth} isLoading={false} error="" />);

        await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
        await user.type(screen.getByLabelText('Password'), 'password123');
        await user.click(screen.getByRole('button', { name: /sign in/i }));

        expect(mockOnAuth).toHaveBeenCalledWith('test@example.com', 'password123', 'login');
    });

    it('displays error message', () => {
        render(<AuthForm onAuth={mockOnAuth} isLoading={false} error="Invalid credentials" />);
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
});
