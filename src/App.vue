<template>
<div class="app typography">
  <app-navbar v-if="loggedIn"></app-navbar>
  <router-view></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
export default {
  name: 'App',
  components: {
    AppNavbar: () => import('./components/AppNavbar'),
    AppSnackbar: () => import('./components/AppSnackbar')
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    }
  }
}
</script>
