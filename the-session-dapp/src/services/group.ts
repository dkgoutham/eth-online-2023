import { endpoints } from '@/config'
import { getJSON } from '@/utils'
import { Group, WeekDay, ShortHour } from '@/model'

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
    const groups = await getJSON(endpoints.groups(count))
    return groups.map(
      (group: string, i: number) =>
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
