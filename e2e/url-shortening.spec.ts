import { test, expect } from '@playwright/test';
import { testUsers, testUrls } from './test-data/fixtures';

test.describe('URL Shortening', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto('/');
        await page.fill('input[type="email"]', testUsers.validUser.email);
        await page.fill('input[type="password"]', testUsers.validUser.password);
        await page.click('button:has-text("Sign In")');
        await expect(page.locator('text=Create Short Link')).toBeVisible();
    });

    test('should create a short URL', async ({ page }) => {
        // Enter URL to shorten
        await page.fill('input[type="url"]', testUrls.validUrl);

        // Click shorten button
        await page.click('button:has-text("Shorten")');

        // Wait for success message
        await expect(page.locator('text=URL Shortened Successfully')).toBeVisible({ timeout: 5000 });

        // Verify short URL is displayed
        await expect(page.locator('.shortened-url')).toBeVisible();
    });

    test('should create a password-protected URL', async ({ page }) => {
        // Enter URL
        await page.fill('input[type="url"]', testUrls.longUrl);

        // Enable password protection
        await page.click('input[type="checkbox"]');

        // Enter password
        await page.fill('input[type="password"]', 'mypassword123');

        // Submit
        await page.click('button:has-text("Shorten")');

        // Verify success
        await expect(page.locator('text=URL Shortened Successfully')).toBeVisible({ timeout: 5000 });
    });

    test('should display shortened URLs in the list', async ({ page }) => {
        // Create a URL
        await page.fill('input[type="url"]', testUrls.validUrl);
        await page.click('button:has-text("Shorten")');
        await expect(page.locator('text=URL Shortened Successfully')).toBeVisible({ timeout: 5000 });

        // Check if URL appears in the list
        await expect(page.locator('.url-list')).toBeVisible();
        await expect(page.locator(`text=${testUrls.validUrl}`)).toBeVisible();
    });

    test('should copy short URL to clipboard', async ({ page, context }) => {
        // Grant clipboard permissions
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        // Create a URL first
        await page.fill('input[type="url"]', testUrls.validUrl);
        await page.click('button:has-text("Shorten")');
        await expect(page.locator('text=URL Shortened Successfully')).toBeVisible({ timeout: 5000 });

        // Click copy button
        await page.click('button:has-text("Copy")');

        // Verify copied state
        await expect(page.locator('button:has-text("Copied")')).toBeVisible({ timeout: 2000 });
    });

    test('should toggle URL active status', async ({ page }) => {
        // Assuming there's at least one URL in the list
        const toggleButton = page.locator('button[title*="Disable"]').first();

        if (await toggleButton.isVisible()) {
            await toggleButton.click();

            // Wait for the action to complete
            await page.waitForTimeout(1000);

            // Verify status changed
            await expect(page.locator('.disabled-warning').first()).toBeVisible();
        }
    });
});
