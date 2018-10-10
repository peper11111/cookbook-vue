<template>
<div class="c-detail-actions">
  <button
    v-if="previewMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('edit')"
    class="o-button o-button--fab o-button__primary"
  >
    <i class="material-icons">
      create
    </i>
  </button>
  <button
    v-if="editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('cancel')"
    class="o-button o-button--fab o-button__primary"
  >
    <i class="material-icons">
      clear
    </i>
  </button>
  <button
    v-if="createMode || editMode"
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
import * as Modes from '@/mixins/detail/modes'

export default {
  name: 'DetailActions',
  props: {
    mode: String,
    disabled: Boolean
  },
  computed: {
    createMode () {
      return this.mode === Modes.CREATE
    },
    editMode () {
      return this.mode === Modes.EDIT
    },
    previewMode () {
      return this.mode === Modes.PREVIEW
    }
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
