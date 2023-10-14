import { endpoints } from '@/config'
import { getJSON } from '@/utils'
import { Group } from '@/model'

export const getGroups = async (count: number): Promise<Group[]> => {
  // TODO Get data from Smart Contract
  try {
    const groups = await getJSON(endpoints.groups(count))
    return groups.map((g: string, i: number) => ({
      id: i,
      name: g,
      slug: g.toLocaleLowerCase().replace(/ /g, '-'),
    }))
  } catch (err) {
    throw err
  }
}
