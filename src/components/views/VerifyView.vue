<template>
<div class="verify-view"></div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'VerifyView',
  mixins: [ base ],
  created () {
    this.$api.auth.verify(this.$route.query.token).then(value => {
      this.showInfo(value.data)
      this.$router.push('/login')
    }).catch(error => {
      this.showError(error.response.data)
      this.$router.push('/login')
    })
  }
}
</script>
