<template>
<div class="verify-view"></div>
</template>

<script>
export default {
  name: 'VerifyView',
  created () {
    this.$api.auth.verify(this.$route.query.token)
  }
}
</script>
