export default {
  showMessage (state, payload) {
    state.messages.push(payload)
  },
  showError (state, payload) {
    state.messages.push({ text: payload, type: 'error' })
  },
  showInfo (state, payload) {
    state.messages.push({ text: payload, type: 'info' })
  },
  setCurrentUser (state, payload) {
    state.currentUser = payload
  }
}
