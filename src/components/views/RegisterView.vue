<template>
<div class="register-view view view--center">
  <div class="card">
    <h1 class="card__header" v-text="$t('app')"></h1>
    <form class="card__form form" @submit.prevent="register()">
      <input class="form__margin form__input" type="email" :placeholder="$t('form.email')" v-model="email"/>
      <input class="form__margin form__input" type="text" :placeholder="$t('form.username')" v-model="username"/>
      <div class="form__margin form__wrapper">
        <input class="form__input" :type="getPasswordFieldType()" :placeholder="$t('form.password')" v-model="password"/>
        <i class="material-icons form__icon" :class="{ 'active': passwordVisible }"
           @click="togglePassword()" v-text="passwordVisible ? 'visibility' : 'visibility_off'"></i>
      </div>
      <input class="form__button" type="submit" :value="$t('form.register')"/>
    </form>
    <p class="card__text card__text--action">
      <span v-text="$t('form.have-account')"></span>
      <router-link to="/login" v-text="$t('form.login')"></router-link>
    </p>
  </div>
</div>
</template>

<script>
import form from '../../mixins/form'

export default {
  name: 'RegisterView',
  mixins: [ form ],
  methods: {
    register () {
      this.$api.auth.register(this.email, this.username, this.password)
    }
  }
}
</script>
