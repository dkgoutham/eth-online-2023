import GroupDetailPill from '../GroupDetailPill'
import { getGroups } from '@/services'
import style from './styles.module.css'

export default async function GroupsSlider() {
  let groups = await getGroups(5)

  if (groups?.length > 0) {
    const classes = [
      'relative h-80 w-full',
      'before:bg-[linear-gradient(to_right,var(--white),var(--white-0))]',
      'after:bg-[linear-gradient(to_right,var(--white-0),var(--white))]',
      'dark:before:bg-[linear-gradient(to_right,var(--black),var(--black-0))]',
      'dark:after:bg-[linear-gradient(to_right,var(--black-0),var(--black))]',
    ]

    return (
      <div className={[...classes, style['slider-wrapper']].join(' ').trim()}>
        <div className='grid h-full auto-cols-[200px] grid-flow-col gap-8 overflow-scroll px-24'>
          {groups.map((group, i: number) => {
            return (
              <GroupDetailPill
                key={group.id}
                bgColor={i % 2 === 0 ? 'orange' : 'black'}
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
