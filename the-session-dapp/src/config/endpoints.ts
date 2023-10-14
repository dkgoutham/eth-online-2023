import { API_URL } from './constants'

export const endpoints = {
  user(userID: string) {
    return `${API_URL}/users/${userID}`
  },
  groups(numOfGroups: number) {
    return `https://random-word-api.herokuapp.com/word?number=${numOfGroups}`
  },
}
