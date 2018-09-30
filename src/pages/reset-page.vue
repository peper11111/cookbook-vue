<template>
<div class="o-page o-page--intro">
  <div class="o-page__card">
    <form
      @submit.prevent="reset"
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
      <input
        :value="$t('form.reset-password')"
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
  name: 'ResetPage',
  mixins: [ base, form ],
  methods: {
    reset () {
      this.$api.auth.reset({
        username: this.username
      }).then(() => {
        this.showInfo('info.password-reset-email-sent')
        this.$router.push('/login')
      }).catch((reason) => {
        this.showError(reason.response.data)
      })
    }
  }
}
</script>
