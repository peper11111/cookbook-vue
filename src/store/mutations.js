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
    state.categories = payload
  },
  [MutationTypes.SET_CUISINES] (state, payload) {
    state.cuisines = payload
  },
  [MutationTypes.SET_USER] (state, payload) {
    state.user = payload
    state.user.permissions = {
      canDelete: false,
      canEdit: state.user.id === state.auth.user.id
    }
  },
  [MutationTypes.SET_RECIPE] (state, payload) {
    state.recipe = payload
    state.recipe.permissions = {
      canDelete: state.recipe.author.id === state.auth.user.id,
      canEdit: state.recipe.author.id === state.auth.user.id
    }
  },
  [MutationTypes.ADD_IMAGES] (state, payload) {
    state.images.push(...payload)
  },
  [MutationTypes.REMOVE_IMAGES] (state) {
    state.images = []
  }
}
