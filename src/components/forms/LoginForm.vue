<template>
<form class="form" @submit="login">
  <input class="form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
  <div class="form__wrapper">
    <input class="form__password" :type="getPasswordFieldType()" :placeholder="$t('form.password')" v-model="password"/>
    <i class="material-icons form__icon" :class="{ 'active': passwordVisible }"
      @click="togglePassword" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
  </div>
  <p class="form__text form__text--right form__text--dense">
    <span class="form__text--hint" v-text="$t('form.forgot-password')" @click="setActiveAction('reset')"></span>
  </p>
  <input class="form__button" type="submit" :value="$t('form.login')"/>
  <p class="form__text">
    <span v-text="$t('form.not-have-account')"></span>
    <span class="form__text--action" v-text="$t('form.register')" @click="setActiveAction('register')"></span>
  </p>
</form>
</template>

<script>
import form from '@/mixins/form'

export default {
  name: 'LoginForm',
  mixins: [ form ],
  methods: {
    login (event) {
      event.preventDefault()
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$store.commit('showInfo', 'info.login-successful')
      }).catch(() => {
        this.$store.commit('showError', 'error.login-incorrect')
      })
    }
  }
}
</script>
