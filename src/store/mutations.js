import * as MutationTypes from '@/store/mutation-types'

export default {
  [MutationTypes.SIGN_IN] (state, payload) {
    localStorage.setItem('loggedIn', 'true')
    state.auth = {
      loggedIn: true,
      user: payload
    }
  },
  [MutationTypes.SIGN_OUT] (state) {
    localStorage.setItem('loggedIn', 'false')
    state.auth = {
      loggedIn: false,
      user: {}
    }
  },
  [MutationTypes.SET_CATEGORIES] (state, payload) {
    state.categories = payload
  },
  [MutationTypes.SET_CUISINES] (state, payload) {
    state.cuisines = payload
  },
  [MutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [MutationTypes.SET_RECIPE] (state, payload) {
    state.recipe = payload
  }
}
