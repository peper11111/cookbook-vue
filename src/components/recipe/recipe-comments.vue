<template>
<div class="c-recipe-comments">
  <h1 class="c-recipe-comments__title">
    {{ $t('recipe.comments') }}
  </h1>
  <comment-list class="c-recipe-comments__list"></comment-list>
</div>
</template>

<script>
export default {
  name: 'RecipeComments',
  components: {
    CommentList: () => import('@/components/list/comment-list')
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
}
</style>
