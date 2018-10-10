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
          this.wrap(this.createMode ? this.create : this.modify).finally(() => {
            this.localMode = Modes.PREVIEW
          })
      }
    }
  }
}
