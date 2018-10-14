<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-buttons
      v-model="layout"
      class="c-cookbook-page__buttons"
    ></recipe-buttons>
    <recipe-list
      :layout="layout"
      :userId="authUser.id"
      type="user-favourites"
    ></recipe-list>
  </div>
</div>
</template>

<script>
export default {
  name: 'CookbookPage',
  components: {
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
.c-cookbook-page {
  &__buttons {
    padding-top: 16px;
  }
}
</style>
