import { test, expect } from '@playwright/test';
import { generateUniqueEmail, testUsers } from './test-data/fixtures';

test.describe('Authentication Flow', () => {
    test('should register a new user', async ({ page }) => {
        await page.goto('/');

        const email = generateUniqueEmail();
        const password = 'Test123456';

        // Fill registration form
        await page.fill('input[type="email"]', email);
        await page.fill('input[type="password"]', password);

        // Click register button
        await page.click('button:has-text("Create Account")');

        // Wait for successful registration
        await expect(page).toHaveURL(/.*/, { timeout: 5000 });

        // Verify user is logged in (check for logout or user-specific element)
        await expect(page.locator('text=Create Short Link')).toBeVisible();
    });

    test('should login with existing user', async ({ page }) => {
        await page.goto('/');

        // Fill login form
        await page.fill('input[type="email"]', testUsers.validUser.email);
        await page.fill('input[type="password"]', testUsers.validUser.password);

        // Click login button
        await page.click('button:has-text("Sign In")');

        // Wait for successful login
        await expect(page.locator('text=Create Short Link')).toBeVisible({ timeout: 5000 });
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await page.goto('/');

        await page.fill('input[type="email"]', 'invalid@example.com');
        await page.fill('input[type="password"]', 'wrongpassword');

        await page.click('button:has-text("Sign In")');

        // Check for error message
        await expect(page.locator('.error-message')).toBeVisible({ timeout: 5000 });
    });

    test('should switch between login and register modes', async ({ page }) => {
        await page.goto('/');

        // Initially on login
        await expect(page.locator('h2:has-text("Welcome Back")')).toBeVisible();

        // Switch to register
        await page.click('button:has-text("Create one")');
        await expect(page.locator('h2:has-text("Create Account")')).toBeVisible();

        // Switch back to login
        await page.click('button:has-text("Sign in")');
        await expect(page.locator('h2:has-text("Welcome Back")')).toBeVisible();
    });
});
