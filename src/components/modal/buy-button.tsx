'use client'

import { getUrl } from '@/lib/stripe-checkout'
import type { Product } from '@/lib/types/product'
import { useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import Link from 'next/link'

interface teste {
  product: Product[]
}

export default function BuyButton({ product }: teste) {
  const [url, setUrl] = useState('')
  const { cartDetails } = useShoppingCart()

  const items = Object.keys(cartDetails!).map((item) => cartDetails![item])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUrl(product, items)

        setUrl(result!)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [product, items])

  return (
    <Link
      className="mt-12 flex h-[69px] w-full items-center justify-center rounded-md bg-green-500 text-lg font-bold"
      href={url}
    >
      Finalizar compra
    </Link>
  )
}
