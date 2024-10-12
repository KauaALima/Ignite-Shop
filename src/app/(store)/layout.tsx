import { Header } from '@/components/header'
import type { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center">
      <Header />
      {children}
    </main>
  )
}
