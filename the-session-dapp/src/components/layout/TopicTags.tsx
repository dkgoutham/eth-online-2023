import { GroupTopic } from '@/model'
import Tag from '../ui/Tag'

interface IProps {
  topics: GroupTopic[]
}

export default function TopicTags({ topics }: IProps) {
  // TODO Add filtering and make it expandable
  return (
    <ul className='flex flex-wrap items-center justify-center gap-4'>
      {topics.map((topic) => (
        <Tag key={`tag-${topic.slug}`} topic={topic} />
      ))}
    </ul>
  )
}
