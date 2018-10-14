<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <user-details v-model="mode"></user-details>
    <div class="o-page__separator"></div>
    <user-recipes></user-recipes>
  </div>
</div>
</template>

<script>
import { PREVIEW } from '@/mixins/detail/mode-types'
import requester from '@/mixins/requester'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    UserDetails: () => import('@/components/user/user-details'),
    UserRecipes: () => import('@/components/user/user-recipes')
  },
  mixins: [ requester ],
  data () {
    return {
      mode: PREVIEW
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
