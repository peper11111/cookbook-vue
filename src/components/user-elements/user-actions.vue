<template>
<div class="c-user-actions">
  <h1 class="c-user-actions__username">
    {{ user.username }}
  </h1>
  <button
    v-if="editMode"
    @click="save"
    class="o-button o-button__accent"
  >
    {{ $t('save')}}
  </button>
  <button
    v-if="editMode"
    @click="cancel"
    class="o-button o-button__primary"
  >
    {{ $t('cancel') }}
  </button>
  <button
    v-if="canEdit && !editMode"
    @click="edit"
    class="o-button o-button__primary"
  >
    {{ $t('edit') }}
  </button>
  <button
    v-if="!canEdit"
    :class="[ user.following ? 'o-button__secondary' : 'o-button__accent' ]"
    @click="follow"
    class="o-button"
  >
    {{ user.following ? $t('user.unfollow') : $t('user.follow') }}
  </button>
</div>
</template>

<script>
import base from '@/mixins/base'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserActions',
  mixins: [ base ],
  props: {
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
    follow () {
      this.$api.users.follow(this.user.id).then(() => {
        return this.$api.users.read(this.user.id)
      }).then(value => {
        this.$store.commit(SET_USER, value.data)
        this.showInfo(this.user.following ? 'info.user-follow' : 'info.user-unfollow')
      })
    },
    edit () {
      this.$emit('click', 'edit')
    },
    cancel () {
      this.$emit('click', 'cancel')
    },
    save () {
      this.$emit('click', 'save')
    }
  }
}
</script>

<style lang="scss">
.c-user-actions {
  &__username {
    margin-right: 8px;
    font-size: 24px;
  }
}
</style>
