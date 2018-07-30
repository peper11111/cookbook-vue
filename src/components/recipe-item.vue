<template>
<router-link
  :to="`/recipe/${recipe.id}`"
  class="c-recipe-item"
>
  <img
    :src="backgroundSrc"
    class="c-recipe-item__background"
  />
  <div class="c-recipe-item__wrapper">
    <h1 class="c-recipe-item__title">
      {{ recipe.title }}
    </h1>
    <p class="c-recipe-item__date">
      {{ creationDate }}
    </p>
    <span>
    </span>
  </div>
</router-link>
</template>

<script>
import moment from 'moment'

export default {
  name: 'RecipeItem',
  props: {
    recipe: Object
  },
  computed: {
    backgroundSrc () {
      return this.recipe.bannerId ? this.$api.uploads.url(this.recipe.bannerId) : '/static/blank-banner.jpg'
    },
    creationDate () {
      return moment(this.recipe.creationDate).fromNow()
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.c-recipe-item {
  @include box-elevation;
  width: 250px;
  height: 300px;
  box-sizing: border-box;
  margin: 16px;
  position: relative;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  &__wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: $color-accent;
    padding: 8px;
  }

  &__title {
    font-weight: bold;
    font-size: 14px;
    color: $color-text;
  }

  &__date {
    font-size: 12px;
    color: $color-text;
    margin: 2px 0;
  }
}
</style>
