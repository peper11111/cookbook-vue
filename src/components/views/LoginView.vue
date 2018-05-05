<template>
<div class="login-view view view--center">
  <div class="card">
    <h1 class="card__header" v-text="$t('app')"></h1>
    <form class="card__form form" @submit.prevent="login()">
      <input class="form__margin form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
      <div class="form__margin form__wrapper">
        <input class="form__input" :type="getPasswordFieldType()" :placeholder="$t('form.password')" v-model="password"/>
        <i class="material-icons form__icon" :class="{ 'active': passwordVisible }"
          @click="togglePassword()" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
      </div>
      <p class="form__margin card__text card__text--right card__text--hint">
        <router-link to="/reset" v-text="$t('form.forgot-password')"></router-link>
      </p>
      <input class="form__button" type="submit" :value="$t('form.login')"/>
    </form>
    <p class="card__text card__text--action">
      <span v-text="$t('form.not-have-account')"></span>
      <router-link to="/register" v-text="$t('form.register')"></router-link>
    </p>
  </div>
</div>
</template>

<script>
import form from '../../mixins/form'
import { SHOW_INFO, SHOW_ERROR, SET_AUTH } from '../../store/mutation-types'

export default {
  name: 'LoginView',
  mixins: [ form ],
  methods: {
    login () {
      this.$api.auth.login(this.username, this.password).then(value => {
        this.$store.commit(SHOW_INFO, value.data)
        this.$store.commit(SET_AUTH, { loggedIn: true })
        this.$router.push(this.$route.query.redirect || '/')
      }).catch(error => {
        this.$store.commit(SHOW_ERROR, error.response.data)
      })
    }
  }
}
</script>
