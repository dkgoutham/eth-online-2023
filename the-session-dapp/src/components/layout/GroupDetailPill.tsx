'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Group, GroupTopic } from '@/model'
import { useConnectContext } from '@/store'
import { getGroup } from '@/services'
import PillWrapper from '../wrappers/PillWrapper'

interface IProps {
  bgColor: string
  groupId: string
  topic: GroupTopic
}

function GroupDetailPill({ bgColor, groupId, topic }: IProps) {
  const [group, setGroup] = useState<Group | null>(null)
  const { isConnected } = useConnectContext()
  const fetchGroup = useCallback(async () => {
    try {
      setGroup(await getGroup(groupId, topic))
    } catch (error) {
      notFound()
    }
  }, [groupId, topic])

  useEffect(() => {
    fetchGroup()
  }, [fetchGroup])

  if (!group) return null

  const { id, quote, schedule, image, peers } = group

  return (
    <>
      <PillWrapper
        className='pb-24'
        bgColor={bgColor}
        bgImage={image || undefined}
      >
        <p className='w-full text-sm leading-3'>{topic.name}</p>
        <h2 className='text-balance w-full text-xl font-bold leading-5'>
          {quote}
        </h2>
        <time className='w-full text-sm leading-3'>
          {schedule ? `${schedule.day} ${schedule.hour}` : 'TBD'}
        </time>
        {peers > 0 && <p className='w-full text-sm leading-3'>{peers} peers</p>}
        {isConnected && (
          <Link
            className={`absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full border-[1px] border-[--black] ${
              bgColor === 'accent'
                ? 'bg-white text-[--black]'
                : 'bg-[--blue] text-[--white]'
            } font-bold dark:border-[--white]`}
            href={`/groups/${id}`}
          >
            join
          </Link>
        )}
      </PillWrapper>
    </>
  )
}

export default memo(GroupDetailPill)
