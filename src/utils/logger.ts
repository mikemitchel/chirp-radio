// src/utils/logger.ts
/**
 * Development-only logger utility
 * Logs will only appear in development mode (npm run dev, iOS/Android emulators)
 * Production builds will strip out all log statements
 */

const isDevelopment = import.meta.env.DEV

/**
 * Logger that only outputs in development mode
 */
export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error(...args)
    }
  },
  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
}

/**
 * Creates a namespaced logger with a prefix
 * Example: const log = createLogger('AudioPlayerContext')
 * Usage: log('Fetching data...') // Output: [AudioPlayerContext] Fetching data...
 */
export function createLogger(namespace: string) {
  return {
    log: (...args: unknown[]) => logger.log(`[${namespace}]`, ...args),
    warn: (...args: unknown[]) => logger.warn(`[${namespace}]`, ...args),
    error: (...args: unknown[]) => logger.error(`[${namespace}]`, ...args),
    debug: (...args: unknown[]) => logger.debug(`[${namespace}]`, ...args),
    info: (...args: unknown[]) => logger.info(`[${namespace}]`, ...args),
  }
}
