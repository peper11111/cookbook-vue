<template>
<div class="c-recipe-info">
  <div class="c-recipe-info__item">
    <span class="c-recipe-info__label">
      {{ $t('recipe.cuisine-type') }}
    </span>
    <form-select
      v-model="models.cuisineId"
      :disabled="previewMode"
      :options="cuisines"
      class="c-recipe-info__value"
    ></form-select>
  </div>
  <div class="c-recipe-info__item">
    <span class="c-recipe-info__label">
      {{ $t('recipe.category-type') }}
    </span>
    <form-select
      v-model="models.categoryId"
      :disabled="previewMode"
      :options="categories"
      class="c-recipe-info__value"
    ></form-select>
  </div>
  <div class="c-recipe-info__item">
    <span class="c-recipe-info__label">
      {{ $t('recipe.difficulty') }}
    </span>
    <rating-bar
      v-model="models.difficulty"
      :disabled="previewMode"
      class="c-recipe-info__value"
    ></rating-bar>
  </div>
  <div class="c-recipe-info__item">
    <span class="c-recipe-info__label">
      {{ $t('recipe.plates') }}
    </span>
    <form-input
      v-model="models.plates"
      :disabled="previewMode"
      class="c-recipe-info__value"
    ></form-input>
  </div>
  <div class="c-recipe-info__item">
    <span class="c-recipe-info__label">
      {{ $t('recipe.preparation-time') }}
    </span>
    <time-input
      v-model="models.preparationTime"
      :disabled="previewMode"
    ></time-input>
  </div>
</div>
</template>

<script>
export default {
  name: 'RecipeInfo',
  components: {
    FormInput: () => import('@/components/form/form-input'),
    FormSelect: () => import('@/components/form/form-select'),
    FormTextarea: () => import('@/components/form/form-textarea'),
    RatingBar: () => import('@/components/form/rating-bar'),
    TimeInput: () => import('@/components/form/time-input')
  },
  props: {
    models: Object,
    previewMode: Boolean
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
    }
  }
}
</script>

<style lang="scss">
.c-recipe-info {
  display: flex;
  flex-direction: column;

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__label {
    font-weight: bold;
    white-space: nowrap;
    width: 140px;
  }

  &__value {
    width: 160px;
  }
}
</style>
