import { API_URL } from './constants'

export const endpoints = {
  user(userID: string) {
    return `${API_URL}/users/${userID}`
  },
}
