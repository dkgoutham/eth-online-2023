import { User } from '@/model'
import { endpoints } from '@/config'
import { getJSON } from '@/utils'

export const getUser = async (userID: string): Promise<User> => {
  try {
    // TODO Replace by The Graph query
    const data = await getJSON(endpoints.user(userID))
    if (!data) throw new Error('User not found')
    const user = new User(String(data.id), data.username, data.image, 0)
    return user
  } catch (err) {
    throw err
  }
}
