<template>
<div class="reset-view view view--center">
  <div class="card">
    <h1 class="typography__logo typography--center" v-text="$t('app')"></h1>
    <form class="card__form form" @submit.prevent="reset()">
      <input class="form__margin form__input" type="text" :placeholder="$t('form.username-or-email')" v-model="username"/>
      <input class="button button--primary" type="submit" :value="$t('form.reset-password')"/>
    </form>
    <p class="typography__info typography--center">
      <span v-text="$t('form.remember-password')"></span>
      <router-link class="typography--mark" to="/login" v-text="$t('form.login')"></router-link>
    </p>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import form from '../../mixins/form'

export default {
  name: 'ResetView',
  mixins: [ base, form ],
  methods: {
    reset () {
      this.$api.auth.reset(this.username).then(value => {
        this.showInfo(value.data)
        this.$router.push('/login')
      }).catch(error => {
        this.showError(error.response.data)
      })
    }
  }
}
</script>
