import { endpoints } from '@/config'
import { getJSON } from '@/utils'
import { GroupTopic } from '@/model'

export const getTopics = async (count: number): Promise<GroupTopic[]> => {
  // TODO Get data from Smart Contract
  try {
    const topics = await getJSON(endpoints.topics(count))
    return topics.map((topic: string, i: number) => ({
      id: i,
      name: topic,
      slug: topic.toLocaleLowerCase().replace(/ /g, '-'),
    }))
  } catch (err) {
    throw err
  }
}
