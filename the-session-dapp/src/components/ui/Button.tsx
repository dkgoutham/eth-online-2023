import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'

interface IProps {
  href?: string
  children: ReactNode
  className?: string | undefined
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  href,
  type,
  className,
  children,
  onClick,
}: IProps) {
  const buttonClass =
    `rounded-full bg-[--accent] px-8 py-1 text-[1rem] font-bold text-white transition-colors hover:bg-white hover:text-[--accent] active:bg-white active:text-[--accent] ${
      className || ''
    }`.trim()

  if (href)
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    )

  return (
    <button type={type || 'button'} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  )
}
