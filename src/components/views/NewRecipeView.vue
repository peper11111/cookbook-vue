<template>
<div class="view">
  <div class="view__wrapper recipe">
    <div class="recipe__image">
      <img src="https://d1doqjmisr497k.cloudfront.net/-/media/kamispl-2016/recipe/2000/paella_valencia_2000.ashx?vd=20160620T210802Z&ir=1&width=885&height=498&crop=auto&quality=75&speed=0&hash=567B2A8FB6FB9571966589138FC1807A33821135"/>
      <div class="recipe__overlay">
        <i class="material-icons">camera_alt</i>
      </div>
    </div>
    <div class="recipe__details">
      <div>
        <label class="recipe__label" v-text="$t('recipe.cuisine-type')"></label>
        <select class="form__select">
          <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine" v-text="$t(`recipe.cuisine.${cuisine}`)"></option>
        </select>
      </div>
      <div>
        <label class="recipe__label" v-text="$t('recipe.difficulty-level')"></label>
        <select class="form__select">
          <option v-for="level in levels" :key="level" :value="level" v-text="$t(`recipe.level.${level}`)"></option>
        </select>
      </div>
      <div>
        <label class="recipe__label" v-text="$t('recipe.prepare-time')"></label>
        <select class="form__select">
          <option v-for="time in times" :key="time" :value="time" v-text="formatTime(time)"></option>
        </select>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'

export default {
  name: 'NewRecipeView',
  mixins: [ base ],
  computed: {
    cuisines () {
      return this.$store.state.recipe.cuisines
    },
    levels () {
      return this.$store.state.recipe.levels
    },
    times () {
      return this.$store.state.recipe.times
    }
  },
  methods: {
    formatTime (time) {
      const hours = time / 60
      const minutes = time % 60
      return Math.trunc(hours) > 0 ? `${this.$n(hours)} h` : `${minutes} min`
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.recipe {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &__image {
    height: 400px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    cursor: pointer;
    opacity: 0;
    user-select: none;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 32px;
      color: $color-white;
    }
  }

  &__details {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: $color-grey-300;
    padding: 8px 16px;
  }

  &__label {
    padding: 0 8px;
  }
}
</style>
