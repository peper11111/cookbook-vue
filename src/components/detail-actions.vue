<template>
<div class="c-detail-actions">
  <button
    v-if="previewMode && canDelete"
    :class="{ 'is-disabled': disabled }"
    @click="emitAction('delete')"
    class="o-button o-button--fab o-button__primary"
  >
    <i class="material-icons">
      delete
    </i>
  </button>
  <button
    v-if="previewMode && canEdit"
    :class="{ 'is-disabled': disabled }"
    @click="emitAction('edit')"
    class="o-button o-button--fab o-button__accent"
  >
    <i class="material-icons">
      edit
    </i>
  </button>
  <button
    v-if="editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitAction('clear')"
    class="o-button o-button--fab o-button__primary"
  >
    <i class="material-icons">
      clear
    </i>
  </button>
  <button
    v-if="createMode || editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitAction(createMode ? 'create' : 'save')"
    class="o-button o-button--fab o-button__accent"
  >
    <i class="material-icons">
      save
    </i>
  </button>
</div>
</template>

<script>
export default {
  name: 'DetailActions',
  props: {
    canDelete: Boolean,
    canEdit: Boolean,
    disabled: Boolean,
    editMode: Boolean,
    previewMode: Boolean,
    createMode: Boolean
  },
  methods: {
    emitAction (action) {
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
