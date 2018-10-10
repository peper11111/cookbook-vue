import requester from '@/mixins/requester'
import * as ModeTypes from '@/mixins/detail/mode-types'

export default {
  mixins: [ requester ],
  props: {
    mode: String
  },
  data () {
    return {
      localMode: this.mode || ModeTypes.DISPLAY
    }
  },
  computed: {
    createMode () {
      return this.localMode === ModeTypes.CREATE
    },
    displayMode () {
      return this.localMode === ModeTypes.DISPLAY
    },
    previewMode () {
      return this.localMode === ModeTypes.PREVIEW
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      for (const key in this.model) {
        if (!this.model.hasOwnProperty(key)) {
          continue
        }
        this.model[key] = this[this.modelSrc][key]
      }
    },
    getParams () {
      const params = {}
      for (const key in this.model) {
        if (!this.model.hasOwnProperty(key)) {
          continue
        }
        if (this.model[key] !== this[this.modelSrc][key]) {
          params[key] = this.model[key]
        }
      }
      return params
    },
    onAction (action) {
      switch (action) {
        case 'edit':
          this.localMode = ModeTypes.EDIT
          break
        case 'cancel':
          this.init()
          this.localMode = ModeTypes.PREVIEW
          break
        case 'save':
          this.wrap(this.createMode ? this.create : this.modify, this.getParams()).finally(() => {
            this.localMode = ModeTypes.PREVIEW
          })
      }
    }
  }
}
