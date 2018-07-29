<template>
<div class="o-page">
  <div class="o-page__wrapper">
    {{ recipeId }}
  </div>
</div>
</template>

<script>
export default {
  name: 'RecipePage',
  computed: {
    recipeId () {
      return this.$route.params.id
    }
  }
}
</script>
