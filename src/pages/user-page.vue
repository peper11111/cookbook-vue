<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <user-profile
      :id="userId"
      :model="user"
      @profileUpdate="updateUser"
    ></user-profile>
    <hr class="o-page__separator"/>
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
        this.loading = false
      }).catch(error => {
        if (error.response.status === 404) {
          this.$router.push('/')
        }
        this.loading = false
      })
    },
    updateUser (user, successMessage) {
      this.$api.users.update(this.userId, user).then(() => {
        if (this.user.bannerId && this.user.bannerId !== user.bannerId) {
          this.$api.uploads.delete(this.user.bannerId)
        }
        if (this.user.avatarId && this.user.avatarId !== user.avatarId) {
          this.$api.uploads.delete(this.user.avatarId)
        }
        this.user = user
        this.showInfo(successMessage)
      })
    }
  }
}
</script>
