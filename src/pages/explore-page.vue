<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-filters class="c-explore-page__filtering"></recipe-filters>
    <div class="c-explore-page__wrapper">
      <recipe-list type="recipes"></recipe-list>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ExplorePage',
  components: {
    RecipeFilters: () => import('@/components/list/recipe-filters'),
    RecipeList: () => import('@/components/list/recipe-list')
  }
}
</script>

<style lang="scss">
.c-explore-page {
  &__filtering {
    position: fixed;
    top: 66px;
    left: calc(50% - 484px);
  }

  &__wrapper {
    margin-left: 354px;
  }
}
</style>
