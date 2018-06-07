<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <image-picker
      :editMode="true"
      :imgSrc="banner.src"
      @change="changeBanner"
      class="recipe__banner"
    ></image-picker>
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
export default {
  name: 'NewRecipeView',
  components: {
    ImagePicker: () => import('@/components/image-picker')
  },
  data () {
    return {
      banner: {
        src: 'https://d1doqjmisr497k.cloudfront.net/-/media/kamispl-2016/recipe/2000/paella_valencia_2000.ashx?vd=20160620T210802Z&ir=1&width=885&height=498&crop=auto&quality=75&speed=0&hash=567B2A8FB6FB9571966589138FC1807A33821135',
        file: null
      }
    }
  },
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
    },
    changeBanner (banner) {
      this.banner = banner
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.recipe {
  &__banner {
    width: 100%;
    height: 300px;
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
