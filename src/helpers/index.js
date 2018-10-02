import config from '@/config'

export default {
  imageSrc (id) {
    return id ? `${config.baseURL}/uploads/${id}` : null
  },

  thumbnailSrc (id) {
    return id ? `${config.baseURL}/uploads/${id}/thumbnail` : null
  }
}
