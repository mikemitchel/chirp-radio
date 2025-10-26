// DevModeBanner.tsx
// Global banner showing when the app is running in development mode with mock data

const USE_MOCK_DATA = import.meta.env.DEV

export default function DevModeBanner() {
  if (!USE_MOCK_DATA) {
    return null
  }

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        backgroundColor: '#FF6B00',
        color: '#fff',
        textAlign: 'center',
        padding: '4px 8px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      Development Mode - Using Mock Data
    </div>
  )
}
