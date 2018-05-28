<template>
<div class="o-page o-page--intro">
  <div class="o-page__card">
    <form
      @submit.prevent="register"
      class="o-form"
    >
      <h1 class="o-form__header">
        {{ $t('app') }}
      </h1>
      <input
        v-model="email"
        :placeholder="$t('form.email')"
        class="o-form__input"
        type="email"
      />
      <input
        v-model="username"
        :placeholder="$t('form.username')"
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
      <p
        @click="generatePassword"
        class="o-form__action o-form__action--secondary"
      >
        {{ $t('form.generate-password') }}
      </p>
      <input
        :value="$t('form.register')"
        class="o-form__submit"
        type="submit"
      />
      <p class="o-form__footer">
        {{ $t('form.have-account') }}
        <router-link
          to="/login"
          class="o-form__action"
        >
          {{ $t('form.login') }}
        </router-link>
      </p>
    </form>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'
import form from '@/mixins/form'

export default {
  name: 'RegisterView',
  mixins: [ base, form ],
  methods: {
    register () {
      this.$api.auth.register({
        email: this.email,
        username: this.username,
        password: this.password
      }).then(value => {
        this.showInfo(value.data)
        this.$router.push('/login')
      }).catch(error => {
        this.showError(error.response.data)
      })
    }
  }
}
</script>
