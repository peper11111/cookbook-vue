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
        <select
          v-model="cuisine"
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
        <select
          v-model=time
          class="c-recipe-details__value o-form__select"
        >
          <option
            v-for="item in times"
            :key="item"
            :value="item"
            :selected="item === time"
          >
            {{ formatTime(item) }}
          </option>
        </select>
      </label>
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
    RatingBar: () => import('@/components/rating-bar')
  },
  mixins: [ base, details ],
  data () {
    return {
      editMode: true,
      banner: {},
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
    times () {
      return this.$store.state.times
    },
    recipe () {
      return this.$store.state.recipe
    }
  },
  methods: {
    init () {
      this.banner = {
        id: this.recipe.bannerId,
        file: null,
        src: this.url(this.recipe.bannerId)
      }
      this.title = this.recipe.title
      this.description = this.recipe.description
      this.cuisine = this.recipe.cuisineId
      this.difficulty = this.recipe.difficulty
      this.plates = this.recipe.plates
      this.time = this.recipe.time
    },
    update () {
      // TODO update mehod
    },
    formatTime (time) {
      const hours = Math.trunc(time / 60)
      const minutes = Math.trunc(time % 60)
      let format = ''
      if (hours > 0) {
        format += `${hours} h`
      }
      if (minutes > 0) {
        format += `${minutes} min`
      }
      return format
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
    width: auto;
  }
}
</style>
