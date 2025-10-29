// src/hooks/useNetworkQuality.ts
import { useState, useEffect } from 'react'

export type NetworkQuality = 'high' | 'medium' | 'low' | 'offline'

interface NetworkInfo {
  quality: NetworkQuality
  effectiveType?: string // '4g', '3g', '2g', 'slow-2g'
  downlink?: number // Mbps
  rtt?: number // Round trip time in ms
  saveData?: boolean // User has data saver enabled
}

/**
 * Hook to monitor network quality and return appropriate image quality setting
 * Uses the Network Information API when available
 */
export function useNetworkQuality(): NetworkInfo {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    quality: 'high', // Default to high quality
  })

  useEffect(() => {
    // Check if Network Information API is available
    const nav = navigator as unknown as {
      connection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void }
      mozConnection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void }
      webkitConnection?: { effectiveType?: string; downlink?: number; rtt?: number; saveData?: boolean; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void }
    }
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection

    if (!connection) {
      // API not available, assume good connection
      setNetworkInfo({ quality: 'high' })
      return
    }

    const updateNetworkInfo = () => {
      const effectiveType = connection.effectiveType // '4g', '3g', '2g', 'slow-2g'
      const downlink = connection.downlink // Mbps
      const rtt = connection.rtt // Round trip time in ms
      const saveData = connection.saveData // Data saver enabled

      let quality: NetworkQuality = 'high'

      // Determine quality based on effective connection type
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        quality = 'low'
      } else if (effectiveType === '3g') {
        quality = 'medium'
      } else if (effectiveType === '4g') {
        quality = 'high'
      }

      // Override with downlink speed if available
      if (downlink !== undefined) {
        if (downlink < 0.5) {
          quality = 'low' // Less than 0.5 Mbps
        } else if (downlink < 2) {
          quality = 'medium' // Less than 2 Mbps
        } else {
          quality = 'high' // 2 Mbps or higher
        }
      }

      // If user has data saver enabled, downgrade quality
      if (saveData) {
        quality = quality === 'high' ? 'medium' : 'low'
      }

      // Check if offline
      if (!navigator.onLine) {
        quality = 'offline'
      }

      setNetworkInfo({
        quality,
        effectiveType,
        downlink,
        rtt,
        saveData,
      })
    }

    // Initial update
    updateNetworkInfo()

    // Listen for network changes
    if (connection.addEventListener) {
      connection.addEventListener('change', updateNetworkInfo)
    }
    window.addEventListener('online', updateNetworkInfo)
    window.addEventListener('offline', updateNetworkInfo)

    return () => {
      if (connection.removeEventListener) {
        connection.removeEventListener('change', updateNetworkInfo)
      }
      window.removeEventListener('online', updateNetworkInfo)
      window.removeEventListener('offline', updateNetworkInfo)
    }
  }, [])

  return networkInfo
}
