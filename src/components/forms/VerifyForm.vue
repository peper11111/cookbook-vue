<template>
<form class="form">
  <div class="form__spinner"></div>
</form>
</template>

<script>
import form from '../../mixins/form'
import auth from '../../services/auth'

export default {
  name: 'VerifyForm',
  mixins: [ form ],
  created () {
    auth.verify(this.$route.query.token)
  }
}
</script>
