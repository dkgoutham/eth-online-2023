export type Notification = {
  id: number
  title: string
  message: string
  read: boolean
}

export type Notifications = {
  unread: number
  notifications: Notification[]
}
