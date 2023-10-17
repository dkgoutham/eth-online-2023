import Link from 'next/link'
import { Group } from '@/model'
import PillWrapper from '../wrappers/PillWrapper'

interface IProps {
  bgColor: 'black' | 'orange'
  group: Group
}

export default function GroupDetailPill({
  bgColor,
  group: { id, topic, quote, schedule, image, peers },
}: IProps) {
  return (
    <>
      <PillWrapper
        className='relative flex h-full w-52 flex-col gap-2 text-left justify-end'
        bgColor={bgColor}
        bgImage={image || undefined}
      >
        <p className='w-full text-sm leading-3'>{topic}</p>
        <h2 className='w-full text-xl leading-5 font-bold text-balance'>{quote}</h2>
        <time className='w-full text-sm leading-3'>
          {schedule ? `${schedule.day} ${schedule.hour}` : 'TBD'}
        </time>
        {peers > 0 && <p className='w-full text-sm leading-3'>{peers} peers</p>}
        <Link
          className='absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-[--blue] font-bold'
          href={`/meetings/${id}`}
        >
          join
        </Link>
      </PillWrapper>
    </>
  )
}
