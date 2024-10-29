'use client'

import { ShoppingBag } from 'lucide-react'
import { forwardRef, type LegacyRef, type ReactNode } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

export const ButtonCart = forwardRef(function ButtonCart(
  { children, ...props }: ButtonProps,
  ref: LegacyRef<HTMLButtonElement>,
) {
  const { cartCount } = useShoppingCart()

  return (
    <button
      className="group relative rounded-[6px] border-none bg-gray-800 p-3 transition-colors group-hover:transition-colors"
      ref={ref}
      {...props}
    >
      {cartCount ? (
        <>
          <ShoppingBag
            width={24}
            height={24}
            className="group text-gray-400 group-hover:text-white"
          />

          <div className="absolute -right-3 -top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900">
            <span className="group flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm group-hover:bg-green-300">
              {cartCount}
            </span>
          </div>
        </>
      ) : (
        <ShoppingBag
          width={24}
          height={24}
          className="group text-gray-400 group-hover:text-white"
        />
      )}

      {children}
    </button>
  )
})
