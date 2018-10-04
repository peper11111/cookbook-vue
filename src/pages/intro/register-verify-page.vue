<template>
<div class="o-page"></div>
</template>

<script>
import requester from '@/mixins/requester'

export default {
  name: 'RegisterVerifyPage',
  mixins: [ requester ],
  created () {
    this.wrap(this.registerVerify, true)
  },
  methods: {
    registerVerify () {
      return this.$api.auth.registerVerify({
        uuid: this.$route.query.uuid
      }).then(() => {
        this.$notify.success('user-verified')
      }).finally(() => {
        this.$router.push('/sign-in')
      })
    }
  }
}
</script>
