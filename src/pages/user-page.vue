<template>
<div class="o-page" v-if="!pending">
  <div class="o-page__wrapper">
    <user-details></user-details>
    <div class="o-page__separator"></div>
    <recipe-list type="user-recipes"></recipe-list>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    RecipeList: () => import('@/components/grid/recipe-list'),
    UserDetails: () => import('@/components/user/user-details')
  },
  mixins: [ requester ],
  computed: {
    userId () {
      return this.$route.params.id
    }
  },
  created () {
    this.wrap(this.fetchUser)
  },
  methods: {
    fetchUser () {
      return this.$api.users.read(this.userId).then((value) => {
        this.$store.commit(SET_USER, value.data)
      })
    }
  }
}
</script>
