<template>
<div class="c-recipe-actions">
  <button
    v-if="editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('save')"
    class="o-button o-button__accent"
  >
    {{ $t('global.save')}}
  </button>
  <button
    v-if="editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('cancel')"
    class="o-button o-button__primary"
  >
    {{ $t('global.cancel') }}
  </button>
  <button
    v-if="canEdit && !editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('edit')"
    class="o-button o-button__primary"
  >
    {{ $t('global.edit') }}
  </button>
</div>
</template>

<script>
export default {
  name: 'RecipeActions',
  props: {
    disabled: Boolean,
    editMode: Boolean
  },
  computed: {
    canEdit () {
      return this.authUser.id === this.recipe.author.id
    },
    authUser () {
      return this.$store.state.auth.user
    },
    recipe () {
      return this.$store.state.recipe
    }
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
.c-recipe-actions {
  display: flex;
  align-items: center;
}
</style>
