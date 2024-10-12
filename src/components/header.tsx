import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mx-auto my-0 w-full max-w-[1180px] py-8">
      <Link href="/">
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          alt="Logo"
          className=""
        />
      </Link>
    </header>
  )
}
