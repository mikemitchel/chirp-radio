#!/usr/bin/env node
/**
 * Scrape shop items from chirpradio.org/store
 *
 * This scraper handles Cloudflare protection and extracts product details.
 *
 * Usage:
 *   node scripts/scrape-store.js [options]
 *
 * Options:
 *   --output <path>     Output file path (default: src/data/scraped-shop-items.json)
 *   --headless          Run in headless mode (default: true)
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
  const index = args.indexOf(name);
  return index !== -1 && args[index + 1] ? args[index + 1] : defaultValue;
};

const OUTPUT_PATH = getArg('--output', path.join(__dirname, '../src/data/scraped-shop-items.json'));
const HEADLESS = args.includes('--no-headless') ? false : true;

const STORE_URL = 'https://chirpradio.org/store';

/**
 * Scrape shop items from the store page
 */
async function scrapeStore(page) {
  console.log(`Scraping store: ${STORE_URL}`);

  try {
    await page.goto(STORE_URL, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait for Cloudflare challenge to complete (if present)
    await page.waitForSelector('body', { timeout: 10000 });

    const title = await page.title();
    if (title.includes('Just a moment')) {
      console.log('Waiting for Cloudflare challenge...');
      await page.waitForTimeout(10000); // Wait longer for challenge
    }

    // Save HTML for debugging before trying selectors
    const htmlBefore = await page.content();
    const debugPathBefore = path.join(__dirname, '../debug-store-initial.html');
    fs.writeFileSync(debugPathBefore, htmlBefore);
    console.log(`Saved initial HTML to ${debugPathBefore}`);

    // Wait for product items to load
    try {
      await page.waitForSelector('.product, .shop-item, .store-item, .product-card, #content, .main-content', { timeout: 30000 });
    } catch (e) {
      console.log('Product selectors not found, saving HTML for analysis...');
    }

    // Extract product data
    const products = await page.evaluate(() => {
      // CHIRP store uses <a class="preview"> for each product
      const productElements = document.querySelectorAll('a.preview');
      const results = [];

      productElements.forEach((el) => {
        // Extract data from the preview link structure
        const titleEl = el.querySelector('h1');
        const priceEl = el.querySelector('p strong');
        const imageEl = el.querySelector('img');
        const url = el.href;

        if (titleEl && titleEl.textContent.trim()) {
          const product = {
            title: titleEl.textContent.trim(),
            description: '', // Would need to fetch detail page for full description
            price: priceEl ? priceEl.textContent.trim() : '',
            image: imageEl ? imageEl.src : '',
            imageAlt: imageEl ? imageEl.alt : '',
            sizes: [], // Would need to fetch detail page for sizes
            url,
          };

          results.push(product);
        }
      });

      return results;
    });

    console.log(`Found ${products.length} products`);

    // If we didn't find products with the standard selectors, save HTML for debugging
    if (products.length === 0) {
      console.warn('No products found. Saving page HTML for debugging...');
      const html = await page.content();
      const debugPath = path.join(__dirname, '../debug-store.html');
      fs.writeFileSync(debugPath, html);
      console.log(`Saved page HTML to ${debugPath}`);
    }

    return products;
  } catch (error) {
    console.error('Error scraping store:', error.message);
    return [];
  }
}

/**
 * Transform scraped data to match shop items mock format
 */
function transformToMockFormat(products) {
  return products.map((product, index) => {
    // Parse price
    const priceMatch = product.price.match(/[\d.]+/);
    const price = priceMatch ? parseFloat(priceMatch[0]) : 0;

    // Create slug from title
    const slug = product.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return {
      id: `item-${index + 1}`,
      slug,
      name: product.title,
      description: product.description,
      price,
      image: product.image,
      imageAlt: product.imageAlt || product.title,
      category: 'Merchandise', // Could be determined from context
      inStock: true, // Would need to determine
      sizes: product.sizes,
      url: product.url,
    };
  });
}

/**
 * Main scraper function
 */
async function main() {
  console.log('CHIRP Radio Store Scraper');
  console.log('=========================');
  console.log(`Output: ${OUTPUT_PATH}`);
  console.log(`Headless mode: ${HEADLESS}`);
  console.log('');

  const browser = await puppeteer.launch({
    headless: HEADLESS,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  });

  const page = await browser.newPage();

  // Set realistic viewport and user agent
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  try {
    const products = await scrapeStore(page);

    // Transform and save data
    const finalData = {
      shopItems: transformToMockFormat(products),
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalData, null, 2));

    console.log('');
    console.log('Scraping Complete!');
    console.log('==================');
    console.log(`Products found: ${products.length}`);
    console.log(`Output saved to: ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run the scraper
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
