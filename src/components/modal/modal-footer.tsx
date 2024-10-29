'use client'

import { useShoppingCart } from 'use-shopping-cart'

export function ModalFooter() {
  const { cartCount, totalPrice } = useShoppingCart()

  return (
    <div className="w-full">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold">Quantidade</span>
          <span className="text-lg text-gray-300">{cartCount} itens</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Valor total</span>
          <span className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalPrice! / 100)}
          </span>
        </div>
      </div>
    </div>
  )
}
