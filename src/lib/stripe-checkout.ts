'use client'

import Stripe from 'stripe'
import type { Product } from './types/product'
import type { CartEntry } from 'use-shopping-cart/core'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
  appInfo: {
    name: 'Ignite Shop',
  },
})

export async function getUrl(product: Product[], ProductCart: CartEntry[]) {
  // const products = product.map((item) => {
  //   const productInfo = ProductCart.find((pdt) => pdt.id === item.id)

  //   return {
  //     ...productInfo,
  //     price_id: item.priceId,
  //   }
  // })

  const products = ProductCart.map((item) => {
    const productInfo = product.find((pdt) => pdt.id === item.id)

    return {
      ...productInfo,
      quantity: item.quantity,
    }
  })

  const successUrl = `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `http://localhost:3000/`

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment', // tipo de compra (payment = pagou uma vez só pelo produto)
    success_url: successUrl, // Redirecionar para rota/url de compra concluida
    cancel_url: cancelUrl, // Redirecionar para rota/url de compra cancelada
    payment_method_types: ['card'],
    // line_items: products.map((product) => ({
    //   price: product.defaultPriceId,
    //   quantity: product.quantity,
    // })),
    line_items: products.map((product) => ({
      price: product.priceId,
      quantity: product.quantity,
    })),
  })

  return checkoutSession.url
}
