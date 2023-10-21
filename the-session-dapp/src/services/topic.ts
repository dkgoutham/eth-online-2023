import { GroupTopic } from '@/model'

export const getTopics = async (): Promise<GroupTopic[]> => {
  // TODO Get data from Smart Contract
  try {
    const topics = [
      'anxiety',
      'depression',
      'stress management',
      'grief and loss',
      'addiction',
      'codependency',
      'self esteem',
      'trauma',
      'eating disorders',
      'anger management',
      'social skills',
      'mindfulness',
      'sexual and gender orientation',
    ]

    return topics.map((topic: string, i: number) => ({
      id: String(i),
      name: topic,
      slug: topic.toLocaleLowerCase().replace(/ /g, '-'),
    }))
  } catch (err) {
    throw err
  }
}
