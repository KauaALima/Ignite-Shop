import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/modal/carousel'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Product } from '@/lib/types/product'
import Link from 'next/link'
import type { Metadata } from 'next'
import { AddToCartButtonModal } from '@/components/add-to-cart-button-modal'

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

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 5000))
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
                  src={product.image}
                  width={520}
                  height={480}
                  alt="Image Camisa 01"
                  className="object-cover"
                />
              </Link>
              <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-prod p-6 opacity-0 transition-all duration-75 ease-in group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col">
                  <strong className="text-[20px]">{product.name}</strong>
                  <span className="text-[20px] font-bold text-green-300">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.price / 100)}
                  </span>
                </div>

                <AddToCartButtonModal product={product} />
              </footer>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
