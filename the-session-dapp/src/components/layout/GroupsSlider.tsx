import { Group } from '@/model'
import GroupDetailPill from './GroupDetailPill'

interface IProps {
  groups: Group[]
}

export default function GroupsSlider({ groups }: IProps) {
  return (
    <section className='flex gap-8 overflow-scroll'>
      {groups.map((group) => (
        <GroupDetailPill key={group.id} group={group} />
      ))}
    </section>
  )
}
