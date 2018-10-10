<template>
<div class="c-recipe-summary">
  <i class="material-icons">
    thumb_up
  </i>
  <span class="c-recipe-summary__value">
    {{ recipe.likesCount || 0 }}
  </span>
  <i class="material-icons">
    book
  </i>
  <span class="c-recipe-summary__value">
    {{ recipe.favouritesCount || 0 }}
  </span>
  <i class="material-icons">
    chat_bubble
  </i>
  <span class="c-recipe-summary__value">
    {{ recipe.commentsCount || 0 }}
  </span>
</div>
</template>

<script>
export default {
  name: 'RecipeSummary',
  computed: {
    recipe () {
      return this.$store.state.recipe
    }
  }
}
</script>

<style lang="scss">
.c-recipe-summary {
  display: flex;
  align-items: center;

  &__value {
    font-size: 12px;
    margin: 0 12px 0 4px;
  }
}
</style>
