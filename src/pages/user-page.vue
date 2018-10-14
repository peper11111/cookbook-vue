<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <user-details :mode="mode"></user-details>
    <div class="o-page__separator"></div>
    <user-recipes></user-recipes>
  </div>
</div>
</template>

<script>
import { DISPLAY, PREVIEW } from '@/mixins/detail/mode-types'
import requester from '@/mixins/requester'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    UserDetails: () => import('@/components/user/user-details'),
    UserRecipes: () => import('@/components/user/user-recipes')
  },
  mixins: [ requester ],
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    user () {
      return this.$store.state.user
    },
    mode () {
      return this.user.id === this.authUser.id ? PREVIEW : DISPLAY
    }
  },
  created () {
    this.wrap(this.fetchUser())
  },
  methods: {
    fetchUser () {
      return this.$api.users.read(this.$route.params.id).then((value) => {
        this.$store.commit(SET_USER, value.data)
      })
    }
  }
}
</script>
