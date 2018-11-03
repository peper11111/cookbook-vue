<template>
<div class="o-page o-page--intro">
  <div class="o-card">
    <h1 class="o-card__header">
      {{ $t('global.app') }}
    </h1>
    <div class="o-page__separator o-page__separator--intro"></div>
    <form
      @submit.prevent="resetConfirm"
      class="o-form"
    >
      <div class="o-form__wrapper">
        <input
          v-model="password"
          :placeholder="$t('form.new-password')"
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
        :value="$t('form.change-password')"
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
  </div>
</div>
</template>

<script>
import form from '@/mixins/form'

export default {
  name: 'ResetConfirmPage',
  mixins: [ form ],
  methods: {
    resetConfirm () {
      this.wrap(() => {
        return this.$api.auth.resetConfirm({
          password: this.password,
          uuid: this.$route.query.uuid
        }).then(() => {
          this.$notify.success('password-reset')
        })
      }).then(() => {
        this.$router.push('/sign-in')
      })
    }
  }
}
</script>
