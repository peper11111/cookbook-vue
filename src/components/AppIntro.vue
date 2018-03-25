<template>
<div class="app-intro">
  <form class="form" v-if="isActiveForm('register')" @submit="registerUser">
    <h1 class="form__header" v-text="$t('app')"></h1>
    <input class="form__input" type="email" :placeholder="$t('email')" v-model="email"/>
    <input class="form__input" type="text" :placeholder="$t('username')" v-model="username"/>
    <div class="form__wrapper">
      <input class="form__password" :type="getPasswordFieldType()" :placeholder="$t('password')" v-model="password"/>
      <i class="material-icons form__icon" :class="{ 'active': passwordVisible }" @click="togglePassword">remove_red_eye</i>
    </div>
    <input class="form__button" type="submit" :value="$t('sign-up')"/>
    <p class="form__text">
      <span v-text="$t('have-account')"></span>
      <span class="form__text--action" v-text="$t('log-in')" @click="setActiveForm('login')"></span>
    </p>
  </form>
  <form class="form" v-if="isActiveForm('login')" @submit="login">
    <h1 class="form__header" v-text="$t('app')"></h1>
    <input class="form__input" type="text" :placeholder="$t('login')" v-model="username"/>
    <div class="form__wrapper">
      <input class="form__password" :type="getPasswordFieldType()" :placeholder="$t('password')" v-model="password"/>
      <i class="material-icons form__icon" :class="{ 'active': passwordVisible }" @click="togglePassword">remove_red_eye</i>
    </div>
    <p class="form__text form__text--right form__text--dense">
      <span class="form__text--hint" v-text="$t('forgot-password')" @click="setActiveForm('reset')"></span>
    </p>
    <input class="form__button" type="submit" :value="$t('log-in')"/>
    <p class="form__text">
      <span v-text="$t('not-have-account')"></span>
      <span class="form__text--action" v-text="$t('sign-up')" @click="setActiveForm('register')"></span>
    </p>
  </form>
  <form class="form" v-if="isActiveForm('reset')" @submit="resetPassword">
    <h1 class="form__header" v-text="$t('app')"></h1>
    <input class="form__input" type="email" :placeholder="$t('login')" v-model="username"/>
    <input class="form__button" type="submit" :value="$t('reset')"/>
    <p class="form__text">
      <span v-text="$t('have-account')"></span>
      <span class="form__text--action" v-text="$t('log-in')" @click="setActiveForm('login')"></span>
    </p>
  </form>
</div>
</template>

<script>
export default {
  name: 'AppIntro',
  data () {
    return {
      form: 'login',
      username: '',
      password: '',
      email: '',
      passwordVisible: false
    }
  },
  methods: {
    isActiveForm (form) {
      return this.form === form
    },
    setActiveForm (form) {
      this.form = form
      this.username = ''
      this.password = ''
      this.email = ''
      this.passwordVisible = false
    },
    togglePassword () {
      this.passwordVisible = !this.passwordVisible
    },
    getPasswordFieldType () {
      return this.passwordVisible ? 'text' : 'password'
    },
    login (event) {
      event.preventDefault()
      this.$store.dispatch('login', { username: this.username, password: this.password }).catch(() => {
        this.$store.commit('showError', this.$t('error.login'))
      })
    },
    registerUser (event) {
      event.preventDefault()
      this.$store.dispatch('registerUser', { email: this.email, username: this.username, password: this.password })
    },
    resetPassword (event) {
      event.preventDefault()
      this.$store.dispatch('resetPassword', { username: this.username }).then(() => {
        this.$store.commit('showInfo', this.$t('info.password-reset'))
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.app-intro {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('../assets/images/dan-gold-105699-unsplash.jpg') no-repeat center;
  background-size: cover;

  .form {
    display: flex;
    flex-direction: column;
    padding: 32px;
    box-sizing: border-box;
    width: 300px;
    background-color: $color-white;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    &__header {
      font-size: 56px;
      font-family: 'Dancing Script', cursive;
      text-align: center;
      margin-bottom: 24px;
    }

    &__wrapper {
      position: relative;
    }

    &__input, &__password, &__button {
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      height: 32px;
      border-radius: 2px;
      outline: none;
      box-sizing: border-box;
      padding: 8px 16px;
      margin-top: 8px;
      width: 100%;
    }

    &__input, &__password {
      border: 1px solid $color-grey-300;

      &::placeholder {
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
        color: $color-grey-600;
      }

      &:focus {
        border-color: $color-primary;
      }
    }

    &__password {
      padding-right: 32px;
    }

    &__button {
      border: none;
      background-color: $color-primary;
      cursor: pointer;
      color: $color-white;
    }

    &__icon {
      position: absolute;
      bottom: 8px;
      right: 8px;
      cursor: pointer;
      color: $color-grey-400;
      user-select: none;
      font-size: 18px;

      &.active {
        color: $color-grey-900;
      }
    }

    &__text {
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      margin-top: 32px;
      text-align: center;

      &--right {
        text-align: right;
      }

      &--dense {
        margin-top: 8px;
      }

      &--action {
        color: $color-primary;
        cursor: pointer;
      }

      &--hint {
        color: $color-grey-600;
        cursor: pointer;
      }
    }
  }
}
</style>
