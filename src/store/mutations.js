import * as MutationTypes from '@/store/mutation-types'

export default {
  [MutationTypes.SET_RECIPES] (state, payload) {
    state.recipes = payload
  },
  [MutationTypes.LOGIN] (state, payload) {
    localStorage.setItem('loggedIn', 'true')
    state.auth.loggedIn = true
    state.auth.user = payload
  },
  [MutationTypes.LOGOUT] (state) {
    localStorage.setItem('loggedIn', 'false')
    state.auth.loggedIn = false
    state.auth.user = {}
  },
  [MutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [MutationTypes.SET_RECIPE] (state, payload) {
    state.recipe = payload
  },
  [MutationTypes.SET_CATEGORIES] (state, payload) {
    state.types.categories = payload
  },
  [MutationTypes.SET_CUISINES] (state, payload) {
    state.types.cuisines = payload
  }
}
