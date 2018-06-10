<template>
<div class="c-recipe-details">
  <div class="c-recipe-details__wrapper">
    <image-picker
      v-model="banner"
      :disabled="!editMode"
      class="c-recipe-details__banner"
    ></image-picker>
    <div class="c-recipe-details__info">
      <input
        v-model="title"
        class="c-recipe-details__title o-form__input"
      />
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.cuisine-type') }}
        </span>
        <select class="o-form__select">
          <option
            v-for="cuisine in cuisines"
            :key="cuisine.id"
            :value="cuisine.id"
          >
            {{ $t(`recipe.cuisine.${cuisine.name}`) }}
          </option>
        </select>
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.difficulty') }}
        </span>
        <rating-bar v-model="difficulty"></rating-bar>
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.plates') }}
        </span>
        <rating-bar
          v-model="plates"
          :icon="'restaurant'"
        ></rating-bar>
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.prepare-time') }}
        </span>
        <select class="o-form__select">
          <option
            v-for="time in times"
            :key="time"
            :value="time"
          >
            {{ formatTime(time) }}
          </option>
        </select>
      </label>
    </div>
  </div>
</div>
</template>

<script>
import details from '@/mixins/details'

export default {
  name: 'RecipeDetails',
  components: {
    ImagePicker: () => import('@/components/image-picker'),
    RatingBar: () => import('@/components/rating-bar')
  },
  mixins: [ details ],
  data () {
    return {
      editMode: true,
      banner: {},
      title: '',
      difficulty: 1,
      plates: 1
    }
  },
  computed: {
    cuisines () {
      return this.$store.state.cuisines
    },
    times () {
      return this.$store.state.recipe.times
    }
  },
  methods: {
    init () {
      // TODO init method
    },
    update () {
      // TODO update mehod
    },
    formatTime (time) {
      const hours = time / 60
      const minutes = time % 60
      return Math.trunc(hours) > 0 ? `${this.$n(hours)} h` : `${minutes} min`
    },
    changeBanner (banner) {
      this.banner = banner
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
    align-items: center;
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
}
</style>
