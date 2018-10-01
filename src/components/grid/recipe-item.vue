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
    <div class="c-recipe-item__row">
      <h1 class="c-recipe-item__title">
        {{ recipe.title }}
      </h1>
    </div>
    <div class="c-recipe-item__row">
      <i class="material-icons">
        chat_bubble
      </i>
      <span class="c-recipe-item__value">
        {{ recipe.comments || 0 }}
      </span>
      <i class="material-icons">
        thumb_up
      </i>
      <span class="c-recipe-item__value">
        {{ recipe.likes || 0 }}
      </span>
      <i class="material-icons">
        share
      </i>
      <span class="c-recipe-item__value">
        {{ recipe.shares || 0 }}
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
    recipe: Object
  },
  computed: {
    backgroundSrc () {
      return this.recipe.bannerId ? `${config.baseURL}/uploads/${this.recipe.bannerId}` : '/static/blank-banner.jpg'
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
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  margin: 16px;
  position: relative;

  &:hover {
    .c-recipe-item__wrapper {
      height: 100px;
    }
  }

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
    background-color: $color-primary;
    padding: 8px 16px;
    transition: height 175ms;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      background-color: $color-primary;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 8px;
      width: 100%;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    .material-icons {
      font-size: 16px;
      color: $color-text;
    }
  }

  &__time {
    font-size: 12px;
    color: $color-primary-light;
    margin-left: auto;
  }

  &__author {
    font-size: 12px;
    text-decoration: none;
    color: $color-text;

    &:hover {
      text-decoration: underline;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 14px;
    color: $color-text;
  }

  &__value {
    font-size: 12px;
    margin: 0 12px 0 4px;
    color: $color-text;
  }
}
</style>
