<template>
<div class="o-page">
  <div class="o-page__wrapper o-page__wrapper--list">
    <div class="o-page__container">
      <user-list type="users-search"></user-list>
      <recipe-list type="recipes-search"></recipe-list>
    </div>
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
