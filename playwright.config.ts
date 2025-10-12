import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Visual Regression Testing
 * Tests responsive layouts across multiple devices and browsers
 */
export default defineConfig({
  testDir: './e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: 'html',

  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:5173',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers and devices */
  projects: [
    // Desktop browsers
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },

    // Tablet devices
    {
      name: 'iPad Landscape',
      use: { ...devices['iPad (gen 7) landscape'] },
    },
    {
      name: 'iPad Portrait',
      use: { ...devices['iPad (gen 7)'] },
    },

    // Mobile devices
    {
      name: 'iPhone 14',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'iPhone 14 Landscape',
      use: { ...devices['iPhone 14 landscape'] },
    },
    {
      name: 'Pixel 7',
      use: { ...devices['Pixel 7'] },
    },

    // Custom breakpoints matching your design system
    {
      name: 'Mobile Small (480px)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 480, height: 800 },
      },
    },
    {
      name: 'Mobile Large (640px)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 640, height: 900 },
      },
    },
    {
      name: 'Tablet (768px)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'Desktop Small (1024px)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'Desktop (1280px)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 1024 },
      },
    },
    {
      name: 'Desktop Large (1440px)',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1024 },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
