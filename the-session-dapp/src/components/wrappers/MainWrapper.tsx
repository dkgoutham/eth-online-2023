interface IProps {
  children: React.ReactNode
}

export default function MainWrapper({ children }: IProps) {
  return (
    <main className='flex-col items-center justify-between px-12 pb-24 pt-12'>
      {children}
    </main>
  )
}
