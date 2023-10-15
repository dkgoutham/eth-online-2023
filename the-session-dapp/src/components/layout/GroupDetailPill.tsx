import Link from 'next/link'
import { Group } from '@/model'
import PillWrapper from '../wrappers/PillWrapper'

interface IProps {
  group: Group
}

export default function GroupDetailPill({
  group: { id, topic, quote, schedule, image, peers },
}: IProps) {
  return (
    <>
      <PillWrapper className='relative h-96 w-52' bgImage={image || undefined}>
        <p>{topic}</p>
        <h2>{quote}</h2>
        <time>{schedule ? `${schedule.day} ${schedule.hour}` : 'TBD'}</time>
        {peers > 0 && <p>{peers} peers</p>}
        <Link href={`/meetings/${id}`}>jump in</Link>
      </PillWrapper>
    </>
  )
}
