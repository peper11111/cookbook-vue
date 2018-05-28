<template>
<div v-if="!loading">
  <app-navbar v-if="loggedIn">
  </app-navbar>
  <router-view>
  </router-view>
  <app-snackbar>
  </app-snackbar>
</div>
</template>

<script>
export default {
  name: 'App',
  components: {
    AppNavbar: () => import('@/components/app-navbar'),
    AppSnackbar: () => import('@/components/app-snackbar')
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$api.users.current().then(value => {
        this.$store.commit('login', value.data)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
