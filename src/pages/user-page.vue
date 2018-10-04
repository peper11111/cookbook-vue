<template>
<div class="o-page" v-if="!loading">
  <div class="o-page__wrapper">
    <user-details></user-details>
    <div class="o-page__separator"></div>
    <recipe-list></recipe-list>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_RECIPES, SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    RecipeList: () => import('@/components/grid/recipe-list'),
    UserDetails: () => import('@/components/user/user-details')
  },
  mixins: [ requester ],
  computed: {
    userId () {
      return Number(this.$route.params.id)
    }
  },
  created () {
    this.wrap(this.request)
  },
  methods: {
    request () {
      return this.$api.users.read(this.userId).then((value) => {
        this.$store.commit(SET_USER, value.data)
      }).then(() => {
        return this.$api.users.readRecipes(this.userId)
      }).then((value) => {
        this.$store.commit(SET_RECIPES, value.data)
      })
    }
  }
}
</script>
