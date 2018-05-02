<template>
<div class="register-view view view--center">
  <div class="view__card">
    <h1 class="view__header" v-text="$t('app')"></h1>
    <form class="form" @submit.prevent="register">
      <input class="form__input" type="email" :placeholder="$t('form.email')" v-model="email"/>
      <input class="form__input" type="text" :placeholder="$t('form.username')" v-model="username"/>
      <div class="form__wrapper">
        <input class="form__password" :type="getPasswordFieldType()" :placeholder="$t('form.password')" v-model="password"/>
        <i class="material-icons form__icon" :class="{ 'active': passwordVisible }"
           @click="togglePassword" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
      </div>
      <input class="form__button" type="submit" :value="$t('form.register')"/>
      <p class="form__text">
        <span v-text="$t('form.have-account')"></span>
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
  name: 'RegisterView',
  mixins: [ form ],
  methods: {
    register () {
      auth.register(this.email, this.username, this.password)
    }
  }
}
</script>
