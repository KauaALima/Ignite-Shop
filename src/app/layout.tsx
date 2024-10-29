import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import CartProvider from '@/providers/cart-provider'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Ignite Shop',
    default: 'Ignite Shop',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} bg-gray-900 font-sans text-white antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
