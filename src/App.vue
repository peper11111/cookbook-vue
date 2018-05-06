<template>
<div class="app typography">
  <app-navbar v-if="loggedIn"></app-navbar>
  <router-view></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import AppNavbar from './components/AppNavbar'
import AppSnackbar from './components/AppSnackbar'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppSnackbar
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    }
  }
}
</script>
