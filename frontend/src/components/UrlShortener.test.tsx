import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UrlShortener from './UrlShortener';
import { vi } from 'vitest';

describe('UrlShortener', () => {
    const mockOnUrlShortened = vi.fn();
    const mockSetIsLoading = vi.fn();

    beforeEach(() => {
        mockOnUrlShortened.mockClear();
        mockSetIsLoading.mockClear();
        global.fetch = vi.fn();
    });

    it('renders input field', () => {
        render(
            <UrlShortener
                onUrlShortened={mockOnUrlShortened}
                isLoading={false}
                setIsLoading={mockSetIsLoading}
                token="test-token"
            />
        );
        expect(screen.getByPlaceholderText('https://example.com/your-very-long-url')).toBeInTheDocument();
    });

    it('submits URL for shortening', async () => {
        const user = userEvent.setup();
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ shortUrl: 'http://short.url/123' })
        });

        render(
            <UrlShortener
                onUrlShortened={mockOnUrlShortened}
                isLoading={false}
                setIsLoading={mockSetIsLoading}
                token="test-token"
            />
        );

        await user.type(screen.getByPlaceholderText('https://example.com/your-very-long-url'), 'https://google.com');
        await user.click(screen.getByText('Shorten'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/shorten'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ originalUrl: 'https://google.com' })
                })
            );
        });
    });

    it('toggles password protection', async () => {
        const user = userEvent.setup();
        render(
            <UrlShortener
                onUrlShortened={mockOnUrlShortened}
                isLoading={false}
                setIsLoading={mockSetIsLoading}
                token="test-token"
            />
        );

        const toggle = screen.getByRole('checkbox');
        await user.click(toggle);

        expect(screen.getByPlaceholderText('Enter password to protect this link')).toBeInTheDocument();
    });
});
