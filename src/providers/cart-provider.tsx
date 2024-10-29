'use client'

import { CartProvider as USCProvider } from 'use-shopping-cart'
import type { ReactNode } from 'react'

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
      successUrl={`http://localhost:3000/${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`http://localhost:3000/${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!}/`}
      currency="BRL"
      billingAddressCollection={true}
      shouldPersist={true}
    >
      {children}
    </USCProvider>
  )
}
