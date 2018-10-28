<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-filters
      @input="updateFiltering"
      class="c-explore-page__filtering"
    ></recipe-filters>
    <div class="c-explore-page__wrapper">
      <recipe-buttons v-model="layout"></recipe-buttons>
      <recipe-list
        :layout="layout"
        :filtering="filtering"
        type="recipes"
      ></recipe-list>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ExplorePage',
  components: {
    RecipeFilters: () => import('@/components/list/recipe-filters'),
    RecipeButtons: () => import('@/components/list/recipe-buttons'),
    RecipeList: () => import('@/components/list/recipe-list')
  },
  data () {
    return {
      filtering: {},
      layout: 'list'
    }
  },
  methods: {
    updateFiltering (filtering) {
      this.filtering = filtering
    }
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
