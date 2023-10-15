import { Group } from '@/model'
import Tag from '../ui/Tag'

interface IProps {
  groups: Group[]
}

export default function GroupTags({ groups }: IProps) {
  // TODO Add filtering and make it expandable
  return (
    <ul className='flex w-full flex-wrap items-center justify-center gap-4'>
      {groups.map((group) => (
        <Tag key={`tag-${group.slug}`} group={group} />
      ))}
    </ul>
  )
}
