import requester from '@/mixins/requester'
import * as Modes from '@/mixins/detail/modes'

export default {
  mixins: [ requester ],
  props: {
    mode: String
  },
  data () {
    return {
      localMode: this.mode || Modes.DISPLAY
    }
  },
  computed: {
    createMode () {
      return this.localMode === Modes.CREATE
    },
    displayMode () {
      return this.localMode === Modes.DISPLAY
    },
    previewMode () {
      return this.localMode === Modes.PREVIEW
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
          this.localMode = Modes.EDIT
          break
        case 'cancel':
          this.init()
          this.localMode = Modes.PREVIEW
          break
        case 'save':
          this.wrap(this.createMode ? this.create : this.modify, this.getParams()).finally(() => {
            this.localMode = Modes.PREVIEW
          })
      }
    }
  }
}
