'use client'

import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import { SheetHeader, SheetTitle } from '../ui/sheet'
import { InputQuantity } from './input-quantity'
import { EmptyCard } from '../empty-card'

export function ModalContent() {
  const { cartDetails, removeItem, cartCount } = useShoppingCart()

  function handleRemoveItem(ProductId: string) {
    removeItem(ProductId)
  }

  const items = Object.keys(cartDetails!).map((item) => cartDetails![item])

  return (
    <div>
      <div className="">
        <SheetHeader>
          <SheetTitle className="text-xl">Sacola de compras</SheetTitle>
        </SheetHeader>
        <div className="mb-12 mt-8 flex h-full max-h-[55vh] flex-col space-y-6 overflow-y-auto">
          {cartCount === 0 ? (
            <EmptyCard />
          ) : (
            items.map((product) => {
              return (
                <div className="flex gap-5" key={product.id}>
                  <div className="flex h-[93px] w-full max-w-[100px] items-center justify-center rounded-md bg-back p-1">
                    <Image
                      src={String(product.image)}
                      width={95}
                      height={95}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col items-start justify-start">
                    <strong className="text-[18px] text-gray-300">
                      {product.name}
                    </strong>

                    <span className="mb-2 mt-0.5 text-[18px] font-bold text-gray-100">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(product.price / 100)}
                    </span>

                    <div className="flex items-center justify-center gap-5">
                      <InputQuantity
                        quantity={product.quantity}
                        id={product.id}
                      />
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="border-none bg-none text-base/none text-green-500 transition-colors ease-in-out hover:text-green-300"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
