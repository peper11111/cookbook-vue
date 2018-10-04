import * as MutationTypes from '@/store/mutation-types'

export default {
  [MutationTypes.SIGN_IN] (state, payload) {
    localStorage.setItem('loggedIn', 'true')
    state.auth.loggedIn = true
    state.auth.user = payload
  },
  [MutationTypes.SIGN_OUT] (state) {
    localStorage.setItem('loggedIn', 'false')
    state.auth.loggedIn = false
    state.auth.user = {}
  },
  [MutationTypes.SET_CATEGORIES] (state, payload) {
    state.types.categories = payload
  },
  [MutationTypes.SET_CUISINES] (state, payload) {
    state.types.cuisines = payload
  },
  [MutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [MutationTypes.ADD_RECIPES] (state, payload) {
    state.recipes.push(...payload)
  },
  [MutationTypes.REMOVE_RECIPES] (state) {
    state.recipes = []
  },
  [MutationTypes.SET_RECIPE] (state, payload) {
    state.recipe = payload
  }
}
