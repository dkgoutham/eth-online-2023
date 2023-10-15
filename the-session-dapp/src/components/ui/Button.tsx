import { MouseEventHandler, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  className?: string | undefined
  type?: 'button' | 'submit' | 'reset'
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ type, className, children, onClick }: IProps) {
  const buttonClass =
    `rounded-full bg-[--accent] px-8 py-1 text-[1rem] font-bold text-white transition-colors hover:bg-white hover:text-[--accent] active:bg-white active:text-[--accent] ${
      className || ''
    }`.trim()
  return (
    <button type={type || 'button'} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  )
}
