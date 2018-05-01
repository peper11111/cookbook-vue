import * as types from './mutation-types'

export default {
  [types.SHOW_ERROR] (state, payload) {
    state.messages.push({ text: payload, type: 'error' })
  },
  [types.SHOW_INFO] (state, payload) {
    state.messages.push({ text: payload, type: 'info' })
  },
  [types.SET_CURRENT_USER] (state, payload) {
    state.currentUser = payload
  }
}
