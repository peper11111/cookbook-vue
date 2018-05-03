<template>
<div class="reset-view view view--center">
  <div class="card">
    <h1 class="card__header" v-text="$t('app')"></h1>
    <form class="card__form form" @submit.prevent="reset()">
      <input class="form__margin form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
      <input class="form__button" type="submit" :value="$t('form.reset-password')"/>
    </form>
    <p class="card__text card__text--action">
      <span v-text="$t('form.remember-password')"></span>
      <router-link to="/login" v-text="$t('form.login')"></router-link>
    </p>
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
