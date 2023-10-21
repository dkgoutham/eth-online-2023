import { IContainerProps } from '@/model'
import GroupPill from '../layout/GroupPill'

interface IProps extends IContainerProps {
  pillQuote?: string | undefined
}

export default function RightPillWrapper({ pillQuote, children }: IProps) {
  return (
    <main className='mx-auto mb-10 grid w-full grid-cols-3 gap-9 px-4'>
      <aside className='col-start-1 col-end-2 hidden h-full w-full sm:block'>
        <GroupPill text={pillQuote} />
      </aside>
      <section className='col-start-1 col-end-4 flex w-full flex-col gap-8 sm:col-start-2'>
        {children}
      </section>
    </main>
  )
}
