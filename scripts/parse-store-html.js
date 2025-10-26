#!/usr/bin/env node
/**
 * Parse CHIRP store HTML and convert to JSON matching mock data format
 *
 * Usage: node scripts/parse-store-html.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storeHTML = `
<section class="col-2-3">
  <a href="https://chirpradio.org/store/detail/chirp-baby-onesie" class="preview">
    <img src="https://chirpradio.org/_/files/store/Baby_onesie-3.jpeg" height="3362" width="2946" alt="">
    <h1>CHIRP Baby Onesie</h1>
    <p><strong>$15.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/chirp-2013-poster" class="preview">
    <img src="https://chirpradio.org/_/files/store/CHIRP_spring_2013_design.jpg" height="720" width="540" alt="">
    <h1>CHIRP 2013 Poster</h1>
    <p><strong>$30.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/chirp-record-fair-2015-poster" class="preview">
    <img src="https://chirpradio.org/_/files/store/Record_Fair_2015.jpg" height="2016" width="1512" alt="">
    <h1>CHIRP Record Fair 2015 poster</h1>
    <p><strong>$20.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/chirp-record-fair-2019-poster" class="preview">
    <img src="https://chirpradio.org/_/files/store/CHiRP2019_Poster_11x17.jpg" height="1224" width="792" alt="">
    <h1>CHIRP Record Fair 2019 Poster</h1>
    <p><strong>$15.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/chirp-2018-record-fair-poster" class="preview">
    <img src="https://chirpradio.org/_/files/store/20180227-CHIRP-RF-poster.jpg" height="1000" width="750" alt="">
    <h1>CHIRP Record Fair 2018 poster</h1>
    <p><strong>$20.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/chirp-record-fair-2017-poster" class="preview">
    <img src="https://chirpradio.org/_/files/store/RF_poster_2017_-_2.jpg" height="3264" width="2448" alt="">
    <h1>CHIRP Record Fair 2017 Poster</h1>
    <p><strong>$20.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/chirp-dinosaurs-toddler-t-shirt" class="preview">
    <img src="https://chirpradio.org/_/files/store/image5.jpeg" height="4032" width="3024" alt="">
    <h1>CHIRP Sandcastle Toddler T-Shirt</h1>
    <p><strong>$14.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/chirpradio.org-record-logo-shirt" class="preview">
    <img src="https://chirpradio.org/_/files/store/Red_CHIRP_shirt_3.JPG" height="603" width="452" alt="">
    <h1>chirpradio.org Record Logo Shirt (standard and fitted styles available)</h1>
    <p><strong>$20.00</strong></p>
  </a>
  <a href="https://chirpradio.org/store/detail/107.1fm-chirp-logo-shirt" class="preview">
    <img src="https://chirpradio.org/_/files/store/Shawn_chirp_shirt.jpg" height="640" width="496" alt="">
    <h1>107.1FM CHIRP logo shirt (standard and fitted styles available)</h1>
    <p><strong>$20.00</strong></p>
  </a>
</section>
`;

// Parse HTML using regex (simple for this structured data)
const productRegex = /<a href="([^"]+)" class="preview">[\s\S]*?<img src="([^"]+)"[^>]*>[\s\S]*?<h1>([^<]+)<\/h1>[\s\S]*?<strong>\$([0-9.]+)<\/strong>/g;

const products = [];
let match;
let index = 1;

while ((match = productRegex.exec(storeHTML)) !== null) {
  const [, url, image, title, price] = match;

  // Extract slug from URL
  const slug = url.split('/').pop();

  // Determine item type and category from title
  let itemType = 'Merchandise';
  let category = 'merchandise';

  if (title.toLowerCase().includes('poster')) {
    itemType = 'Poster';
    category = 'posters';
  } else if (title.toLowerCase().includes('shirt') || title.toLowerCase().includes('tee')) {
    itemType = 'Apparel';
    category = 'shirts';
  } else if (title.toLowerCase().includes('onesie')) {
    itemType = 'Apparel';
    category = 'baby-onesies-kid-stuff';
  }

  // Determine sizes based on item type
  let sizes = [];
  if (itemType === 'Apparel') {
    if (title.toLowerCase().includes('toddler') || title.toLowerCase().includes('baby')) {
      sizes = ['6M', '12M', '18M', '2T', '3T', '4T'];
    } else {
      sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    }
  }

  const product = {
    id: `item-${String(index).padStart(3, '0')}`,
    name: title.trim(),
    price: parseFloat(price),
    image: image.startsWith('http') ? image : `https://chirpradio.org${image}`,
    itemType,
    category,
    description: `${title.trim()} from CHIRP Radio's official store.`,
    details: itemType === 'Poster' ? '18x24 inches, printed on premium matte paper' : 'High-quality materials',
    sizes,
    inStock: true,
  };

  products.push(product);
  index++;
}

// Create output in mock data format
const output = {
  shopItems: products
};

// Write to file
const outputPath = path.join(__dirname, '../src/data/scraped-shop-items.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`\nParsed ${products.length} products from CHIRP store`);
console.log(`Output saved to: ${outputPath}\n`);

// Print summary
console.log('Products:');
products.forEach(p => {
  console.log(`  - ${p.name} ($${p.price}) [${p.category}]`);
});
