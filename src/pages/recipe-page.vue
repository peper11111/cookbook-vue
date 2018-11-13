<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <recipe-details></recipe-details>
    <div class="o-page__separator"></div>
    <div class="o-page__container">
      <h1 class="o-typography__header">
        {{ $t('recipe.comments') }}
      </h1>
      <comment-input
        :recipeId="recipe.id"
        @refresh="$emit('refresh')"
      ></comment-input>
      <comment-list
        :recipeId="recipe.id"
        type="recipe-comments"
      ></comment-list>
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
    CommentInput: () => import('@/components/form/comment-input'),
    CommentList: () => import('@/components/comment/comment-list'),
    RecipeDetails: () => import('@/components/recipe/recipe-details')
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    }
  },
  created () {
    this.fetchRecipe()
  },
  methods: {
    fetchRecipe () {
      this.wrap(() => {
        return this.$api.recipes.read(this.$route.params.id).then((value) => {
          this.$store.commit(SET_RECIPE, value.data)
        })
      })
    }
  }
}
</script>
