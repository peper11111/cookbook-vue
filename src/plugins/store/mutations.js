import { SHOW_MESSAGE } from './mutation-types'

export default {
  [SHOW_MESSAGE] (state, payload) {
    state.messages.push({ text: payload.text, type: payload.type })
  },
  login (state, user) {
    localStorage.setItem('loggedIn', 'true')
    state.loggedIn = true
    state.currentUser = user
  },
  logout (state) {
    localStorage.setItem('loggedIn', 'false')
    state.loggedIn = false
    state.currentUser = null
  }
}
