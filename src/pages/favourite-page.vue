<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-filters class="c-favourite-page__filtering"></recipe-filters>
    <div class="c-favourite-page__wrapper">
      <recipe-list
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
    RecipeList: () => import('@/components/list/recipe-list')
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
