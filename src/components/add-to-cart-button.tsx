'use client'

// import { useCart } from '@/contexts/cart-context'
import type { Product } from '@/lib/types/product'
import { useShoppingCart } from 'use-shopping-cart'

interface AddToCartProps {
  items: Product
}

export function AddToCartButton({ items }: AddToCartProps) {
  const { addItem } = useShoppingCart()

  return (
    <button
      onClick={() => {
        addItem(items)
      }}
      className="mt-auto cursor-pointer rounded-md border-none bg-green-500 p-5 text-center text-white hover:bg-green-300"
    >
      Colocar na sacola
    </button>
  )
}
