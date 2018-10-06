<template>
<div v-if="!loading">
  <app-navbar v-if="requiresAuth"></app-navbar>
  <router-view :key="$route.path"></router-view>
</div>
</template>

<script>
import requester from '@/mixins/requester'

export default {
  name: 'App',
  components: {
    AppNavbar: () => import('@/components/app-navbar')
  },
  mixins: [ requester ],
  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn
    },
    requiresAuth () {
      return this.$route.meta.requiresAuth
    }
  },
  created () {
    if (this.loggedIn) {
      this.wrap(this.$helpers.fetchGlobalData())
    }
  }
}
</script>
