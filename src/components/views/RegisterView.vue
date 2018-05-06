<template>
<div class="register-view view view--center">
  <div class="card">
    <h1 class="typography__logo typography--center" v-text="$t('app')"></h1>
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
    <p class="typography__info typography--center">
      <span v-text="$t('form.have-account')"></span>
      <router-link class="typography--mark" to="/login" v-text="$t('form.login')"></router-link>
    </p>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import form from '../../mixins/form'

export default {
  name: 'RegisterView',
  mixins: [ base, form ],
  methods: {
    register () {
      this.$api.auth.register(this.email, this.username, this.password).then(value => {
        this.showInfo(value.data)
        this.$router.push('/login')
      }).catch(error => {
        this.showError(error.response.data)
      })
    }
  }
}
</script>
