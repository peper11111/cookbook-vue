<template>
<div class="c-recipe-comments">
  <h1 class="c-recipe-comments__title">
    {{ $t('recipe.comments') }}
  </h1>
  <comment-input class="c-recipe-comments__input"></comment-input>
  <comment-list
    :recipeId="recipe.id"
    type="recipe-comments"
  ></comment-list>
</div>
</template>

<script>
export default {
  name: 'RecipeComments',
  components: {
    CommentInput: () => import('@/components/form/comment-input'),
    CommentList: () => import('@/components/list/comment-list')
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    }
  }
}
</script>

<style lang="scss">
.c-recipe-comments {
  padding: 0 32px;

  &__title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &__input {
    margin-bottom: 16px;
  }
}
</style>
