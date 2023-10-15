import { Meeting } from '@/model'
import Pill from './Pill'

interface IProps {
  meetings: Meeting[]
}

export default function GroupPills({ meetings }: IProps) {
  return meetings.map((meeting) => <Pill key={meeting.id} meeting={meeting} />)
}
