<template>
<div class="c-detail-actions">
  <button
    v-if="canEdit && !editMode"
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
    v-if="editMode"
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
export default {
  name: 'DetailActions',
  props: {
    canEdit: Boolean,
    disabled: Boolean,
    editMode: Boolean
  },
  methods: {
    emitEvent (action) {
      if (this.disabled) {
        return
      }
      this.$emit('click', action)
    }
  }
}
</script>

<style lang="scss">
.c-detail-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
}
</style>
