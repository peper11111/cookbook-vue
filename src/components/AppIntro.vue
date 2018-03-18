<template>
<div class="app-intro">
  <form class="form" v-if="form === 'register'">
    <h1 class="form__header" v-text="$t('app')"></h1>
    <input class="form__input" type="email" :placeholder="$t('email')"/>
    <input class="form__input" type="text" :placeholder="$t('username')"/>
    <input class="form__input" type="password" :placeholder="$t('password')"/>
    <input class="form__button" type="submit" :value="$t('register')"/>
    <p class="form__text form__text--center">
      <span v-text="$t('have-account')"></span>
      <span class="form__text--action" v-text="$t('login')" @click="form = 'login'"></span>
    </p>
  </form>
  <form class="form" v-if="form === 'login'">
    <h1 class="form__header" v-text="$t('app')"></h1>
    <input class="form__input" type="text" :placeholder="$t('username')"/>
    <input class="form__input" type="password" :placeholder="$t('password')"/>
    <p class="form__text form__text--right form__text--dense">
      <span class="form__text--hint" v-text="$t('forgot-password')"></span>
    </p>
    <input class="form__button" type="submit" :value="$t('login')"/>
    <p class="form__text form__text--center">
      <span v-text="$t('not-have-account')"></span>
      <span class="form__text--action" v-text="$t('register')" @click="form = 'register'"></span>
    </p>
  </form>
</div>
</template>

<script>
export default {
  name: 'AppIntro',
  data () {
    return {
      form: 'login'
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

    &__input, &__button {
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      height: 32px;
      border-radius: 16px;
      outline: none;
      box-sizing: border-box;
      padding: 8px 16px;
      margin-top: 8px;
    }

    &__input {
      border: 1px solid $color-grey-300;

      &::placeholder {
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
        color: $color-grey-700;
      }

      &:focus {
        border-color: $color-primary;
      }
    }

    &__button {
      border: none;
      background-color: $color-primary;
      cursor: pointer;
      color: $color-white;
    }

    &__text {
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      margin-top: 32px;

      &--center {
        text-align: center;
      }

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
        color: $color-grey-700;
        cursor: pointer;
      }
    }
  }
}
</style>
