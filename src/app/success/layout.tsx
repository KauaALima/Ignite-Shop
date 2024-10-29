import Link from 'next/link'
import type { ReactNode } from 'react'
import Image from 'next/image'

export default async function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="mx-auto my-0 flex w-full max-w-[1180px] items-center justify-center py-8">
        <Link href="/">
          <Image
            src="/logo.svg"
            width={130}
            height={52}
            alt="Logo"
            className="h-[52px] w-32"
          />
        </Link>
      </header>
      {children}
    </main>
  )
}
