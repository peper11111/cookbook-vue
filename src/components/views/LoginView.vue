<template>
<div class="login-view view view--center">
  <div class="view__card">
    <h1 class="view__header" v-text="$t('app')"></h1>
    <form class="form" @submit.prevent="login">
      <input class="form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
      <div class="form__wrapper">
        <input class="form__password" :type="getPasswordFieldType()" :placeholder="$t('form.password')" v-model="password"/>
        <i class="material-icons form__icon" :class="{ 'active': passwordVisible }"
           @click="togglePassword" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
      </div>
      <p class="form__text form__text--right form__text--dense">
        <router-link class="form__text--hint" to="/reset" v-text="$t('form.forgot-password')"></router-link>
      </p>
      <input class="form__button" type="submit" :value="$t('form.login')"/>
      <p class="form__text">
        <span v-text="$t('form.not-have-account')"></span>
        <router-link class="form__text--action" to="/register" v-text="$t('form.register')"></router-link>
      </p>
    </form>
  </div>
</div>
</template>

<script>
import form from '../../mixins/form'
import auth from '../../services/auth'

export default {
  name: 'LoginView',
  mixins: [ form ],
  methods: {
    login () {
      auth.login(this.username, this.password, this.$route.query.redirect)
    }
  }
}
</script>
