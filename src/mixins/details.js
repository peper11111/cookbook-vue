export default {
  data () {
    return {
      editMode: false,
      avatar: {
        src: null,
        file: null
      },
      banner: {
        src: null,
        file: null
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    changeAvatar (avatar) {
      this.avatar = avatar
    },
    changeBanner (banner) {
      this.banner = banner
    },
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
