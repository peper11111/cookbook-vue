<template>
<div class="c-recipe-details">
  <image-picker
    :editMode="editMode"
    :imgSrc="banner.src"
    @change="changeBanner"
    class="c-recipe-details__banner"
  ></image-picker>
  <div class="c-recipe-details__wrapper">
    <label class="c-recipe-details__item">
      <select class="o-form__select">
        <option
          v-for="cuisine in cuisines"
          :key="cuisine.id"
          :value="cuisine.id"
        >
          {{ $t(`recipe.cuisine.${cuisine.name}`) }}
        </option>
      </select>
      <span class="c-recipe-details__label">
        {{ $t('recipe.cuisine-type') }}
      </span>
    </label>
    <label class="c-recipe-details__item">
      <rating-bar
        :value="difficulty"
        @change="changeDifficulty"
      ></rating-bar>
      <span class="c-recipe-details__label">
        {{ $t('recipe.difficulty') }}
      </span>
    </label>
    <label class="c-recipe-details__item">
      <rating-bar
        :icon="'restaurant'"
        :value="plates"
        @change="changePlates"
      ></rating-bar>
      <span class="c-recipe-details__label">
        {{ $t('recipe.plates') }}
      </span>
    </label>
    <label class="c-recipe-details__item">
      <select class="o-form__select">
        <option
          v-for="time in times"
          :key="time"
          :value="time"
        >
          {{ formatTime(time) }}
        </option>
      </select>
      <span class="c-recipe-details__label">
        {{ $t('recipe.prepare-time') }}
      </span>
    </label>
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
      banner: {
        src: null,
        file: null
      },
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
    },
    changeDifficulty (difficulty) {
      this.difficulty = difficulty
    },
    changePlates (plates) {
      this.plates = plates
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

.c-recipe-details {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 32px 32px 0 32px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__label {
    text-align: center;
    margin-top: 4px;
  }
}
</style>
