<template>
<div class="o-page o-page--intro">
  <div class="o-card">
    <h1 class="o-card__header">
      {{ $t('global.app') }}
    </h1>
    <div class="o-page__separator o-page__separator--intro"></div>
    <form
      @submit.prevent="wrap(signIn())"
      class="o-form"
    >
      <input
        v-model="login"
        :placeholder="$t('form.login')"
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
      <router-link
        to="/reset"
        class="o-form__action o-form__action--secondary"
      >
        {{ $t('form.forgot-password') }}
      </router-link>
      <input
        :class="{ 'is-disabled': pending }"
        :value="$t('form.sign-in')"
        class="o-button o-button__accent o-button--full"
        type="submit"
      />
      <p class="o-form__footer">
        {{ $t('form.not-have-account') }}
        <router-link
          to="/register"
          class="o-form__action"
        >
          {{ $t('form.register') }}
        </router-link>
      </p>
    </form>
  </div>
</div>
</template>

<script>
import form from '@/mixins/form'
import requester from '@/mixins/requester'

export default {
  name: 'SignInPage',
  mixins: [ form, requester ],
  methods: {
    signIn () {
      const formData = new FormData()
      formData.set('login', this.login)
      formData.set('password', this.password)

      return this.$api.auth.login(formData).then(() => {
        return this.$helpers.fetchGlobalData()
      }).then(() => {
        this.$notify.success('sign-in-successful')
        this.$router.push(this.$route.query.redirect || '/')
      })
    }
  }
}
</script>
