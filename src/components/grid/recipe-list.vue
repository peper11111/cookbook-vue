<template>
<div class="c-recipe-list">
  <div class="c-recipe-list__icons">
    <i
      :class="{ 'is-active': mode === 'list' }"
      @click="mode = 'list'"
      class="material-icons c-recipe-list__icon"
    >
      view_list
    </i>
    <i
      :class="{ 'is-active': mode === 'grid' }"
      @click="mode = 'grid'"
      class="material-icons c-recipe-list__icon"
    >
      view_module
    </i>
  </div>
  <div class="c-recipe-list__wrapper">
    <recipe-tile
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    ></recipe-tile>
  </div>
</div>
</template>

<script>
export default {
  name: 'RecipeList',
  components: {
    RecipeTile: () => import('@/components/grid/recipe-tile')
  },
  data () {
    return {
      mode: 'grid'
    }
  },
  computed: {
    recipes () {
      return this.$store.state.recipes
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.c-recipe-list {
  &__icons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__icon {
    color: $color-gray-300;
    margin-right: 16px;
    cursor: pointer;
    user-select: none;

    &.is-active {
      color: $color-black;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
