import PillWrapper from './PillWrapper'
import { MAX_WIDTH, TAGLINE } from '@/config'

interface IProps {
  children: React.ReactNode
}

export default function FindGroupWrapper({ children }: IProps) {
  return (
    <main className={`max-w-[${MAX_WIDTH}px] mx-auto flex gap-9`}>
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
