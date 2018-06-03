<template>
<div class="o-page" v-if="!loading">
  <div class="o-page__wrapper">
    <user-profile></user-profile>
    <div class="o-page__separator"></div>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'UserPage',
  components: {
    UserProfile: () => import('@/components/user-profile')
  },
  mixins: [ base ],
  created () {
    this.fetch()
  },
  methods: {
    request () {
      return this.$api.users.read(this.$route.params.id).then(value => {
        this.$store.commit('setUser', value.data)
      }).catch(reason => {
        if (reason.response.status === 404) {
          this.$router.push('/')
        }
      })
    },
    updateUser (details, successMessage) {
      this.$api.users.modify(this.userId, details).then(() => {
        if (details.bannerId && this.user.bannerId && details.bannerId !== this.user.bannerId) {
          this.$api.uploads.delete(this.user.bannerId)
        }
        if (details.avatarId && this.user.avatarId && details.avatarId !== this.user.avatarId) {
          this.$api.uploads.delete(this.user.avatarId)
        }
        this.user = { ...this.user, ...details }
        this.showInfo(successMessage)
      })
    }
  }
}
</script>
