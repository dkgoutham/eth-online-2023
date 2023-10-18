import { IContainerProps } from '@/model'
import GroupPill from '../layout/GroupPill'

interface IProps extends IContainerProps {
  pillQuote?: string | undefined
}

export default function RightPillWrapper({ pillQuote, children }: IProps) {
  return (
    <main className='mx-auto mb-10 flex w-full flex-row gap-9 px-4'>
      <aside className='hidden w-1/3 basis-1/3 self-stretch sm:flex'>
        <GroupPill text={pillQuote} />
      </aside>
      <section className='flex w-2/3 basis-full flex-col gap-8 sm:basis-2/3'>
        {children}
      </section>
    </main>
  )
}
