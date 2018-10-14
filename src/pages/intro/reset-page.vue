<template>
<div class="o-page o-page--intro">
  <div class="o-card">
    <h1 class="o-card__header">
      {{ $t('global.app') }}
    </h1>
    <div class="o-page__separator o-page__separator--intro"></div>
    <form
      v-if="!done"
      @submit.prevent="wrap(reset())"
      class="o-form"
    >
      <input
        v-model="login"
        :placeholder="$t('form.login')"
        class="o-form__input o-form__input--full"
        type="text"
      />
      <input
        :class="{ 'is-disabled': pending }"
        :value="$t('form.reset-password')"
        class="o-button o-button__accent o-button--full"
        type="submit"
      />
      <p class="o-form__footer">
        {{ $t('form.remember-password') }}
        <router-link
          to="/sign-in"
          class="o-form__action"
        >
          {{ $t('form.sign-in') }}
        </router-link>
      </p>
    </form>
    <div v-if="done">
      <div class="o-card__message">
        <i class="o-card__check material-icons">
          check_circle_outline
        </i>
        {{ $t('form.password-reset-email-sent') }}
      </div>
      <div
        :class="{ 'is-disabled': pending }"
        @click="wrap(resetResend())"
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
import requester from '@/mixins/requester'

export default {
  name: 'ResetPage',
  mixins: [ form, requester ],
  data () {
    return {
      done: false
    }
  },
  methods: {
    reset () {
      return this.$api.auth.reset({
        login: this.login
      }).then(() => {
        this.done = true
      })
    },
    resetResend () {
      return this.$api.auth.resetResend({
        login: this.login
      }).then(() => {
        this.$notify.info('message-resend')
      })
    }
  }
}
</script>
