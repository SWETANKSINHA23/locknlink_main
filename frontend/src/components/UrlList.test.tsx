import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UrlList from './UrlList';
import { vi } from 'vitest';

describe('UrlList', () => {
    const mockOnUrlsChange = vi.fn();
    const mockUrls = [
        {
            _id: '1',
            originalUrl: 'https://example.com',
            shortUrl: 'alias1',
            clicks: 10,
            createdAt: new Date().toISOString(),
            isPasswordProtected: false,
            isActive: true,
            passwordAttempts: 0
        },
        {
            _id: '2',
            originalUrl: 'https://test.com',
            shortUrl: 'alias2',
            clicks: 5,
            createdAt: new Date().toISOString(),
            isPasswordProtected: true,
            isActive: false,
            passwordAttempts: 0
        }
    ];

    beforeAll(() => {
        // Basic mock if not handled by setup.test.ts or jsdom
    });

    it('renders empty state', () => {
        render(<UrlList urls={[]} onUrlsChange={mockOnUrlsChange} />);
        expect(screen.getByText('No URLs yet')).toBeInTheDocument();
    });

    it('renders list of URLs', () => {
        render(<UrlList urls={mockUrls} onUrlsChange={mockOnUrlsChange} />);
        expect(screen.getByText('https://example.com')).toBeInTheDocument();
        // Use regex to match partial text because of how it's rendered (might include '/')
        expect(screen.getByText(/alias1/)).toBeInTheDocument();
        expect(screen.getByText(/alias2/)).toBeInTheDocument();
    });

    it('copies short URL to clipboard', async () => {
        const user = userEvent.setup();
        const writeTextMock = vi.fn();

        // Configurable clipboard mock using defineProperty
        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: writeTextMock,
            },
            writable: true,
            configurable: true // Important to allow re-definition/clearing
        });

        render(<UrlList urls={mockUrls} onUrlsChange={mockOnUrlsChange} />);

        const copyButtons = screen.getAllByTitle('Copy to clipboard');
        await user.click(copyButtons[0]);

        expect(writeTextMock).toHaveBeenCalled();
    });

    it('toggles URL active status', async () => {
        const user = userEvent.setup();
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({})
        });

        render(<UrlList urls={mockUrls} onUrlsChange={mockOnUrlsChange} />);

        // Find toggle button for first active URL
        const toggleButton = screen.getAllByTitle('Disable Link')[0];
        await user.click(toggleButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/toggle/1'),
                expect.objectContaining({ method: 'PUT' })
            );
            expect(mockOnUrlsChange).toHaveBeenCalled();
        });
    });
});
