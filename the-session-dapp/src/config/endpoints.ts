import { API_URL } from './constants'

export const endpoints = {
  user(userID: string) {
    return `${API_URL}/users/${userID}`
  },
  topics(count: number) {
    return `https://random-word-api.herokuapp.com/word?number=${count}`
  },
  groups(count: number) {
    return `https://random-word-api.herokuapp.com/word?number=${count}`
  },
}
