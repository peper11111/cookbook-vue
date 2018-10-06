<template>
<div class="c-user-actions">
  <button
    v-if="editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('save')"
    class="o-button o-button__accent"
  >
    {{ $t('save')}}
  </button>
  <button
    v-if="editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('cancel')"
    class="o-button o-button__primary"
  >
    {{ $t('cancel') }}
  </button>
  <button
    v-if="canEdit && !editMode"
    :class="{ 'is-disabled': disabled }"
    @click="emitEvent('edit')"
    class="o-button o-button__primary"
  >
    {{ $t('edit') }}
  </button>
  <button
    v-if="!canEdit"
    :class="[ user.following ? 'o-button__primary' : 'o-button__accent', disabled ? 'is-disabled' : '' ]"
    @click="emitEvent('follow')"
    class="o-button"
  >
    {{ user.following ? $t('user.unfollow') : $t('user.follow') }}
  </button>
</div>
</template>

<script>
export default {
  name: 'UserActions',
  props: {
    disabled: Boolean,
    editMode: Boolean
  },
  computed: {
    canEdit () {
      return this.authUser.id === this.user.id
    },
    authUser () {
      return this.$store.state.auth.user
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    emitEvent (eventName) {
      if (this.disabled) {
        return
      }
      this.$emit(eventName)
    }
  }
}
</script>

<style lang="scss">
.c-user-actions {
  display: flex;
  align-items: center;
}
</style>
