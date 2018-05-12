<template>
<div class="confirm-view view view--center">
  <div class="card">
    <h1 class="typography__logo typography--center" v-text="$t('app')"></h1>
    <form class="card__form form" @submit.prevent="confirm()">
      <div class="form__margin form__wrapper">
        <input class="form__input" :type="getPasswordFieldType()" :placeholder="$t('form.new-password')" v-model="password"/>
        <div class="form__icon icon-button icon-button--toggle" :class="{ 'active': passwordVisible }" @click="togglePassword()">
          <i class="material-icons" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
        </div>
      </div>
      <p class="form__margin typography__info typography--right">
        <span class="typography--hint typography--pointer" v-text="$t('form.generate-password')" @click="generatePassword()"></span>
      </p>
      <input class="button button--primary" type="submit" :value="$t('form.change-password')"/>
    </form>
    <p class="typography__info typography--center">
      <span v-text="$t('form.remember-password')"></span>
      <router-link class="typography--mark" to="/login" v-text="$t('form.login')"></router-link>
    </p>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'
import form from '@/mixins/form'

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
