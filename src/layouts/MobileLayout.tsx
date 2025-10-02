// src/layouts/MobileLayout.tsx
import { React } from 'react'
import MobileNav from '../components/MobileNav'

type MobileLayoutProps = {
  children: React.ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">{children}</div>
      <MobileNav />
    </div>
  )
}
