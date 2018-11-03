<template>
<div class="o-page"></div>
</template>

<script>
import requester from '@/mixins/requester'

export default {
  name: 'RegisterVerifyPage',
  mixins: [ requester ],
  created () {
    this.registerVerify()
  },
  methods: {
    registerVerify () {
      this.wrap(() => {
        return this.$api.auth.registerVerify({
          uuid: this.$route.query.uuid
        }).then(() => {
          this.$notify.success('user-verified')
        })
      }).then(() => {
        this.$router.push('/sign-in')
      })
    }
  }
}
</script>
