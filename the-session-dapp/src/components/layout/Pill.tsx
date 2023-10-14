import { Meeting } from '@/model'
import PillWrapper from '../wrappers/PillWrapper'
import Link from 'next/link'

interface IProps {
  meeting: Meeting
}

export default function Pill({
  meeting: { id, topic, quote, schedule, image, peers },
}: IProps) {
  return (
    <>
      <PillWrapper>
        <p>{topic}</p>
        <h2>{quote}</h2>
        <time>
          {schedule.day} {schedule.hour}
        </time>
        <p>{peers} peers</p>
      </PillWrapper>
      <Link href={`/meetings/${id}`}>jump in</Link>
    </>
  )
}
