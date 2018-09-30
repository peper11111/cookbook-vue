<template>
<div class="o-page o-page--intro">
  <div class="o-page__card">
    <form
      @submit.prevent="login"
      class="o-form"
    >
      <h1 class="o-form__header">
        {{ $t('app') }}
      </h1>
      <input
        v-model="username"
        :placeholder="$t('form.username-or-email')"
        class="o-form__input"
        type="text"
      />
      <div class="o-form__wrapper">
        <input
          v-model="password"
          :placeholder="$t('form.password')"
          :type="getPasswordFieldType()"
          class="o-form__input"
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
        :value="$t('form.login')"
        class="o-form__submit"
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
import base from '@/mixins/base'
import form from '@/mixins/form'
import { LOGIN, SET_CUISINES } from '@/store/mutation-types'

export default {
  name: 'LoginPage',
  mixins: [ base, form ],
  methods: {
    login () {
      const formData = new FormData()
      formData.set('username', this.username)
      formData.set('password', this.password)

      this.$api.auth.login(formData).then(() => {
        return this.$api.users.current()
      }).then((value) => {
        this.$store.commit(LOGIN, value.data)
        return this.$api.cuisines.readAll()
      }).then((value) => {
        this.$store.commit(SET_CUISINES, value.data)
        this.showInfo('info.login-successful')
        this.$router.push(this.$route.query.redirect || '/')
      }).catch((reason) => {
        this.showError(reason.response.data)
      })
    }
  }
}
</script>
