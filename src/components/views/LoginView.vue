<template>
<div class="login-view view view--center">
  <div class="card">
    <h1 class="typography__logo typography--center" v-text="$t('app')"></h1>
    <form class="card__form form" @submit.prevent="login()">
      <input class="form__margin form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
      <div class="form__margin form__wrapper">
        <input class="form__input" :type="getPasswordFieldType()" :placeholder="$t('form.password')" v-model="password"/>
        <div class="form__icon icon-button icon-button--toggle" :class="{ 'active': passwordVisible }" @click="togglePassword()">
          <i class="material-icons" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
        </div>
      </div>
      <p class="form__margin typography__info typography--right">
        <router-link class="typography--hint" to="/reset" v-text="$t('form.forgot-password')"></router-link>
      </p>
      <input class="button button--primary" type="submit" :value="$t('form.login')"/>
    </form>
    <p class="typography__info typography--center">
      <span v-text="$t('form.not-have-account')"></span>
      <router-link class="typography--mark" to="/register" v-text="$t('form.register')"></router-link>
    </p>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import form from '../../mixins/form'
import { SET_AUTH } from '../../store/mutation-types'

export default {
  name: 'LoginView',
  mixins: [ base, form ],
  methods: {
    login () {
      this.$api.auth.login(this.username, this.password).then(() => {
        return this.$api.auth.current()
      }).then(value => {
        this.showInfo('info.login-successful')
        this.$store.commit(SET_AUTH, { loggedIn: true, currentUserId: value.data })
        this.$router.push(this.$route.query.redirect || '/')
      }).catch(error => {
        this.showError(error.response.data)
      })
    }
  }
}
</script>
