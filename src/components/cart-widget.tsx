import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'

import { ButtonCart } from './modal/button-cart'
import { Product } from '@/lib/types/product'
import { ModalContent } from './modal/modal-content'
import { ModalFooter } from './modal/modal-footer'
import BuyButton from './modal/buy-button'

interface teste {
  product: Product[]
}

export function CartWidget({ product }: teste) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ButtonCart />
      </SheetTrigger>

      <SheetContent className="flex flex-col items-start justify-between border-0 bg-gray-800 px-12 sm:max-w-[480px]">
        <ModalContent />
        <SheetFooter className="w-full sm:flex-col sm:items-center">
          <ModalFooter />
          <BuyButton product={product} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
