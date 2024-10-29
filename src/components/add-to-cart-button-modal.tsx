'use client'

import { ShoppingBag } from 'lucide-react'
import { useShoppingCart } from 'use-shopping-cart'

export interface ProductCart {
  product: {
    id: string
    name: string
    description: string
    price: number
    currency: string
    image: any
    priceId: string
  }
}

export function AddToCartButtonModal({ product }: ProductCart) {
  const { addItem } = useShoppingCart()

  return (
    <button
      onClick={() => {
        addItem(product)
      }}
      className="rounded-[6px] border-none bg-green-500 p-3 transition-colors hover:bg-green-300"
    >
      <ShoppingBag width={24} height={24} color="white" />
    </button>
  )
}
