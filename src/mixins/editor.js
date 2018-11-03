import requester from '@/mixins/requester'

const Mode = {
  CREATE: 'create',
  EDIT: 'edit',
  PREVIEW: 'preview'
}

export default {
  mixins: [ requester ],
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
  created () {
    this.init()
  },
  methods: {
    init () {
      for (const key in this.models) {
        if (!this.models.hasOwnProperty(key)) {
          continue
        }
        this.models[key] = this.model[key]
      }
    },
    getParams () {
      const params = {}
      for (const key in this.models) {
        if (!this.models.hasOwnProperty(key)) {
          continue
        }
        if (this.models[key] !== this.model[key]) {
          params[key] = this.models[key]
        }
      }
      return params
    },
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
          this.wrap(this.create(this.getParams()))
          break
        case 'save':
          this.wrap(this.modify(this.getParams())).then(() => {
            this.mode = Mode.PREVIEW
          })
          break
        case 'delete':
          this.wrap(this.delete())
          break
      }
    }
  }
}
