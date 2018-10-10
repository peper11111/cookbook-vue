<template>
<div class="c-recipe-content">
  <div class="c-recipe-content__row">
    <router-link
      :to="`/user/${recipe.author.id}`"
      class="c-recipe-content__author"
    >
      {{ recipe.author.username }}
    </router-link>
    <span class="c-recipe-content__time">
      {{ creationTime }}
    </span>
  </div>
  <form-input
    v-model="model.title"
    :disabled="displayMode || previewMode"
    :placeholder="$t('recipe.placeholder.title')"
    class="c-recipe-content__title"
  ></form-input>
  <form-textarea
    v-model="model.description"
    :disabled="displayMode || previewMode"
    :placeholder="$t('recipe.placeholder.description')"
    class="c-recipe-content__description"
  ></form-textarea>
  <div class="c-recipe-content__summary">
    <i class="material-icons">
      thumb_up
    </i>
    <span class="c-recipe-content__value">
    {{ recipe.likesCount || 0 }}
  </span>
    <i class="material-icons">
      book
    </i>
    <span class="c-recipe-content__value">
    {{ recipe.favouritesCount || 0 }}
  </span>
    <i class="material-icons">
      chat_bubble
    </i>
    <span class="c-recipe-content__value">
    {{ recipe.commentsCount || 0 }}
  </span>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { DISPLAY, PREVIEW } from '@/mixins/detail/mode-types'

export default {
  name: 'RecipeContent',
  components: {
    FormInput: () => import('@/components/form/form-input'),
    FormTextarea: () => import('@/components/form/form-textarea')
  },
  props: {
    mode: String,
    model: Object
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    },
    displayMode () {
      return this.mode === DISPLAY
    },
    previewMode () {
      return this.mode === PREVIEW
    },
    creationTime () {
      return moment(this.recipe.creationTime).fromNow()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables";

.c-recipe-content {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__author {
    text-decoration: none;
    font-size: 12px;
    color: $color-text-primary;

    &:hover {
      text-decoration: underline;
    }
  }

  &__time {
    margin-left: auto;
    font-size: 12px;
  }

  &__title {
    margin-bottom: 16px;
    font-size: 24px;
  }

  &__description {
    margin-bottom: 16px;
    text-align: justify;
  }

  &__summary {
    display: flex;
    align-items: center;
    margin-top: auto;
  }

  &__value {
    font-size: 12px;
    margin: 0 12px 0 4px;
  }
}
</style>
