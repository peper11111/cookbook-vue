import store from '../../store'
import { SHOW_ERROR } from '../../store/mutation-types'

export default {
  url (filename) {
    return `${this.$http.defaults.baseURL}/uploads/${filename}`
  },

  create (file) {
    const formData = new FormData()
    formData.append('file', file)

    return this.$http.post('/uploads', formData).catch(error => {
      store.commit(SHOW_ERROR, 'error.file-exceeds-limit')
      return Promise.reject(error)
    })
  }
}
