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
    }).then(() => {
      this.showInfo('info.user-verified')
      this.$router.push('/login')
    }).catch((reason) => {
      this.showError(reason.response.data)
      this.$router.push('/login')
    })
  }
}
</script>
