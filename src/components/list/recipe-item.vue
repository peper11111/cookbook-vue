<template>
<router-link
  :class="{ 'c-recipe-item--grid': grid }"
  :to="`/recipe/${recipe.id}`"
  class="c-recipe-item"
>
  <img
    :src="bannerSrc"
    class="c-recipe-item__image"
  />
  <div class="c-recipe-item__wrapper">
    <div class="c-recipe-item__row">
      <router-link
        :to="`/user/${recipe.author.id}`"
        class="c-recipe-item__author"
      >
        {{ recipe.author.username }}
      </router-link>
      <span class="c-recipe-item__time">
        {{ creationTime }}
      </span>
    </div>
    <h1 class="c-recipe-item__title">
      {{ recipe.title }}
    </h1>
    <p class="c-recipe-item__description">
      {{ recipe.description }}
    </p>
    <div class="c-recipe-item__icons">
      <i class="material-icons">
        thumb_up
      </i>
      <span class="c-recipe-item__value">
        {{ recipe.likesCount || 0 }}
      </span>
      <i class="material-icons">
        book
      </i>
      <span class="c-recipe-item__value">
        {{ recipe.favouritesCount || 0 }}
      </span>
      <i class="material-icons">
        chat_bubble
      </i>
      <span class="c-recipe-item__value">
        {{ recipe.commentsCount || 0 }}
      </span>
    </div>
  </div>
</router-link>
</template>

<script>
import moment from 'moment'
import config from '@/config'

export default {
  name: 'RecipeItem',
  props: {
    grid: Boolean,
    recipe: Object
  },
  computed: {
    bannerSrc () {
      return this.$helpers.thumbnailSrc(this.recipe.bannerId) || config.blankBanner
    },
    creationTime () {
      return moment(this.recipe.creationTime).fromNow()
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-recipe-item {
  @include box-elevation;
  @include box-elevation-hover;
  display: flex;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  margin: 16px;
  text-decoration: none;
  color: $color-text-primary;

  &--grid {
    width: 300px;
    position: relative;
    color: $color-text;

    .c-recipe-item__image {
      width: 100%;
    }

    .c-recipe-item__wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;

      &:hover {
        opacity: 1;
      }
    }

    .c-recipe-item__author {
      color: $color-text;
    }

    .c-recipe-item__description {
      color: $color-text;
    }
  }

  &__image {
    width: 50%;
    object-fit: cover;
  }

  &__wrapper {
    width: 50%;
    padding: 16px;
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__author {
    text-decoration: none;
    color: $color-text-primary;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  &__time {
    margin-left: 8px;
  }

  &__title {
    font-size: 24px;
    margin-top: 40px;
  }

  &__description {
    margin-top: 16px;
  }

  &__icons {
    margin-top: auto;
    display: flex;
    align-items: center;

    .material-icons {
      font-size: 16px;
    }
  }

  &__value {
    font-size: 12px;
    margin: 0 12px 0 4px;
  }
}
</style>
