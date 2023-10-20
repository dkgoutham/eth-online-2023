import { Tag, ShortHour, WeekDay } from '..'

export type GroupTopic = {
  id: string
  name: string
  slug: string
}

export type CreateGroupRequest = {
  title: string
  tag: Tag
  day: WeekDay
  time: ShortHour
  duration: number
  groupDescription: string
}
