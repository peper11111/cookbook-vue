<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-filters class="c-favourite-page__filtering"></recipe-filters>
    <div class="c-favourite-page__wrapper">
      <recipe-buttons v-model="layout"></recipe-buttons>
      <recipe-list
        :layout="layout"
        :userId="authUser.id"
        type="user-favourites"
      ></recipe-list>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'FavouritePage',
  components: {
    RecipeFilters: () => import('@/components/list/recipe-filters'),
    RecipeButtons: () => import('@/components/list/recipe-buttons'),
    RecipeList: () => import('@/components/list/recipe-list')
  },
  data () {
    return {
      layout: 'list'
    }
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style lang="scss">
.c-favourite-page {
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
