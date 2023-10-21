import { TAGLINE } from '@/config'
import { GroupTopic, MeetingSchedule } from '..'

export class Group {
  id: string
  topic: GroupTopic
  quote?: string | null
  schedule: MeetingSchedule | null
  image?: string | null
  peers: number

  constructor(
    id: string,
    topic: GroupTopic,
    quote: string | null,
    schedule: MeetingSchedule,
    image?: string | null,
    peers?: number
  ) {
    this.id = id
    this.topic = topic
    this.quote = quote || TAGLINE
    this.schedule = schedule || null
    this.image = image || null
    this.peers = peers || 0
  }
}
