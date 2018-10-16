<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <user-list type="users-search"></user-list>
    <recipe-buttons v-model="layout"></recipe-buttons>
    <recipe-list
      :layout="layout"
      type="recipes-search"
    ></recipe-list>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchPage',
  components: {
    RecipeButtons: () => import('@/components/list/recipe-buttons'),
    RecipeList: () => import('@/components/list/recipe-list'),
    UserList: () => import('@/components/list/user-list')
  },
  data () {
    return {
      layout: 'list'
    }
  }
}
</script>
