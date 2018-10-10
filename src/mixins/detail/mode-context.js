import * as ModeTypes from '@/mixins/detail/mode-types'

export default {
  props: {
    mode: String
  },
  computed: {
    createMode () {
      return this.mode === ModeTypes.CREATE
    },
    displayMode () {
      return this.mode === ModeTypes.DISPLAY
    },
    editMode () {
      return this.mode === ModeTypes.EDIT
    },
    previewMode () {
      return this.mode === ModeTypes.PREVIEW
    }
  }
}
