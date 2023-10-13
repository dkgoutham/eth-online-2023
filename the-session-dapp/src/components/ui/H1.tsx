import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function H1({ children }: IProps) {
  return <h1 className='text-4xl text-[--black] dark:text-white'>{children}</h1>
}
