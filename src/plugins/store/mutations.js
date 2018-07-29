import * as MutationTypes from '@/plugins/store/mutation-types'

export default {
  [MutationTypes.SET_RECIPES] (state, payload) {
    state.recipes = payload
  },
  showMessage (state, payload) {
    state.messages.push({
      text: payload.text,
      type: payload.type
    })
  },
  login (state, payload) {
    localStorage.setItem('loggedIn', 'true')
    state.auth.loggedIn = true
    state.auth.user = payload
  },
  logout (state) {
    localStorage.setItem('loggedIn', 'false')
    state.auth.loggedIn = false
    state.auth.user = {}
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
