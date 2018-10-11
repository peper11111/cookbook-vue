<template>
<div class="c-recipe-content">
  <div
    v-if="!createMode"
    class="c-recipe-content__row"
  >
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
  <div
    v-if="!createMode"
    class="c-recipe-content__summary"
  >
    <i
      :class="{ 'is-active': recipe.isLiked, 'c-recipe-content__action': displayMode }"
      @click="displayMode ? wrap(like) : null"
      class="material-icons"
    >
      thumb_up
    </i>
    <span class="c-recipe-content__value">
    {{ recipe.likesCount || 0 }}
  </span>
    <i
      :class="{ 'is-active': recipe.isFavourite, 'c-recipe-content__action': displayMode }"
      @click="displayMode ? wrap(favourite) : null"
      class="material-icons"
    >
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
import modeContext from '@/mixins/detail/mode-context'
import requester from '@/mixins/requester'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipeContent',
  components: {
    FormInput: () => import('@/components/form/form-input'),
    FormTextarea: () => import('@/components/form/form-textarea')
  },
  mixins: [ modeContext, requester ],
  props: {
    model: Object
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    },
    creationTime () {
      return moment(this.recipe.creationTime).fromNow()
    }
  },
  methods: {
    like () {
      return this.$api.recipes.like(this.recipe.id).then(() => {
        return this.$api.recipes.read(this.recipe.id)
      }).then((value) => {
        this.$store.commit(SET_RECIPE, value.data)
        this.$notify.info(this.recipe.isLiked ? 'recipe-like' : 'recipe-unlike')
      })
    },
    favourite () {
      return this.$api.recipes.favourite(this.recipe.id).then(() => {
        return this.$api.recipes.read(this.recipe.id)
      }).then((value) => {
        this.$store.commit(SET_RECIPE, value.data)
        this.$notify.info(this.recipe.isFavourite ? 'recipe-favourite' : 'recipe-unfavourite')
      })
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

  &__action {
    cursor: pointer;

    &.is-active {
      color: $color-accent;
    }
  }

  &__value {
    font-size: 12px;
    margin: 0 12px 0 4px;
  }
}
</style>
