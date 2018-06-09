<template>
<div>
  <button
    v-if="editMode"
    @click="save"
    class="o-button o-button__accent"
  >
    {{ $t('user.save')}}
  </button>
  <button
    v-if="editMode"
    @click="cancel"
    class="o-button o-button__primary"
  >
    {{ $t('user.cancel') }}
  </button>
  <button
    v-if="currentUserProfile && !editMode"
    @click="edit"
    class="o-button o-button__primary"
  >
    {{ $t('user.edit') }}
  </button>
  <button
    v-if="!currentUserProfile"
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

export default {
  name: 'UserButtons',
  mixins: [ base ],
  props: {
    editMode: Boolean
  },
  computed: {
    currentUserProfile () {
      return this.$store.state.currentUser.id === this.user.id
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
        this.$store.commit('setUser', value.data)
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
