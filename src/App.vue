<template>
<div class="app typography" v-if="!loading">
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
  data () {
    return {
      loading: false
    }
  },
  created () {
    if (this.loggedIn) {
      this.fetchData()
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$http.get('/users/current').then(value => {
        this.$store.commit('login', value.data)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
