import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function MainWrapper({ children }: IProps) {
  return (
    <main className='mx-auto flex min-h-screen max-w-[1080px] flex-col items-center justify-between px-12 pb-24 pt-12'>
      {children}
    </main>
  )
}
