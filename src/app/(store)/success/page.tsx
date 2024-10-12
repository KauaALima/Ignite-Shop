import { stripe } from '@/lib/stripe'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type Stripe from 'stripe'

interface CheckoutProduct {
  searchParams: {
    session_id: string
  }
}

async function getCheckoutProducts(id: string) {
  const sessionId = id

  if (!sessionId) {
    redirect('/')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name

  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    customerName,
    product: {
      name: product.name,
      imageUrl: product.images[0],
    },
  }
}

export const metadata: Metadata = {
  title: 'success',
}

export default async function SuccessPage({ searchParams }: CheckoutProduct) {
  const product = await getCheckoutProducts(searchParams.session_id)

  return (
    <div className="mx-auto my-0 flex h-[656px] flex-col items-center justify-center">
      <h1 className="text-2xl text-gray-100">{product.customerName}</h1>

      <div className="center mt-16 flex h-36 w-full max-w-[130px] items-center justify-center rounded-md bg-back p-1">
        <Image src={product.product.imageUrl} width={120} height={110} alt="" />
      </div>

      <p className="mt-8 max-w-[560px] text-center text-xl text-gray-300">
        Uhul <strong>{product.customerName}</strong>, sua{' '}
        <strong>{product.product.name}</strong> ja esta a caminho da sua casa.
      </p>

      <Link
        href="/"
        className="mt-20 block text-lg text-green-500 hover:text-green-300"
      >
        Voltar ao catalogo
      </Link>
    </div>
  )
}
