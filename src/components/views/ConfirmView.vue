<template>
<div class="confirm-view view view--center">
  <div class="view__card">
    <h1 class="view__header" v-text="$t('app')"></h1>
    <form class="form" @submit.prevent="confirm">
      <div class="form__wrapper">
        <input class="form__password" :type="getPasswordFieldType()" :placeholder="$t('form.new-password')" v-model="password"/>
        <i class="material-icons form__icon" :class="{ 'active': passwordVisible }"
           @click="togglePassword" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
      </div>
      <p class="form__text form__text--right form__text--dense">
        <span class="form__text--hint" v-text="$t('form.generate-password')" @click="generatePassword"></span>
      </p>
      <input class="form__button" type="submit" :value="$t('form.change-password')"/>
    </form>
  </div>
</div>
</template>

<script>
import form from '../../mixins/form'
import auth from '../../services/auth'

export default {
  name: 'ConfirmView',
  mixins: [ form ],
  methods: {
    confirm () {
      auth.confirm(this.password, this.$route.query.token)
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
