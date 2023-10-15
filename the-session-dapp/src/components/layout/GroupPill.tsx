import PillWrapper from '../wrappers/PillWrapper'
import { TAGLINE } from '@/config'

interface IProps {
  text?: string
}

export default function GroupPill({ text }: IProps) {
  return (
    <PillWrapper flat={false}>
      <h2 className='text-balance text-2xl font-black text-[--white]'>
        {text || TAGLINE}
      </h2>
    </PillWrapper>
  )
}
