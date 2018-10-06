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
    :class="{ 'o-button__primary': user.isFollowed, 'o-button__accent': !user.isFollowed, 'is-disabled': pending }"
    @click="wrap(follow)"
    class="o-button"
  >
    {{ user.isFollowed ? $t('user.unfollow') : $t('user.follow') }}
  </button>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserActions',
  mixins: [ requester ],
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
    emitEvent (action) {
      if (this.disabled) {
        return
      }
      this.$emit('click', action)
    },
    follow () {
      return this.$api.users.follow(this.user.id).then(() => {
        return this.$api.users.read(this.user.id)
      }).then((value) => {
        this.$store.commit(SET_USER, value.data)
        this.$notify.info(this.user.isFollowed ? 'user-follow' : 'user-unfollow')
      })
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
