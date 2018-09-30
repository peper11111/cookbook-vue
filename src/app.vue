<template>
<div v-if="!loading">
  <app-navbar v-if="requiresAuth"></app-navbar>
  <router-view :key="$route.path"></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import base from '@/mixins/base'
import { LOGIN, SET_CUISINES } from '@/store/mutation-types'

export default {
  name: 'App',
  components: {
    AppNavbar: () => import('@/components/app-navbar'),
    AppSnackbar: () => import('@/components/app-snackbar')
  },
  mixins: [ base ],
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
      this.fetch()
    }
  },
  methods: {
    request () {
      return this.$api.users.current().then((value) => {
        this.$store.commit(LOGIN, value.data)
        return this.$api.cuisines.readAll()
      }).then((value) => {
        this.$store.commit(SET_CUISINES, value.data)
      })
    }
  }
}
</script>
