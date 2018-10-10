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
      <recipe-content
        :mode="localMode"
        :model="model"
        class="c-recipe-details__content"
      ></recipe-content>
      <div class="c-recipe-details__info">
        <label class="c-recipe-details__item">
          <span class="c-recipe-details__label">
            {{ $t('recipe.cuisine-type') }}
          </span>
          <form-select
            v-model="model.cuisineId"
            :disabled="displayMode || previewMode"
            :options="cuisines"
            class="c-recipe-details__value"
          ></form-select>
        </label>
        <label class="c-recipe-details__item">
          <span class="c-recipe-details__label">
            {{ $t('recipe.category-type') }}
          </span>
          <form-select
            v-model="model.categoryId"
            :disabled="displayMode || previewMode"
            :options="categories"
            class="c-recipe-details__value"
          ></form-select>
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
          <form-input
            v-model="model.plates"
            :disabled="displayMode || previewMode"
            class="c-recipe-details__value"
          ></form-input>
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
import detail from '@/mixins/detail'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipeDetails',
  components: {
    DetailActions: () => import('@/components/detail-actions'),
    FormInput: () => import('@/components/form/form-input'),
    FormSelect: () => import('@/components/form/form-select'),
    FormTextarea: () => import('@/components/form/form-textarea'),
    ImagePicker: () => import('@/components/form/image-picker'),
    RatingBar: () => import('@/components/form/rating-bar'),
    TimeInput: () => import('@/components/form/time-input'),
    RecipeContent: () => import('@/components/recipe/recipe-content')
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
      return this.$store.state.cuisines.map((cuisine) => {
        return {
          value: cuisine.id,
          label: cuisine.name
        }
      })
    },
    categories () {
      return this.$store.state.categories.map((category) => {
        return {
          value: category.id,
          label: category.name
        }
      })
    },
    recipe () {
      return this.$store.state.recipe
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
    padding: 32px 32px 0;
    position: relative;
  }

  &__row {
    display: flex;
    margin-bottom: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-right: 32px;
  }

  &__info {
    width: 300px;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__label {
    text-align: left;
    white-space: nowrap;
    width: 140px;
  }

  &__value {
    width: 160px;
  }
}
</style>
