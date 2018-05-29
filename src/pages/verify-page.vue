<template>
<div class="o-page"></div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'VerifyPage',
  mixins: [ base ],
  created () {
    this.$api.auth.verify({
      token: this.$route.query.token
    }).then(value => {
      this.showInfo(value.data)
      this.$router.push('/login')
    }).catch(error => {
      this.showError(error.response.data)
      this.$router.push('/login')
    })
  }
}
</script>
