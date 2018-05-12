import { SHOW_MESSAGE, SET_AUTH } from './mutation-types'

export default {
  [SHOW_MESSAGE] (state, payload) {
    state.messages.push({ text: payload.text, type: payload.type })
  },
  [SET_AUTH] (state, payload) {
    state.auth.loggedIn = payload.loggedIn
    state.auth.currentUserId = payload.currentUserId
  }
}
