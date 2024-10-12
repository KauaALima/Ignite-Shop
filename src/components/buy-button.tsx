import { env } from '@/env'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'

interface BuyButtonProps {
  DefaultpriceId: string
}

async function getUrl(price: string) {
  const priceId = price

  const successUrl = `${env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return checkoutSession.url?.toString()
}

export async function BuyButton({ DefaultpriceId }: BuyButtonProps) {
  const Url = await getUrl(DefaultpriceId)

  return (
    <Link
      href={Url || ''}
      className="mt-auto cursor-pointer rounded-md border-none bg-green-500 p-5 text-center text-white hover:bg-green-300"
    >
      Comprar agora
    </Link>
  )
}
