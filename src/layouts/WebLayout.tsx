// src/layouts/DesktopLayout.tsx
import { ReactNode } from 'react'
import DesktopSidebar from '../components/DesktopSidebar'

type DesktopLayoutProps = {
  children: ReactNode
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="flex flex-row h-full">
      <DesktopSidebar />
      <div className="flex-1 p-4 overflow-auto">{children}</div>
    </div>
  )
}
