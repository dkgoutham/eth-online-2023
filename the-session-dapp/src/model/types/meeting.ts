export type MeetingSchedule = {
  day:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'
  hour: `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12} ${'AM' | 'PM'}`
}

export type Meeting = {
  id: string
  topic: string
  quote?: string
  schedule: MeetingSchedule
  image: string
  peers: number
}
