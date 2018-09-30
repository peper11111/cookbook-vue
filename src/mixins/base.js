import config from '@/config'

export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    url (id) {
      return id ? config.baseURL + `/uploads/${id}` : null
    },
    fetch () {
      this.loading = true
      this.request().finally(() => {
        this.loading = false
      })
    },
    uploadImg (imgId, imgUrl, imgFile) {
      if (this.url(imgId) === imgUrl) {
        return Promise.resolve(imgId)
      }
      if (!imgFile) {
        return Promise.resolve(null)
      }
      const formData = new FormData()
      formData.set('file', imgFile)
      return this.$api.uploads.create(formData).then((value) => value.data)
    }
  }
}
