export default {
  data () {
    return {
      editMode: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    uploadImg (imgId, imgUrl, imgFile) {
      if (this.url(imgId) === imgUrl) {
        return Promise.resolve(imgId)
      }
      if (!imgFile) {
        return Promise.resolve(null)
      }
      const formData = new FormData()
      formData.set('file', imgFile)
      return this.$api.uploads.create(formData).then(value => value.data)
    },
    clickAction (action) {
      if (action === 'edit') {
        this.editMode = true
      } else if (action === 'cancel') {
        this.init()
        this.editMode = false
      } else if (action === 'save') {
        this.update()
        this.editMode = false
      }
    }
  }
}
