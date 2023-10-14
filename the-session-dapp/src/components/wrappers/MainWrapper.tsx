import { MAX_WIDTH } from '@/config'

interface IProps {
  children: React.ReactNode
}

export default function MainWrapper({ children }: IProps) {
  return (
    <main
      className={`mx-auto flex min-h-screen max-w-[${MAX_WIDTH}px] flex-col items-center justify-between px-12 pb-24 pt-12`}
    >
      {children}
    </main>
  )
}
