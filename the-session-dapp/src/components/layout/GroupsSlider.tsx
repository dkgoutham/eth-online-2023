import { Group } from '@/model'
import GroupDetailPill from './GroupDetailPill'

interface IProps {
  groups: Group[]
}

export default function GroupsSlider({ groups }: IProps) {
  const gradRules = [
    'absolute',
    'top-0',
    'z-[2]',
    'h-full',
    'w-[100px]',
    'content-[""]',
  ]
  const classes = [
    'px-24 w-ful grid grid-flow-col auto-cols-auto gap-8 overflow-scroll',
    ...['before', 'after'].map((grad) => {
      return [...gradRules, grad === 'before' ? 'left-0' : 'right-0']
        .map((rule) => `${grad}:${rule}`)
        .join(' ')
    }),
    'before:bg-[linear-gradient(to_right,var(--white),var(--white-0))]',
    'dark:before:bg-[linear-gradient(to_right,var(--black),var(--black-0))]',
    'after:bg-[linear-gradient(to_right,var(--white-0),var(--white))]',
    'dark:after:bg-[linear-gradient(to_right,var(--black-0),var(--black))]',
  ]
  return (
    <section className='relative'>
      <div className={classes.join(' ').trim()}>
        {groups.map((group, i: number) => (
          <GroupDetailPill
            bgColor={i % 2 === 0 ? 'orange' : 'black'}
            key={group.id}
            group={group}
          />
        ))}
      </div>
    </section>
  )
}
