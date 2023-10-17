import GroupDetailPill from '../GroupDetailPill'
import { getGroups } from '@/services'
import style from './styles.module.css'

interface IProps {
  useAccent?: boolean
}

export default async function GroupsSlider({ useAccent = false }: IProps) {
  let groups = await getGroups(5)

  if (groups?.length > 0) {
    const classes = [
      'relative h-80 w-full',
      'before:bg-[linear-gradient(to_right,var(--background),var(--background-0))]',
      'after:bg-[linear-gradient(to_right,var(--background-0),var(--background))]',
    ]

    return (
      <div className={[...classes, style['slider-wrapper']].join(' ').trim()}>
        <div className='grid h-full auto-cols-[200px] grid-flow-col gap-8 overflow-scroll px-24'>
          {groups.map((group, i: number) => {
            return (
              <GroupDetailPill
                key={group.id}
                bgColor={
                  i % 2 === 0 ? (useAccent ? 'accent' : 'orange') : 'background'
                }
                groupId={group.id}
                topic={group.topic}
              />
            )
          })}
        </div>
      </div>
    )
  }

  // TODO Create Component to handle empty arrays
  return <p>{"We couldn't find any group"}</p>
}
