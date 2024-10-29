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

  const initialQuantity = 0
  const totalQuantity = session.line_items?.data.reduce(
    (lastValue, preventValue) => lastValue + preventValue.quantity!,
    initialQuantity,
  )

  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    customerName,
    product: products,
    totalQuantity,
  }
}

export const metadata: Metadata = {
  title: 'Compra efetuada',
}

export default async function SuccessPage({ searchParams }: CheckoutProduct) {
  const product = await getCheckoutProducts(searchParams.session_id)

  return (
    <div className="mx-auto mt-[104px] flex h-[656px] flex-col items-center">
      <div className="mt-8 flex">
        {product.totalQuantity === 1
          ? product.product?.map((item) => {
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-center"
                >
                  <div className="center flex h-32 w-full max-w-[160px] items-center justify-center rounded-full bg-back p-1">
                    <Image
                      src={item.imageUrl}
                      width={120}
                      height={110}
                      alt=""
                    />
                  </div>
                </div>
              )
            })
          : product.product?.map((item) => {
              return (
                <div
                  key={item.name}
                  className="-ml-14 flex items-center justify-center"
                >
                  <div className="center flex h-32 w-full max-w-[160px] items-center justify-center rounded-full bg-back p-1">
                    <Image
                      src={item.imageUrl}
                      width={120}
                      height={110}
                      alt=""
                    />
                  </div>
                </div>
              )
            })}
      </div>
      <h1 className="mt-12 text-2xl text-gray-100">Compra efetuada!</h1>

      <p className="mt-8 max-w-[560px] text-center text-xl text-gray-300">
        Uhul <strong>{product.customerName}</strong>, sua compra de{' '}
        {product.totalQuantity}{' '}
        {product.totalQuantity === 1 ? 'camisa' : 'camisetas'} já está a caminho
        da sua casa.
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
