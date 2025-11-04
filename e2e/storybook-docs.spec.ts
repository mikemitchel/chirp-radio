import { test, expect } from '@playwright/test'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * Storybook Documentation Pages Test
 * Validates that all component documentation pages render correctly
 */

// Helper function to extract story titles from files
function getStoryTitles(): Array<{ title: string; file: string }> {
  const storiesDir = join(process.cwd(), 'src/stories')
  const storyFiles = readdirSync(storiesDir).filter((file) => file.endsWith('.stories.js'))

  const titles: Array<{ title: string; file: string }> = []

  for (const file of storyFiles) {
    const content = readFileSync(join(storiesDir, file), 'utf-8')

    // Extract title from: title: 'Category/ComponentName',
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/)

    if (titleMatch) {
      titles.push({ title: titleMatch[1], file })
    }
  }

  return titles
}

// Helper function to convert story title to Storybook docs URL
function titleToDocsUrl(title: string): string {
  // Convert "Atoms/CrChip" to "atoms-crchip--docs"
  return title.toLowerCase().replace(/\//g, '-') + '--docs'
}

test.describe('Storybook Documentation Pages', () => {
  const STORYBOOK_URL = 'http://localhost:6006'
  const storyTitles = getStoryTitles()

  test(`should have found story files (found ${storyTitles.length})`, () => {
    expect(storyTitles.length).toBeGreaterThan(0)
  })

  for (const { title, file } of storyTitles) {
    test(`should render docs page for: ${title} (${file})`, async ({ page }) => {
      const docsUrl = titleToDocsUrl(title)
      const fullUrl = `${STORYBOOK_URL}/?path=/docs/${docsUrl}`

      // Track console errors
      const consoleErrors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })

      // Navigate to the docs page
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded' })

      // Wait for Storybook to load and render
      await page.waitForTimeout(2000)

      // Check that root element is visible (confirms page loaded)
      const root = page.locator('#root')
      await expect(root).toBeVisible()

      // Check for critical console errors (excluding known warnings)
      const criticalErrors = consoleErrors.filter(
        (error) =>
          !error.includes('storybook-addon-remix-react-router') &&
          !error.includes('ResizeObserver') &&
          !error.toLowerCase().includes('warning')
      )

      if (criticalErrors.length > 0) {
        console.error(`Console errors on ${title}:`, criticalErrors)
      }

      expect(criticalErrors).toHaveLength(0)
    })
  }
})

test.describe('Storybook Documentation - Sample Spot Checks', () => {
  const STORYBOOK_URL = 'http://localhost:6006'

  test('should render CrChip docs with examples', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/docs/atoms-crchip--docs`, {
      waitUntil: 'domcontentloaded',
    })

    // Wait for Storybook to render
    await page.waitForTimeout(2000)

    // Check that root is visible
    const root = page.locator('#root')
    await expect(root).toBeVisible()
  })

  test('should render CrButton docs with examples', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/docs/atoms-crbutton--docs`, {
      waitUntil: 'domcontentloaded',
    })

    await page.waitForTimeout(2000)

    const root = page.locator('#root')
    await expect(root).toBeVisible()
  })
})
