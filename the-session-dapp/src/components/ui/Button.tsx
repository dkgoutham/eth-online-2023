import { MouseEventHandler, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ type, children, onClick }: IProps) {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className='rounded-full bg-[--accent] px-8 py-1 text-[1.25rem] font-bold text-white transition-colors hover:bg-[--accent-hover] hover:text-[--accent] active:bg-[--accent-hover] active:text-[--accent]'
    >
      {children}
    </button>
  )
}
