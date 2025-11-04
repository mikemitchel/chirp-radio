import { test, expect } from '@playwright/test';

/**
 * Landing Page Visual Regression Tests
 * Tests responsive layouts and visual consistency
 */

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should render landing page correctly', async ({ page }) => {
    // Wait for main content to be visible (use first() due to multiple .landing-page classes)
    await expect(page.locator('div.landing-page').first()).toBeVisible();

    // Take full page screenshot for visual regression
    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
    });
  });

  test('should render hero carousel', async ({ page }) => {
    const carousel = page.locator('.hero-carousel');
    await expect(carousel).toBeVisible();

    // Screenshot of carousel only
    await expect(carousel).toHaveScreenshot('hero-carousel.png');
  });

  test('should render current DJ section', async ({ page }) => {
    const currentDj = page.locator('.cr-current-dj');
    await expect(currentDj).toBeVisible();

    await expect(currentDj).toHaveScreenshot('current-dj.png');
  });

  test('should render recently played section', async ({ page }) => {
    const recentlyPlayed = page.locator('.cr-recently-played');
    await expect(recentlyPlayed).toBeVisible();

    await expect(recentlyPlayed).toHaveScreenshot('recently-played.png');
  });

  test('should have no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Wait for landing page to be visible instead of networkidle
    await expect(page.locator('div.landing-page').first()).toBeVisible();

    expect(consoleErrors).toHaveLength(0);
  });
});

test.describe('Landing Page - Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Toggle dark mode
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
  });

  test('should render landing page in dark mode', async ({ page }) => {
    await expect(page.locator('div.landing-page').first()).toBeVisible();

    await expect(page).toHaveScreenshot('landing-page-dark.png', {
      fullPage: true,
    });
  });
});

test.describe('Landing Page - Interactions', () => {
  test('should navigate carousel on button click', async ({ page }) => {
    await page.goto('/');

    const nextButton = page.locator('.hero-carousel__button--next');
    await expect(nextButton).toBeVisible();

    // Click next button
    await nextButton.click();

    // Wait for animation
    await page.waitForTimeout(500);

    // Take screenshot after interaction
    await expect(page.locator('.hero-carousel')).toHaveScreenshot(
      'hero-carousel-after-next.png'
    );
  });
});
