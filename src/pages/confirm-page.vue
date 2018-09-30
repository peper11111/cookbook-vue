<template>
<div class="o-page o-page--intro">
  <div class="o-page__card">
    <form
      @submit.prevent="confirm"
      class="o-form"
    >
      <h1 class="o-form__header">
        {{ $t('app') }}
      </h1>
      <div class="o-form__wrapper">
        <input
          v-model="password"
          :placeholder="$t('form.new-password')"
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
        :value="$t('form.change-password')"
        class="o-form__submit"
        type="submit"
      />
      <p class="o-form__footer">
        {{ $t('form.remember-password') }}
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
  name: 'ConfirmPage',
  mixins: [ base, form ],
  methods: {
    confirm () {
      this.$api.auth.confirm({
        password: this.password,
        token: this.$route.query.token
      }).then(() => {
        this.$notify.success('password-reset')
        this.$router.push('/login')
      })
    }
  }
}
</script>
