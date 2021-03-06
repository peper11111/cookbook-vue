<template>
<div class="c-recipe-filters">
  <h1 class="o-typography__header">
    {{ $t('recipe.filtering') }}
  </h1>
  <div class="c-recipe-filters__header">
    {{ $t('recipe.cuisine-type') }}
  </div>
  <form-select
    v-model="models.cuisineId"
    :options="cuisines"
  ></form-select>
  <div class="c-recipe-filters__header">
    {{ $t('recipe.category-type') }}
  </div>
  <form-select
    v-model="models.categoryId"
    :options="categories"
  ></form-select>
  <div class="c-recipe-filters__header">
    {{ $t('recipe.difficulty') }}
  </div>
  <div class="c-recipe-filters__row">
    <span class="c-recipe-filters__label">
      {{ $t('global.from') }}
    </span>
    <rating-bar
      v-model="models.minDifficulty"
    ></rating-bar>
  </div>
  <div class="c-recipe-filters__row">
    <span class="c-recipe-filters__label">
      {{ $t('global.to') }}
    </span>
    <rating-bar
      v-model="models.maxDifficulty"
    ></rating-bar>
  </div>
  <div class="c-recipe-filters__header">
    {{ $t('recipe.plates') }}
  </div>
  <div class="c-recipe-filters__row">
    <span class="c-recipe-filters__label">
      {{ $t('global.from') }}
    </span>
    <form-input
      v-model="models.minPlates"
    ></form-input>
  </div>
  <div class="c-recipe-filters__row">
    <span class="c-recipe-filters__label">
      {{ $t('global.to') }}
    </span>
    <form-input
      v-model="models.maxPlates"
    ></form-input>
  </div>
  <div class="c-recipe-filters__header">
    {{ $t('recipe.preparation-time') }}
  </div>
  <div class="c-recipe-filters__row">
    <span class="c-recipe-filters__label">
      {{ $t('global.from') }}
    </span>
    <time-input
      v-model="models.minPreparationTime"
    ></time-input>
  </div>
  <div class="c-recipe-filters__row">
    <span class="c-recipe-filters__label">
      {{ $t('global.to') }}
    </span>
    <time-input
      v-model="models.maxPreparationTime"
    ></time-input>
  </div>
  <div class="c-recipe-filters__row c-recipe-filters__buttons">
    <button
      @click="clearFiltering"
      class="o-button o-button__primary"
    >
      {{ $t('global.clear') }}
    </button>
    <button
      @click="updateFiltering"
      class="o-button o-button__accent"
    >
      {{ $t('recipe.filter') }}
    </button>
  </div>
</div>
</template>

<script>
import model from '@/mixins/model'

export default {
  name: 'RecipeFilters',
  components: {
    FormInput: () => import('@/components/form/form-input'),
    FormSelect: () => import('@/components/form/form-select'),
    RatingBar: () => import('@/components/form/rating-bar'),
    TimeInput: () => import('@/components/form/time-input')
  },
  mixins: [ model ],
  data () {
    return {
      models: {
        cuisineId: null,
        categoryId: null,
        minDifficulty: null,
        maxDifficulty: null,
        minPlates: null,
        maxPlates: null,
        minPreparationTime: null,
        maxPreparationTime: null
      }
    }
  },
  computed: {
    model () {
      return this.$route.query
    },
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
  },
  methods: {
    clearFiltering () {
      this.$router.push({
        path: this.$route.path,
        query: {}
      })
    },
    updateFiltering () {
      this.$router.push({
        path: this.$route.path,
        query: this.getParams()
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/mixins";
@import "../../assets/styles/variables";

.c-recipe-filters {
  @include box-elevation;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 16px;
  border-radius: 2px;
  background-color: $color-white;

  &__header {
    font-weight: bold;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__label {
    margin-right: 16px;
  }

  &__buttons {
    margin-top: 16px;
  }
}
</style>
