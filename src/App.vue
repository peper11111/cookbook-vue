<template>
<div class="app">
  <app-topbar v-if="isLoggedIn"></app-topbar>
  <router-view></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import AppTopbar from './components/AppTopbar'
import AppSnackbar from './components/AppSnackbar'
import auth from './services/auth'

export default {
  name: 'App',
  components: {
    AppTopbar,
    AppSnackbar
  },
  computed: {
    isLoggedIn () {
      return auth.isLoggedIn()
    }
  }
}
</script>
