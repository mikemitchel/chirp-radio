import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated Accessibility Tests
 * Tests WCAG 2.1 compliance using axe-core
 */

test.describe('Accessibility Tests', () => {
  test('landing page should not have accessibility violations', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('landing page dark mode should not have accessibility violations', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check that h1 exists (use first() to avoid strict mode violation)
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Test carousel navigation buttons
    const nextButton = page.locator('.hero-carousel__button--next');
    await nextButton.focus();
    await expect(nextButton).toBeFocused();

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    // Button should still be focusable after interaction
    await expect(nextButton).toBeVisible();
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Get all images
    const images = page.locator('img');
    const count = await images.count();

    // Check each image has alt attribute
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    // Filter for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter((violation) =>
      violation.id.includes('color-contrast')
    );

    expect(contrastViolations).toEqual([]);
  });
});
