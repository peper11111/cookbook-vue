<template>
<div class="c-detail-actions">
  <button
    v-if="previewMode && canDelete"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('delete')"
    class="o-button o-button--fab o-button__primary"
  >
    <i class="material-icons">
      delete
    </i>
  </button>
  <button
    v-if="previewMode && canEdit"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('edit')"
    class="o-button o-button--fab o-button__accent"
  >
    <i class="material-icons">
      edit
    </i>
  </button>
  <button
    v-if="editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('clear')"
    class="o-button o-button--fab o-button__primary"
  >
    <i class="material-icons">
      clear
    </i>
  </button>
  <button
    v-if="editMode || createMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('save')"
    class="o-button o-button--fab o-button__accent"
  >
    <i class="material-icons">
      save
    </i>
  </button>
</div>
</template>

<script>
import modeContext from '@/mixins/detail/mode-context'

export default {
  name: 'DetailActions',
  mixins: [ modeContext ],
  props: {
    canDelete: Boolean,
    canEdit: Boolean,
    disabled: Boolean
  },
  methods: {
    emitEvent (action) {
      if (this.disabled) {
        return
      }
      this.$emit('action', action)
    }
  }
}
</script>

<style lang="scss">
.c-detail-actions {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
}
</style>
