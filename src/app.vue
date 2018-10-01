<template>
<div v-if="!pending">
  <app-navbar v-if="requiresAuth"></app-navbar>
  <router-view :key="$route.path"></router-view>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_CATEGORIES, SET_CUISINES, SIGN_IN } from '@/store/mutation-types'

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
      this.wrap(this.fetch)
    }
  },
  methods: {
    fetch () {
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
