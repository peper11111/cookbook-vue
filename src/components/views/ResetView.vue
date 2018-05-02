<template>
<div class="reset-view view view--center">
  <div class="view__card">
    <h1 class="view__header" v-text="$t('app')"></h1>
    <form class="form" @submit.prevent="reset">
      <input class="form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
      <input class="form__button" type="submit" :value="$t('form.reset-password')"/>
      <p class="form__text">
        <span v-text="$t('form.remember-password')"></span>
        <router-link class="form__text--action" to="/login" v-text="$t('form.login')"></router-link>
      </p>
    </form>
  </div>
</div>
</template>

<script>
import form from '../../mixins/form'
import auth from '../../services/auth'

export default {
  name: 'ResetView',
  mixins: [ form ],
  methods: {
    reset () {
      auth.reset(this.username)
    }
  }
}
</script>
