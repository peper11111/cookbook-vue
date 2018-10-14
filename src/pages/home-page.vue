<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <recipe-buttons
      v-model="layout"
      class="c-home-page__buttons"
    ></recipe-buttons>
    <recipe-list
      :layout="layout"
      type="recipes"
    ></recipe-list>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    RecipeButtons: () => import('@/components/list/recipe-buttons'),
    RecipeList: () => import('@/components/list/recipe-list')
  },
  data () {
    return {
      layout: 'list'
    }
  }
}
</script>

<style lang="scss">
.c-home-page {
  &__buttons {
    margin-top: 16px;
  }
}
</style>
