<template>
<div class="app-intro">
  <div class="app-intro__card">
    <h1 class="app-intro__header" v-text="$t('app')"></h1>
    <confirm-form v-if="action === 'confirm'"></confirm-form>
    <login-form v-if="action === 'login'"></login-form>
    <register-form v-if="action === 'register'"></register-form>
    <reset-form v-if="action === 'reset'"></reset-form>
    <verify-form v-if="action === 'verify'"></verify-form>
  </div>
</div>
</template>

<script>
import ConfirmForm from '@/components/forms/ConfirmForm'
import LoginForm from '@/components/forms/LoginForm'
import RegisterForm from '@/components/forms/RegisterForm'
import ResetForm from '@/components/forms/ResetForm'
import VerifyForm from '@/components/forms/VerifyForm'

export default {
  name: 'AppIntro',
  components: {
    ConfirmForm,
    LoginForm,
    RegisterForm,
    ResetForm,
    VerifyForm
  },
  computed: {
    action () {
      return this.$route.query.action || 'login'
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

  &__card {
    width: 300px;
    padding: 32px;
    box-sizing: border-box;
    background-color: $color-white;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  &__header {
    font-size: 56px;
    font-family: 'Dancing Script', cursive;
    text-align: center;
    margin-bottom: 24px;
  }
}
</style>
