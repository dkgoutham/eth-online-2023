import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'

interface IProps {
  href?: string
  disabled?: boolean
  children: ReactNode
  className?: string | undefined
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  href,
  type,
  className,
  disabled,
  children,
  onClick,
}: IProps) {
  const buttonClass = [
    'rounded-full px-8 py-1 text-[1rem] font-bold text-white transition-colors',
    'bg-[--accent] border-[1px] border-[--accent]',
    'hover:bg-[--background] hover:text-[--accent] ',
    'active:bg-[--background] active:text-[--accent]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className || '',
  ]
    .join(' ')
    .trim()

  if (href)
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    )

  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
    >
      {children}
    </button>
  )
}
