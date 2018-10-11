<template>
<div class="c-recipe-comments">
  <h1 class="c-recipe-comments__title">
    {{ $t('recipe.comments') }}
  </h1>
</div>
</template>

<script>
export default {
  name: 'RecipeComments'
}
</script>

<style lang="scss">
.c-recipe-comments {
  padding: 16px 32px 32px;

  &__title {
    font-size: 24px;
  }
}
</style>
