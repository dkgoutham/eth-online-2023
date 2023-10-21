import { Group, WeekDay, ShortHour, GroupTopic } from '@/model'
import { getTopics } from '.'

export const getGroups = async (count: number): Promise<Group[]> => {
  // TODO Get data from Smart Contract
  const days: WeekDay[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const time = ['AM', 'PM']
  try {
    const groups = await getTopics()
    return groups.map(
      (group: GroupTopic, i: number) =>
        new Group(
          String(i),
          group,
          null,
          {
            day: days[Math.floor(Math.random() * 7)],
            hour: `${hours[Math.floor(Math.random() * 12)]} ${
              time[Math.floor(Math.random() * 2)]
            }` as ShortHour,
          },
          null,
          Math.round(Math.random() * 100)
        )
    )
  } catch (err) {
    throw err
  }
}

export const getGroup = async (
  id: string,
  topic: GroupTopic
): Promise<Group> => {
  // TODO Get data from Smart Contract
  const days: WeekDay[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const time = ['AM', 'PM']
  return new Group(
    id,
    topic,
    null,
    {
      day: days[Math.floor(Math.random() * 7)],
      hour: `${hours[Math.floor(Math.random() * 12)]} ${
        time[Math.floor(Math.random() * 2)]
      }` as ShortHour,
    },
    null,
    Math.round(Math.random() * 100)
  )
}
