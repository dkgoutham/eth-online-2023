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
      className='rounded-full bg-[--accent] px-8 py-1 text-[1rem] font-bold text-white transition-colors hover:bg-white hover:text-[--accent] active:bg-white active:text-[--accent]'
    >
      {children}
    </button>
  )
}
