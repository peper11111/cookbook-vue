<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <user-profile
      :id="userId"
      :model="userDetails"
      @profileUpdate="updateDetails"
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
      userDetails: {}
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
      this.$api.users.readDetails(this.userId).then(value => {
        this.userDetails = value.data
        this.loading = false
      }).catch(error => {
        if (error.response.status === 404) {
          this.$router.push('/')
        }
        this.loading = false
      })
    },
    updateDetails (userDetails, successMessage) {
      this.$api.users.updateDetails(this.userId, userDetails).then(() => {
        if (this.userDetails.bannerId && this.userDetails.bannerId !== userDetails.bannerId) {
          this.$api.uploads.delete(this.userDetails.bannerId)
        }
        if (this.userDetails.avatarId && this.userDetails.avatarId !== userDetails.avatarId) {
          this.$api.uploads.delete(this.userDetails.avatarId)
        }
        this.userDetails = userDetails
        this.showInfo(successMessage)
      })
    }
  }
}
</script>
