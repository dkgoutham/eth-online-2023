export class User {
  id: string
  username: string | null
  avatar: string | null
  notifications: number

  constructor(
    id: string,
    username?: string,
    avatar?: string,
    notifications?: number
  ) {
    this.id = id
    this.username = username || null
    this.avatar = avatar || null
    this.notifications = notifications || 0
  }
}
