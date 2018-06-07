<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-details></recipe-details>
    <div class="o-page__separator"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'NewRecipeView',
  components: {
    RecipeDetails: () => import('@/components/recipe-details')
  }
}
</script>
