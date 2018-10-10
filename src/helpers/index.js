import api from '@/api'
import config from '@/config'
import helpers from '@/helpers'
import i18n from '@/i18n'
import store from '@/store'
import { SET_CATEGORIES, SET_CUISINES, SIGN_IN } from '@/store/mutation-types'

export default {
  imageSrc (id) {
    return id ? `${config.baseURL}/uploads/${id}` : null
  },
  thumbnailSrc (id) {
    return id ? `${config.baseURL}/uploads/${id}/thumbnail` : null
  },
  fetchGlobalData () {
    return helpers.fetchCurrentUser().then(() => {
      return helpers.fetchCategories()
    }).then(() => {
      return helpers.fetchCuisines()
    })
  },
  fetchCurrentUser () {
    return api.users.current().then((value) => {
      store.commit(SIGN_IN, value.data)
    })
  },
  fetchCategories () {
    return api.categories.readAll().then((value) => {
      const categories = helpers.mapAndSortCategories(value.data)
      store.commit(SET_CATEGORIES, categories)
    })
  },
  mapAndSortCategories (categories) {
    return categories.map((category) => {
      category.name = i18n.t(`recipe.category.${category.name}`)
      return category
    }).sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  },
  fetchCuisines () {
    return api.cuisines.readAll().then((value) => {
      const cuisines = helpers.mapAndSortCuisines(value.data)
      store.commit(SET_CUISINES, cuisines)
    })
  },
  mapAndSortCuisines (cuisines) {
    return cuisines.map((cuisine) => {
      cuisine.name = i18n.t(`recipe.cuisine.${cuisine.name}`)
      return cuisine
    }).sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }
}
