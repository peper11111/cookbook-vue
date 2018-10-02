import config from '@/config'

export default {
  imageSrc (id) {
    return `${config.baseURL}/uploads/${id}`
  },

  thumbnailSrc (id) {
    return `${config.baseURL}/uploads/${id}/thumbnail`
  }
}
