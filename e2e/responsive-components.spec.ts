import { test, expect } from '@playwright/test';

/**
 * Responsive Component Tests
 * Tests key components across breakpoints
 */

test.describe('Responsive - Top Banner', () => {
  test('should stack at mobile breakpoint', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 640, height: 800 });

    const banner = page.locator('.cr-logo-banner__container');
    await expect(banner).toBeVisible();

    await expect(banner).toHaveScreenshot('top-banner-mobile.png');
  });

  test('should be horizontal at desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 1280, height: 1024 });

    const banner = page.locator('.cr-logo-banner__container');
    await expect(banner).toBeVisible();

    await expect(banner).toHaveScreenshot('top-banner-desktop.png');
  });
});

test.describe('Responsive - Recently Played', () => {
  test('should show table variant at mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 480, height: 800 });

    const recentlyPlayed = page.locator('.cr-recently-played');
    await expect(recentlyPlayed).toBeVisible();

    // Check for table variant
    const tableVariant = page.locator('.cr-playlist-item--table');
    await expect(tableVariant.first()).toBeVisible();

    await expect(recentlyPlayed).toHaveScreenshot('recently-played-mobile-table.png');
  });

  test('should show card variant at desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 1280, height: 1024 });

    const recentlyPlayed = page.locator('.cr-recently-played');
    await expect(recentlyPlayed).toBeVisible();

    // Check for card variant
    const cardVariant = page.locator('.cr-playlist-item--card');
    await expect(cardVariant.first()).toBeVisible();

    await expect(recentlyPlayed).toHaveScreenshot('recently-played-desktop-card.png');
  });
});

test.describe('Responsive - Main Navigation', () => {
  test('should be compact at tablet breakpoint (768px)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 768, height: 1024 });

    const nav = page.locator('.cr-main-nav');
    await expect(nav).toBeVisible();

    await expect(nav).toHaveScreenshot('main-nav-tablet.png');
  });

  test('should be full width at desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 1440, height: 1024 });

    const nav = page.locator('.cr-main-nav');
    await expect(nav).toBeVisible();

    await expect(nav).toHaveScreenshot('main-nav-desktop.png');
  });
});

test.describe('Responsive - Footer', () => {
  test('should stack at mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 480, height: 800 });

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footer = page.locator('.cr-footer');
    await expect(footer).toBeVisible();

    await expect(footer).toHaveScreenshot('footer-mobile.png');
  });

  test('should be multi-column at desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.setViewportSize({ width: 1280, height: 1024 });

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footer = page.locator('.cr-footer');
    await expect(footer).toBeVisible();

    await expect(footer).toHaveScreenshot('footer-desktop.png');
  });
});

test.describe('Responsive - Breakpoint Validation', () => {
  const breakpoints = [
    { name: 'XXS Mobile (380px)', width: 380, height: 667 },
    { name: 'XS Mobile (480px)', width: 480, height: 800 },
    { name: 'SM Mobile (640px)', width: 640, height: 900 },
    { name: 'MD Tablet (768px)', width: 768, height: 1024 },
    { name: 'Near-LG (968px)', width: 968, height: 768 },
    { name: 'LG Desktop (1024px)', width: 1024, height: 768 },
    { name: 'Near-XL (1200px)', width: 1200, height: 900 },
    { name: 'XL Desktop (1280px)', width: 1280, height: 1024 },
    { name: '2XL Desktop (1440px)', width: 1440, height: 1024 },
  ];

  for (const breakpoint of breakpoints) {
    test(`should render correctly at ${breakpoint.name}`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

      const screenshotName = `landing-page-${breakpoint.width}px.png`;
      await expect(page).toHaveScreenshot(screenshotName, {
        fullPage: true,
      });
    });
  }
});
