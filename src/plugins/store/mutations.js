export default {
  showMessage (state, payload) {
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
    state.currentUser = {}
  },
  setUser (state, payload) {
    state.user = payload
  },
  setRecipe (state, payload) {
    state.recipe = payload
  },
  setCuisines (state, payload) {
    state.cuisines = payload
  }
}
