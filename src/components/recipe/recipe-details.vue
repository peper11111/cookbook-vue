<template>
<div class="c-recipe-details">
  <detail-actions
    :disabled="pending"
    :mode="localMode"
    @action="onAction"
  ></detail-actions>
  <image-picker
    v-model="model.bannerId"
    blank="/static/blank-banner.jpg"
    :disabled="displayMode || previewMode"
    class="c-recipe-details__banner"
  ></image-picker>
  <div class="c-recipe-details__wrapper">
    <div class="c-recipe-details__row">
      <router-link
        :to="`/user/${recipe.author.id}`"
        class="c-recipe-details__author"
      >
        {{ recipe.author.username }}
      </router-link>
      <span class="c-recipe-details__time">
        {{ creationTime }}
      </span>
    </div>
    <div class="c-recipe-details__row">
      <div class="c-recipe-details__content">
        <form-input
          v-model="model.title"
          :disabled="displayMode || previewMode"
          :placeholder="$t('recipe.placeholder.title')"
          class="c-recipe-details__title"
        ></form-input>
        <form-textarea
          v-model="model.description"
          :disabled="displayMode || previewMode"
          :placeholder="$t('recipe.placeholder.description')"
          :maxlength="255"
          :rows="3"
          class="c-recipe-details__description"
        ></form-textarea>
        <recipe-summary class="c-recipe-details__summary"></recipe-summary>
      </div>
      <div class="c-recipe-details__info">
        <label class="c-recipe-details__item">
          <span class="c-recipe-details__label">
            {{ $t('recipe.cuisine-type') }}
          </span>
          <select
            v-model="model.cuisineId"
            :placeholder="'test'"
            class="c-recipe-details__value o-form__select"
          >
            <option
              v-for="item in cuisines"
              :key="item.id"
              :value="item.id"
              :selected="model.cuisineId === item.id"
            >
              {{ $t(`recipe.cuisine.${item.name}`) }}
            </option>
          </select>
        </label>
        <label class="c-recipe-details__item">
          <span class="c-recipe-details__label">
            {{ $t('recipe.category-type') }}
          </span>
          <select
            v-model="model.categoryId"
            :placeholder="'test'"
            class="c-recipe-details__value o-form__select"
          >
            <option
              v-for="item in categories"
              :key="item.id"
              :value="item.id"
              :selected="model.categoryId === item.id"
            >
              {{ $t(`recipe.category.${item.name}`) }}
            </option>
          </select>
        </label>
        <label class="c-recipe-details__item">
          <span class="c-recipe-details__label">
            {{ $t('recipe.difficulty') }}
          </span>
          <rating-bar
            v-model="model.difficulty"
            :disabled="displayMode || previewMode"
            class="c-recipe-details__value"
          ></rating-bar>
        </label>
        <label class="c-recipe-details__item">
          <span class="c-recipe-details__label">
            {{ $t('recipe.plates') }}
          </span>
          <input
            v-model="model.plates"
            class="c-recipe-details__value o-form__input"
          />
        </label>
        <label class="c-recipe-details__item">
          <span class="c-recipe-details__label">
            {{ $t('recipe.preparation-time') }}
          </span>
          <time-input
            v-model="model.preparationTime"
            :disabled="displayMode || previewMode"
          ></time-input>
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import detail from '@/mixins/detail'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipeDetails',
  components: {
    DetailActions: () => import('@/components/detail-actions'),
    FormInput: () => import('@/components/form/form-input'),
    FormTextarea: () => import('@/components/form/form-textarea'),
    ImagePicker: () => import('@/components/form/image-picker'),
    RatingBar: () => import('@/components/form/rating-bar'),
    TimeInput: () => import('@/components/form/time-input'),
    RecipeSummary: () => import('@/components/recipe/recipe-summary')
  },
  mixins: [ detail ],
  data () {
    return {
      modelSrc: 'recipe',
      model: {
        bannerId: null,
        title: null,
        description: null,
        cuisineId: null,
        categoryId: null,
        difficulty: null,
        plates: null,
        preparationTime: null
      }
    }
  },
  computed: {
    cuisines () {
      return this.$store.state.cuisines
    },
    categories () {
      return this.$store.state.categories
    },
    recipe () {
      return this.$store.state.recipe
    },
    creationTime () {
      return moment(this.recipe.creationTime).fromNow()
    }
  },
  methods: {
    modify (params) {
      return this.$api.recipes.modify(this.recipe.id, params).then(() => {
        return this.$api.recipes.read(this.recipe.id)
      }).then((value) => {
        this.$store.commit(SET_RECIPE, value.data)
        this.$notify.success('recipe-update-successful')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-recipe-details {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    padding: 32px;
    position: relative;
  }

  &__row {
    display: flex;
    justify-content: space-between;
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
    font-size: 12px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 590px;
  }

  &__info {
    width: 330px;
  }

  &__title {
    margin-top: 16px;
    font-size: 24px;
  }

  &__description {
    margin-top: 16px;
  }

  &__summary {
    margin-top: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 40px;
  }

  &__label {
    text-align: left;
    white-space: nowrap;
    width: 140px;
  }

  &__value {
    width: 178px;
  }
}
</style>
