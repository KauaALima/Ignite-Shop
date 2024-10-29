import { Plus, Minus } from 'lucide-react'
import { useShoppingCart } from 'use-shopping-cart'

interface InputQuantityProps {
  id: string
  quantity: number
}

export function InputQuantity({ id, quantity }: InputQuantityProps) {
  const { incrementItem, decrementItem } = useShoppingCart()

  function handleIncrementItem(itemId: string) {
    incrementItem(itemId)
  }

  function handleDecrementItem(itemId: string) {
    decrementItem(itemId)
  }

  return (
    <div className="flex items-center justify-center rounded-md bg-gray-700">
      <button
        className="p-1 disabled:cursor-not-allowed"
        disabled={quantity === 1}
        onClick={() => handleDecrementItem(id)}
      >
        <Minus
          size={16}
          className="text-green-500 transition-colors ease-in-out hover:text-green-300"
        />
      </button>

      <span className="p-1 text-base">{quantity}</span>

      <button className="p-1" onClick={() => handleIncrementItem(id)}>
        <Plus
          size={16}
          className="text-green-500 transition-colors ease-in-out hover:text-green-300"
        />
      </button>
    </div>
  )
}
