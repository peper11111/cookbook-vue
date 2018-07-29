<template>
<div class="c-recipe-list">
  <recipe-item
    v-for="recipe in recipes"
    :key="recipe.id"
    :recipe="recipe"
  ></recipe-item>
</div>
</template>

<script>
export default {
  name: 'RecipeList',
  components: {
    RecipeItem: () => import('@/components/recipe-item')
  },
  computed: {
    recipes () {
      return this.$store.state.recipes
    }
  }
}
</script>

<style lang="scss">
.c-recipe-list {
  display: flex;
}
</style>
