import { render, screen } from '@testing-library/react';
import Analytics from './Analytics';

describe('Analytics', () => {
    const mockUrls = [
        {
            _id: '1',
            originalUrl: 'https://example.com',
            shortUrl: 'alias1',
            clicks: 10,
            createdAt: new Date().toISOString()
        },
        {
            _id: '2',
            originalUrl: 'https://test.com',
            shortUrl: 'alias2',
            clicks: 20,
            createdAt: new Date().toISOString()
        }
    ];

    it('renders analytics stats correctly', () => {
        render(<Analytics urls={mockUrls} />);

        expect(screen.getByText('30')).toBeInTheDocument(); // Total Clicks
        expect(screen.getByText('2')).toBeInTheDocument();  // Total URLs
        expect(screen.getByText('15.0')).toBeInTheDocument(); // Avg Clicks
        // Best Performer is 20, which might conflict if clicks are 20. But here clicks is 30.
        // However, 20 is also one of the clicks in mockUrls? 
        // Best Performer clicks = 20.
        // So looking for '20' will find it.
        expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('renders top performing URLs', () => {
        render(<Analytics urls={mockUrls} />);
        expect(screen.getByText('https://test.com')).toBeInTheDocument();
        expect(screen.getByText(/\/alias2/)).toBeInTheDocument();
    });

    it('renders properly with empty data', () => {
        render(<Analytics urls={[]} />);
        // EXPECT '0' multiple times.
        const zeros = screen.getAllByText('0');
        expect(zeros.length).toBeGreaterThan(0);

        expect(screen.getByText(/no click data available/i)).toBeInTheDocument();
    });
});
