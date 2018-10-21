import * as ModeTypes from '@/mixins/detail/mode-types'

export default {
  props: {
    mode: {
      default: ModeTypes.PREVIEW,
      type: String,
    }
  },
  computed: {
    createMode () {
      return this.mode === ModeTypes.CREATE
    },
    editMode () {
      return this.mode === ModeTypes.EDIT
    },
    previewMode () {
      return this.mode === ModeTypes.PREVIEW
    }
  }
}
