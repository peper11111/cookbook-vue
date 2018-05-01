<template>
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
    <span class="form__text--action" v-text="$t('form.login')" @click="setActiveAction('login')"></span>
  </p>
</form>
</template>

<script>
import form from '../../mixins/form'
import auth from '../../services/auth'

export default {
  name: 'RegisterForm',
  mixins: [ form ],
  methods: {
    register () {
      auth.register(this.email, this.username, this.password).then(this.processValue).catch(this.processError)
    }
  }
}
</script>
