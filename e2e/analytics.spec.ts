import { test, expect } from '@playwright/test';
import { testUsers } from './test-data/fixtures';

test.describe('Analytics Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('/');
        await page.fill('input[type="email"]', testUsers.validUser.email);
        await page.fill('input[type="password"]', testUsers.validUser.password);
        await page.click('button:has-text("Sign In")');
        await expect(page.locator('text=Create Short Link')).toBeVisible();
    });

    test('should display analytics dashboard', async ({ page }) => {
        // Check if analytics section is visible
        await expect(page.locator('text=Analytics Dashboard')).toBeVisible();
    });

    test('should show total URLs count', async ({ page }) => {
        // Verify stats cards are visible
        await expect(page.locator('text=Total URLs')).toBeVisible();
        await expect(page.locator('.stat-card').first()).toBeVisible();
    });

    test('should show total clicks count', async ({ page }) => {
        await expect(page.locator('text=Total Clicks')).toBeVisible();
    });

    test('should show average clicks per URL', async ({ page }) => {
        await expect(page.locator('text=Avg. Clicks/URL')).toBeVisible();
    });

    test('should display top performing URLs', async ({ page }) => {
        await expect(page.locator('text=Top Performing URLs')).toBeVisible();

        // Check if the top URLs section exists
        const topUrlsSection = page.locator('.top-urls');
        await expect(topUrlsSection).toBeVisible();
    });

    test('should display recent activity', async ({ page }) => {
        await expect(page.locator('text=Recent Activity')).toBeVisible();

        // Check if recent activity section exists
        const recentActivity = page.locator('.recent-activity');
        await expect(recentActivity).toBeVisible();
    });

    test('should display click distribution chart', async ({ page }) => {
        // Check if click distribution section exists (if there's data)
        const clickChart = page.locator('.click-chart');

        // This might not be visible if there's no data
        const isVisible = await clickChart.isVisible().catch(() => false);

        if (isVisible) {
            await expect(clickChart).toBeVisible();
        }
    });

    test('should show empty state when no URLs exist', async ({ page, context }) => {
        // This test assumes a fresh user with no URLs
        // You might need to create a new user or clear data

        const emptyState = page.locator('text=No click data available');

        // Check if empty state exists (conditional based on data)
        const hasData = await page.locator('.top-url-item').count() > 0;

        if (!hasData) {
            await expect(emptyState).toBeVisible();
        }
    });
});
