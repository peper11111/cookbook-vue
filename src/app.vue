<template>
<div
  v-if="!pending"
  class="c-app"
>
  <app-navbar v-if="requiresAuth"></app-navbar>
  <router-view :key="$route.path"></router-view>
</div>
</template>

<script>
import requester from '@/mixins/requester'

export default {
  name: 'App',
  components: {
    AppNavbar: () => import('@/components/navbar/app-navbar')
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

<style lang="scss">
@import './assets/styles/variables';

.c-app {
  height: 100vh;
  overflow: hidden;
  padding-top: $navbar-height;
}
</style>
