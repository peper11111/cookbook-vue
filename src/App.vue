<template>
<div class="app" v-if="initialized">
  <app-intro v-if="currentUser === null"></app-intro>
  <app-navbar v-if="currentUser !== null"></app-navbar>
  <router-view class="app__wrapper" v-if="currentUser !== null"></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import AppIntro from '@/components/AppIntro'
import AppNavbar from '@/components/AppNavbar'
import AppSnackbar from '@/components/AppSnackbar'

export default {
  name: 'App',
  components: {
    AppIntro,
    AppNavbar,
    AppSnackbar
  },
  data () {
    return {
      initialized: false
    }
  },
  mounted () {
    this.$store.dispatch('fetchCurrentUser').then(() => {
      this.initialized = true
    })
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/variables';

.app {
  &__wrapper {
    box-sizing: border-box;
    padding-top: $navbar-height;
    background: $color-white;
  }
}
</style>
