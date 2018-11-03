<template>
<div class="c-comment-actions">
  <span
    v-if="previewMode && canEdit"
    @click="emitAction('edit')"
    class="c-comment-actions__item"
  >
    {{ $t('global.edit') }}
  </span>
  <span
    v-if="previewMode && canDelete"
    @click="emitAction('delete')"
    class="c-comment-actions__item"
  >
    {{ $t('global.delete') }}
  </span>
  <span
    v-if="previewMode"
    @click="$emit('reply')"
    class="c-comment-actions__item"
  >
    {{ $t('global.reply') }}
  </span>
  <span
    v-if="editMode"
    @click="emitAction('save')"
    class="c-comment-actions__item"
  >
    {{ $t('global.save') }}
  </span>
  <span
    v-if="editMode"
    @click="emitAction('clear')"
    class="c-comment-actions__item"
  >
    {{ $t('global.cancel') }}
  </span>
</div>
</template>

<script>
export default {
  name: 'CommentActions',
  props: {
    canDelete: Boolean,
    canEdit: Boolean,
    editMode: Boolean,
    previewMode: Boolean
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
@import "../../assets/styles/variables";

.c-comment-actions {
  display: flex;
  align-items: center;
  margin: 8px 0;

  &__item {
    color: $color-text-secondary;
    cursor: pointer;
    margin-right: 8px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
