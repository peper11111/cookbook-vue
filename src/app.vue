<template>
<div
  v-if="!pending"
  class="o-typography"
>
  <app-navbar v-if="requiresAuth"></app-navbar>
  <router-view :key="$route.path"></router-view>
</div>
<div
  v-else
  class="o-page__loader"
></div>
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
      this.fetchGlobalData()
    }
  },
  methods: {
    fetchGlobalData () {
      this.wrap(() => {
        return this.$helpers.fetchGlobalData()
      })
    }
  }
}
</script>
