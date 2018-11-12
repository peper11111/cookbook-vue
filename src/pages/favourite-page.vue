<template>
<div class="o-page">
  <div class="o-page__wrapper o-page__wrapper--list">
    <div class="o-page__sidebar">
      <recipe-filters></recipe-filters>
    </div>
    <div class="o-page__container">
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
