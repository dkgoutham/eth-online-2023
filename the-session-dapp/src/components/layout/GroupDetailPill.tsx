'use client'

import Link from 'next/link'
import { Group } from '@/model'
import { useConnect } from '@/hooks'
import PillWrapper from '../wrappers/PillWrapper'

interface IProps {
  bgColor: 'black' | 'orange'
  group: Group
}

export default function GroupDetailPill({
  bgColor,
  group: { id, topic, quote, schedule, image, peers },
}: IProps) {
  const isConnected = useConnect()

  return (
    <>
      <PillWrapper
        className='relative flex h-full w-52 flex-col justify-end gap-2 text-left'
        bgColor={bgColor}
        bgImage={image || undefined}
      >
        <p className='w-full text-sm leading-3'>{topic}</p>
        <h2 className='text-balance w-full text-xl font-bold leading-5'>
          {quote}
        </h2>
        <time className='w-full text-sm leading-3'>
          {schedule ? `${schedule.day} ${schedule.hour}` : 'TBD'}
        </time>
        {peers > 0 && <p className='w-full text-sm leading-3'>{peers} peers</p>}
        {isConnected && (
          <Link
            className='absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-[--blue] font-bold'
            href={`/groups/${id}`}
          >
            join
          </Link>
        )}
      </PillWrapper>
    </>
  )
}
