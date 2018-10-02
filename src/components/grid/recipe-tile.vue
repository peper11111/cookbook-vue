<template>
<router-link
  :to="`/recipe/${recipe.id}`"
  class="c-recipe-tile"
>
  <img
    :src="bannerSrc"
    class="c-recipe-tile__image"
  />
  <div class="c-recipe-tile__overlay">
    <i class="material-icons c-recipe-tile__icon">
      thumb_up
    </i>
    <span class="c-recipe-tile__text">
      {{ recipe.likesCount }}
    </span>
    <i class="material-icons c-recipe-tile__icon">
      comment
    </i>
    <span class="c-recipe-tile__text">
      {{ recipe.commentsCount }}
    </span>
  </div>
</router-link>
</template>

<script>
export default {
  name: 'RecipeTile',
  props: {
    recipe: Object
  },
  computed: {
    bannerSrc () {
      return this.$helpers.thumbnailSrc(this.recipe.bannerId) || '/static/blank-banner.jpg'
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-recipe-tile {
  @include box-elevation;
  @include box-elevation-hover;
  position: relative;
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  margin: 16px;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-white;

    &:hover {
      opacity: 1;
    }
  }

  &__icon {
    margin-left: 8px;
    margin-right: 4px;
  }
}
</style>
