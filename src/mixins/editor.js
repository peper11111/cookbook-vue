import model from '@/mixins/model'

const Mode = {
  CREATE: 'create',
  EDIT: 'edit',
  PREVIEW: 'preview'
}

export default {
  mixins: [ model ],
  props: {
    initialMode: {
      default: Mode.PREVIEW,
      type: String
    }
  },
  data () {
    return {
      mode: this.initialMode
    }
  },
  computed: {
    createMode () {
      return this.mode === Mode.CREATE
    },
    editMode () {
      return this.mode === Mode.EDIT
    },
    previewMode () {
      return this.mode === Mode.PREVIEW
    }
  },
  methods: {
    onAction (action) {
      switch (action) {
        case 'edit':
          this.mode = Mode.EDIT
          break
        case 'clear':
          this.init()
          this.mode = Mode.PREVIEW
          break
        case 'create':
          this.wrap(() => {
            return this.create(this.getUpdatedParams())
          })
          break
        case 'save':
          this.wrap(() => {
            return this.modify(this.getUpdatedParams())
          }).then(() => {
            this.mode = Mode.PREVIEW
          })
          break
        case 'delete':
          this.wrap(() => {
            return this.delete()
          })
          break
      }
    }
  }
}
