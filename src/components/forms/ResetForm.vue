<template>
<form class="form" @submit.prevent="reset">
  <input class="form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
  <input class="form__button" type="submit" :value="$t('form.reset-password')"/>
</form>
</template>

<script>
import form from '../../mixins/form'
import auth from '../../services/auth'

export default {
  name: 'ResetForm',
  mixins: [ form ],
  methods: {
    reset () {
      auth.reset(this.username)
    }
  }
}
</script>
