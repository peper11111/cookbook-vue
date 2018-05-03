import http from './http'

class UploadService {
  url (filename) {
    return `${http.defaults.baseURL}/uploads/${filename}`
  }
}

export default new UploadService()
