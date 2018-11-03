<template>
<div class="o-page o-page--intro">
  <div class="o-card">
    <h1 class="o-card__header">
      {{ $t('global.app') }}
    </h1>
    <div class="o-page__separator o-page__separator--intro"></div>
    <form
      v-if="!done"
      @submit.prevent="register"
      class="o-form"
    >
      <input
        v-model="email"
        :placeholder="$t('form.email')"
        class="o-form__input o-form__input--full"
        type="email"
      />
      <input
        v-model="username"
        :placeholder="$t('form.username')"
        class="o-form__input o-form__input--full"
        type="text"
      />
      <div class="o-form__wrapper">
        <input
          v-model="password"
          :placeholder="$t('form.password')"
          :type="getPasswordFieldType()"
          class="o-form__input o-form__input--full"
        />
        <div
          :class="{ 'is-active': passwordVisible }"
          @click="togglePassword"
          class="o-form__icon o-form__icon--toggle"
        >
          <i class="material-icons">
            {{ passwordVisible ? 'visibility' : 'visibility_off' }}
          </i>
        </div>
      </div>
      <p
        @click="generatePassword"
        class="o-form__action o-form__action--secondary"
      >
        {{ $t('form.generate-password') }}
      </p>
      <input
        :class="{ 'is-disabled': pending }"
        :value="$t('form.register')"
        class="o-button o-button__accent o-button--full"
        type="submit"
      />
      <p class="o-form__footer">
        {{ $t('form.have-account') }}
        <router-link
          to="/sign-in"
          class="o-form__action"
        >
          {{ $t('form.sign-in') }}
        </router-link>
      </p>
    </form>
    <div v-else>
      <p class="o-card__message">
        <i class="o-card__check material-icons">
          check_circle_outline
        </i>
        {{ $t('form.account-activation-email-sent') }}
      </p>
      <div
        :class="{ 'is-disabled': pending }"
        @click="registerResend"
        class="o-button o-button__accent o-button--full"
      >
        {{ $t('form.resend-email') }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import form from '@/mixins/form'

export default {
  name: 'RegisterPage',
  mixins: [ form ],
  data () {
    return {
      done: false
    }
  },
  methods: {
    register () {
      this.wrap(() => {
        return this.$api.auth.register({
          email: this.email,
          username: this.username,
          password: this.password
        }).then(() => {
          this.done = true
        })
      })
    },
    registerResend () {
      this.wrap(() => {
        return this.$api.auth.registerResend({
          login: this.username
        }).then(() => {
          this.$notify.info('message-resend')
        })
      })
    }
  }
}
</script>
