import Image from 'next/image'
import Link from 'next/link'
import { CartWidget } from './cart-widget'
import type { Product } from '@/lib/types/product'
import ClientComponent from './cleint'

interface teste {
  product: Product[]
}

export function Header({ product }: teste) {
  return (
    <header className="mx-auto my-0 flex w-full max-w-[1180px] items-center justify-between py-8">
      <Link href="/">
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          alt="Logo"
          className=""
        />
      </Link>

      <CartWidget product={product} />
    </header>
  )
}
