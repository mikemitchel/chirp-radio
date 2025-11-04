// src/hooks/useLivePreview.ts
import { useLivePreview as usePayloadLivePreview } from '@payloadcms/live-preview-react'

const PAYLOAD_SERVER_URL = 'http://localhost:3000'

/**
 * Wrapper hook for PayloadCMS live preview
 * Returns the live-updated data when editing in the CMS admin panel
 */
export function useLivePreview<T>({ initialData, depth = 2 }: { initialData: T; depth?: number }) {
  const { data } = usePayloadLivePreview<T>({
    initialData,
    serverURL: PAYLOAD_SERVER_URL,
    depth,
  })

  return data
}
