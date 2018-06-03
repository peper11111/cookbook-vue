<template>
<div v-if="!loading">
  <app-navbar v-if="loggedIn"></app-navbar>
  <router-view :key="$route.path"></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'App',
  components: {
    AppNavbar: () => import('@/components/app-navbar'),
    AppSnackbar: () => import('@/components/app-snackbar')
  },
  mixins: [ base ],
  computed: {
    loggedIn () {
      return this.$store.state.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.fetch()
    }
  },
  methods: {
    request () {
      return this.$api.users.current().then(value => {
        this.$store.commit('login', value.data)
      })
    }
  }
}
</script>
