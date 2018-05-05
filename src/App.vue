<template>
<div class="app">
  <app-topbar v-if="loggedIn"></app-topbar>
  <router-view></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import AppTopbar from './components/AppTopbar'
import AppSnackbar from './components/AppSnackbar'

export default {
  name: 'App',
  components: {
    AppTopbar,
    AppSnackbar
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    }
  }
}
</script>
