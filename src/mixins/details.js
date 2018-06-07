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
    uploadImg (img) {
      if (img.file) {
        const formData = new FormData()
        formData.set('file', img.file)
        return this.$api.uploads.create(formData).then(value => {
          img.src = value.data
        })
      }
      return Promise.resolve()
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
