import http from './http'
import store from '../store'
import { SHOW_ERROR } from '../store/mutation-types'

class UploadService {
  url (filename) {
    return `${http.defaults.baseURL}/uploads/${filename}`
  }

  create (file) {
    const formData = new FormData()
    formData.append('file', file)

    return http.post('/uploads', formData).catch(error => {
      store.commit(SHOW_ERROR, 'error.file-exceeds-limit')
      return Promise.reject(error)
    })
  }
}

export default new UploadService()
