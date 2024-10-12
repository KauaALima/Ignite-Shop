import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Product } from '@/lib/types/product'
import Link from 'next/link'
import type { Metadata } from 'next'

async function getProducts(): Promise<Product[]> {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(price.unit_amount) / 100),
      defaultPriceId: price.id,
    }
  })

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const products = await getProducts()

  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-auto flex min-h-[656px] w-full max-w-res gap-12">
        {products.map((product) => {
          return (
            <CarouselItem
              key={product.id}
              className="group relative flex basis-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-back px-1 py-0"
            >
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt="Image Camisa 01"
                  className="object-cover"
                />
                <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-prod p-8 opacity-0 transition-all duration-75 ease-in group-hover:translate-y-0 group-hover:opacity-100">
                  <strong className="text-[20px]">{product.name}</strong>
                  <span className="text-[20px] font-bold text-green-300">
                    {product.price}
                  </span>
                </footer>
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
