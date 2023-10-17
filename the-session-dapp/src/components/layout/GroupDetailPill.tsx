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
        className='relative flex h-full w-52 flex-col gap-2'
        bgColor={bgColor}
        bgImage={image || undefined}
      >
        <p>{topic}</p>
        <h2>{quote}</h2>
        <time>{schedule ? `${schedule.day} ${schedule.hour}` : 'TBD'}</time>
        {peers > 0 && <p>{peers} peers</p>}
        <Link href={`/meetings/${id}`}>jump in</Link>
      </PillWrapper>
    </>
  )
}
