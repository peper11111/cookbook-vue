<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-details initialMode="create"></recipe-details>
  </div>
</div>
</template>

<script>
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'NewRecipeView',
  components: {
    RecipeDetails: () => import('@/components/recipe/recipe-details')
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$store.commit(SET_RECIPE, { author: this.authUser, ingredients: [], steps: [] })
    }
  }
}
</script>
