import { Header } from '@/components/header'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Product } from '@/lib/types/product'
import type { ReactNode } from 'react'

async function getProducts(): Promise<Product[]> {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description!,
      price: price.unit_amount!,
      currency: price.currency,
      image: product.images[0],
      priceId: price.id,
    }
  })

  return products
}

export default async function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  const products = await getProducts()

  return (
    <main className="flex min-h-screen flex-col items-start justify-center">
      <Header product={products} />
      {children}
    </main>
  )
}
