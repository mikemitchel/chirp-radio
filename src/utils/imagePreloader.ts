// src/utils/imagePreloader.ts

/**
 * Preload an image and return a promise that resolves when loaded
 * or rejects if it fails to load
 */
export function preloadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Return early for invalid URLs
    if (!url ||
        url.trim() === '' ||
        url === 'null' ||
        url === 'undefined' ||
        !url.startsWith('http')) {
      reject(new Error('Invalid image URL'));
      return;
    }

    const img = new Image();

    img.onload = () => {
      resolve(url);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`));
    };

    // Start loading
    img.src = url;
  });
}

/**
 * Preload multiple image URLs and return the first one that loads successfully
 * Falls back through the array until one works, or rejects if none load
 */
export function preloadFirstAvailable(urls: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const validUrls = urls.filter(url =>
      url &&
      url.trim() !== '' &&
      url !== 'null' &&
      url !== 'undefined' &&
      url.startsWith('http')
    );

    if (validUrls.length === 0) {
      reject(new Error('No valid image URLs provided'));
      return;
    }

    const tryLoad = (index: number) => {
      if (index >= validUrls.length) {
        reject(new Error('All images failed to load'));
        return;
      }

      preloadImage(validUrls[index])
        .then(resolve)
        .catch(() => tryLoad(index + 1));
    };

    tryLoad(0);
  });
}
