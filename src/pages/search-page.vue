<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <user-list type="users-search"></user-list>
    <recipe-list type="recipes-search"></recipe-list>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchPage',
  components: {
    RecipeList: () => import('@/components/list/recipe-list'),
    UserList: () => import('@/components/list/user-list')
  }
}
</script>
