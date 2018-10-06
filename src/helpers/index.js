import api from '@/api'
import config from '@/config'
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
    return api.users.current().then((value) => {
      store.commit(SIGN_IN, value.data)
      return api.categories.readAll()
    }).then((value) => {
      store.commit(SET_CATEGORIES, value.data)
      return api.cuisines.readAll()
    }).then((value) => {
      store.commit(SET_CUISINES, value.data)
    })
  }
}
