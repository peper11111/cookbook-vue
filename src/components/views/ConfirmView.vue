<template>
<div class="confirm-view view view--center">
  <div class="card">
    <h1 class="card__header" v-text="$t('app')"></h1>
    <form class="card__form form" @submit.prevent="confirm()">
      <div class="form__margin form__wrapper">
        <input class="form__input" :type="getPasswordFieldType()" :placeholder="$t('form.new-password')" v-model="password"/>
        <i class="material-icons form__icon" :class="{ 'active': passwordVisible }"
          @click="togglePassword()" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
      </div>
      <p class="form__margin card__text card__text--right card__text--hint">
        <a v-text="$t('form.generate-password')" @click="generatePassword()"></a>
      </p>
      <input class="form__button" type="submit" :value="$t('form.change-password')"/>
    </form>
    <p class="card__text card__text--action">
      <span v-text="$t('form.remember-password')"></span>
      <router-link to="/login" v-text="$t('form.login')"></router-link>
    </p>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import form from '../../mixins/form'

export default {
  name: 'ConfirmView',
  mixins: [ base, form ],
  methods: {
    confirm () {
      this.$api.auth.confirm(this.password, this.$route.query.token).then(value => {
        this.showInfo(value.data)
        this.$router.push('/login')
      }).catch(error => {
        this.showError(error.response.data)
      })
    },
    generatePassword () {
      const chars = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ1234567890!@#$%^&*()'
      this.password = ''
      for (let i = 0; i < 10; i++) {
        this.password += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.passwordVisible = true
    }
  }
}
</script>
