<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper o-page__wrapper--top">
    <recipe-details></recipe-details>
    <div class="o-page__separator"></div>
    <div class="c-recipe-page__wrapper">
      <h1 class="o-typography__header">
        {{ $t('recipe.comments') }}
      </h1>
      <comment-input
        :recipeId="recipe.id"
        @refresh="$emit('refresh')"
        class="c-recipe-page__input"
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
    CommentList: () => import('@/components/list/comment-list'),
    RecipeDetails: () => import('@/components/recipe/recipe-details')
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    }
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

  &__input {
    margin-bottom: 16px;
  }
}
</style>
