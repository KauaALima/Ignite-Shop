import { env } from '@/env'
import Stripe from 'stripe'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-09-30.acacia',
  appInfo: {
    name: 'Ignite Shop',
  },
})
