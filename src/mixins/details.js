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
