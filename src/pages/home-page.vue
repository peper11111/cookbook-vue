<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-filters class="c-home-page__filtering"></recipe-filters>
    <div class="c-home-page__wrapper">
      <recipe-list
        :userId="authUser.id"
        type="user-recommended"
      ></recipe-list>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomePage',
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
.c-home-page {
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
