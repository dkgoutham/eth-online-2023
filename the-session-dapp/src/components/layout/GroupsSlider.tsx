import { Group } from '@/model'
import GroupDetailPill from './GroupDetailPill'

interface IProps {
  groups: Group[]
}

export default function GroupsSlider({ groups }: IProps) {
  const classes = [
    'flex gap-8 overflow-scroll before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:content-[""] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:content-[""]',
    'before:bg-[linear-gradient(to_right,var(--white),var(--white-0))] after:-scale-x-100 after:bg-[linear-gradient(to_right,var(--white),var(--white-0))]',
    'dark:before:bg-[linear-gradient(to_right,var(--black),var(--black-0))] dark:after:-scale-x-100 after:bg-[linear-gradient(to_right,var(--black),var(--black-0))]',
  ]
  return (
    <section className='relative'>
      <div className={classes.join(' ').trim()}>
        {groups.map((group, i: number) => (
          <GroupDetailPill bgColor={i % 2 === 0 ? 'orange' : 'black'} key={group.id} group={group} />
        ))}
      </div>
    </section>
  )
}
