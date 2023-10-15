export type WeekDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type ShortHour = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12} ${
  | 'AM'
  | 'PM'}`

export type MeetingSchedule = {
  day: WeekDay
  hour: ShortHour
}
