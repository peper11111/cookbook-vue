import requester from '@/mixins/requester'
import modeContext from '@/mixins/detail/mode-context'
import * as ModeTypes from '@/mixins/detail/mode-types'

export default {
  mixins: [ modeContext, requester ],
  model: {
    prop: 'mode'
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
          this.$emit('input', ModeTypes.EDIT)
          break
        case 'clear':
          this.init()
          this.$emit('input', ModeTypes.PREVIEW)
          break
        case 'save':
          const params = this.getParams()
          this.wrap(this.mode === ModeTypes.CREATE ? this.create(params) : this.modify(params).then(() => {
            this.$emit('input', ModeTypes.PREVIEW)
          }))
          break
        case 'delete':
          this.wrap(this.delete())
          break
      }
    }
  }
}
