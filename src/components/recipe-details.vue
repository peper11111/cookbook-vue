<template>
<div class="c-recipe-details">
  <div class="c-recipe-details__wrapper">
    <image-picker
      v-model="banner"
      :disabled="!editMode"
      @file="bannerFile = $event"
      class="c-recipe-details__banner"
    ></image-picker>
    <div class="c-recipe-details__info">
      <input
        v-model="title"
        :placeholder="editMode ? $t('recipe.placeholder.title') : ''"
        class="c-recipe-details__title o-form__input"
      />
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.cuisine-type') }}
        </span>
        <select
          v-model="cuisine"
          :placeholder="'test'"
          class="c-recipe-details__value o-form__select"
        >
          <option
            v-for="item in cuisines"
            :key="item.id"
            :value="item.id"
            :selected="cuisine === item.id"
          >
            {{ $t(`recipe.cuisine.${item.name}`) }}
          </option>
        </select>
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.difficulty') }}
        </span>
        <rating-bar
          v-model="difficulty"
          :disabled="!editMode"
          class="c-recipe-details__value"
        ></rating-bar>
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.plates') }}
        </span>
        <input
          v-model="plates"
          class="c-recipe-details__value o-form__input"
        />
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.prepare-time') }}
        </span>
        <time-input
          v-model="time"
          :disabled="!editMode"
        ></time-input>
      </label>
      <button @click="clickAction('cancel')">Cancel</button>
    </div>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'
import details from '@/mixins/details'

export default {
  name: 'RecipeDetails',
  components: {
    ImagePicker: () => import('@/components/image-picker'),
    RatingBar: () => import('@/components/rating-bar'),
    TimeInput: () => import('@/components/time-input')
  },
  mixins: [ base, details ],
  data () {
    return {
      editMode: true,
      banner: null,
      bannerFile: null,
      title: null,
      cuisine: null,
      description: null,
      difficulty: null,
      plates: null,
      time: null
    }
  },
  computed: {
    cuisines () {
      return this.$store.state.cuisines
    },
    recipe () {
      return this.$store.state.recipe
    }
  },
  methods: {
    init () {
      this.banner = this.url(this.recipe.bannerId)
      this.title = this.recipe.title
      this.description = this.recipe.description
      this.cuisine = this.recipe.cuisineId
      this.difficulty = this.recipe.difficulty
      this.plates = this.recipe.plates
      this.time = this.recipe.time
    },
    update () {
      // TODO update mehod
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.c-recipe-details {
  &__wrapper {
    display: flex;
  }

  &__banner {
    width: 650px;
    height: 400px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    width: 350px;
    padding: 16px;
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
