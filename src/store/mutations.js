import { SHOW_MESSAGE, SET_AUTH } from './mutation-types'

export default {
  [SHOW_MESSAGE] (state, payload) {
    state.messages.push({ text: payload.text, type: payload.type })
  },
  [SET_AUTH] (state, payload) {
    state.loggedIn = payload.loggedIn
    state.currentUser = payload.currentUser
  }
}
