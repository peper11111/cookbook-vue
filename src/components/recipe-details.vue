<template>
<div class="c-recipe-details">
  <image-picker
    :editMode="editMode"
    :imgSrc="banner.src"
    @change="changeBanner"
    class="c-recipe-details__banner"
  ></image-picker>
  <div class="c-recipe-details__wrapper">
    <div>
      <label>
        {{ $t('recipe.cuisine-type') }}
        <select class="form__select">
          <option
            v-for="cuisine in cuisines"
            :key="cuisine.id"
            :value="cuisine.id"
          >
            {{ $t(`recipe.cuisine.${cuisine.name}`) }}
          </option>
        </select>
      </label>
    </div>
    <rating-bar
      :value="difficulty"
      :stars="5"
      @change="changeDifficulty"
    ></rating-bar>
    <div>
      <label class="c-recipe-details__label" v-text="$t('recipe.difficulty-level')"></label>
      <select class="form__select">
        <option v-for="level in levels" :key="level" :value="level" v-text="$t(`recipe.level.${level}`)"></option>
      </select>
    </div>
    <div>
      <label class="c-recipe-details__label" v-text="$t('recipe.prepare-time')"></label>
      <select class="form__select">
        <option v-for="time in times" :key="time" :value="time" v-text="formatTime(time)"></option>
      </select>
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
      difficulty: 3
    }
  },
  computed: {
    cuisines () {
      return this.$store.state.cuisines
    },
    levels () {
      return this.$store.state.recipe.levels
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
    changeDifficulty (difficulty) {
      this.difficulty = difficulty
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.c-recipe-details {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: -19px;
  }
}
</style>
