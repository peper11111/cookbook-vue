<template>
<form class="form" @submit="reset">
  <input class="form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
  <input class="form__button" type="submit" :value="$t('form.reset-password')"/>
</form>
</template>

<script>
import form from '@/mixins/form'

export default {
  name: 'ResetForm',
  mixins: [ form ],
  methods: {
    reset (event) {
      event.preventDefault()
      this.$store.dispatch('reset', {
        username: this.username
      }).then(this.processValue).catch(this.processError)
    }
  }
}
</script>
