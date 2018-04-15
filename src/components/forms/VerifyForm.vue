<template>
<form class="form">
  <div class="form__spinner"></div>
</form>
</template>

<script>
import form from '@/mixins/form'

export default {
  name: 'VerifyForm',
  mixins: [ form ],
  mounted () {
    this.$store.dispatch('verify', {
      token: this.$route.query.token
    }).then(this.processValue).catch(this.processError)
  }
}
</script>
