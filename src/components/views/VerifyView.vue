<template>
<div class="verify-view"></div>
</template>

<script>
import auth from '../../services/auth'

export default {
  name: 'VerifyView',
  created () {
    auth.verify(this.$route.query.token)
  }
}
</script>
