<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <recipe-details></recipe-details>
    <div class="o-page__separator"></div>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'NewRecipeView',
  mixins: [ requester ],
  components: {
    RecipeDetails: () => import('@/components/recipe-details')
  },
  created () {
    this.wrap(this.fetchRecipe)
  },
  methods: {
    fetchRecipe () {
      return new Promise((resolve) => {
        this.$store.commit(SET_RECIPE, {})
        resolve()
      })
    }
  }
}
</script>
