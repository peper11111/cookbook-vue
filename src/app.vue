<template>
<div v-if="!loading">
  <app-navbar v-if="requiresAuth"></app-navbar>
  <router-view :key="$route.path"></router-view>
</div>
</template>

<script>
import base from '@/mixins/base'
import { SET_CATEGORIES, SET_CUISINES, SIGN_IN } from '@/store/mutation-types'

export default {
  name: 'App',
  components: {
    AppNavbar: () => import('@/components/app-navbar')
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
        this.$store.commit(SIGN_IN, value.data)
        return this.$api.categories.readAll()
      }).then((value) => {
        this.$store.commit(SET_CATEGORIES, value.data)
        return this.$api.cuisines.readAll()
      }).then((value) => {
        this.$store.commit(SET_CUISINES, value.data)
      })
    }
  }
}
</script>
