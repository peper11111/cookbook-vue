<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper o-page__wrapper--top">
    <recipe-details></recipe-details>
    <div class="o-page__separator"></div>
    <div class="c-recipe-page__wrapper">
      <recipe-comments></recipe-comments>
    </div>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipePage',
  mixins: [ requester ],
  components: {
    RecipeComments: () => import('@/components/recipe/recipe-comments'),
    RecipeDetails: () => import('@/components/recipe/recipe-details')
  },
  created () {
    this.wrap(this.fetchRecipe())
  },
  methods: {
    fetchRecipe () {
      return this.$api.recipes.read(this.$route.params.id).then((value) => {
        this.$store.commit(SET_RECIPE, value.data)
      })
    }
  }
}
</script>

<style lang="scss">
.c-recipe-page {
  &__wrapper {
    padding: 0 32px;
  }
}
</style>
