import PillWrapper from './PillWrapper'
import { TAGLINE } from '@/config'

interface IProps {
  children: React.ReactNode
}

export default function FindGroupWrapper({ children }: IProps) {
  return (
    <main className='mx-auto flex w-full gap-9'>
      <aside className='hidden sm:block'>
        <PillWrapper flat={false}>
          <h2 className='text-balance text-2xl font-black text-[--white]'>
            {TAGLINE}
          </h2>
        </PillWrapper>
      </aside>
      <section className='flex basis-full flex-col gap-8'>{children}</section>
    </main>
  )
}
