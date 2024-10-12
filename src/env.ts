import { z } from 'zod'

const envSchema = z.object({
  NEXT_URL: z.string().url(),
  STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid enviroment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid enviroment variables')
}

export const env = parsedEnv.data