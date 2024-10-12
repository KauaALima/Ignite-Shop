import { BuyButton } from '@/components/buy-button'
import { stripe } from '@/lib/stripe'
import type { Product } from '@/lib/types/product'
import type { Metadata } from 'next'
import Image from 'next/image'
import type Stripe from 'stripe'

interface ProductProps {
  params: {
    id: string
  }
}

async function getProductsDetails(ProductId: string): Promise<Product> {
  const product = await stripe.products.retrieve(ProductId, {
    expand: ['default_price'],
  })

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
}

export async function generateStaticParams() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products: Product[] = response.data.map((product) => {
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

  return products.map((product) => {
    return { id: product.id }
  })
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProductsDetails(params.id)

  return {
    title: product.name,
  }
}

export default async function ProductPage({ params }: ProductProps) {
  const productDetails = await getProductsDetails(params.id)

  return (
    <div className="mx-auto my-0 grid max-w-[1180px] grid-cols-2 items-stretch gap-16">
      <div className="flex h-[656px] w-full max-w-xl items-center justify-center rounded-[8px] bg-back p-1">
        <Image
          src={productDetails.imageUrl}
          width={520}
          height={480}
          alt={productDetails.name}
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl text-gray-300">{productDetails.name}</h1>
        <span className="mt-4 block text-2xl text-green-300">
          {productDetails.price}
        </span>
        <p className="mt-10 text-base text-gray-300">
          {productDetails.description}
        </p>

        <BuyButton DefaultpriceId={productDetails.defaultPriceId} />
      </div>
    </div>
  )
}
