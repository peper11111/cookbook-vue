<template>
<div class="o-page" v-if="!loading">
  <div class="o-page__wrapper">
    <user-profile
      :model="user"
      @profileUpdate="updateUser"
    ></user-profile>
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
  data () {
    return {
      loading: false,
      user: {}
    }
  },
  computed: {
    userId () {
      return Number(this.$route.params.id)
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$api.users.read(this.userId).then(value => {
        this.user = value.data
      }).catch(reason => {
        if (reason.response.status === 404) {
          this.$router.push('/')
        }
      }).finally(() => {
        this.loading = false
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
