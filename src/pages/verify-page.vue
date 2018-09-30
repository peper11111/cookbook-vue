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
      this.$notify.success('user-verified')
      this.$router.push('/sign-in')
    })
  }
}
</script>
