import requester from '@/mixins/requester'

export default {
  mixins: [ requester ],
  data () {
    return {
      editMode: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    handleAction (action) {
      switch (action) {
        case 'edit':
          this.editMode = true
          break
        case 'cancel':
          this.init()
          this.editMode = false
          break
        case 'save':
          this.wrap(this.save).finally(() => {
            this.editMode = false
          })
          break
      }
    }
  }
}
