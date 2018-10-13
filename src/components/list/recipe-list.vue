<template>
<div class="c-recipe-list">
  <recipe-item
    v-for="recipe in items"
    :key="recipe.id"
    :mode="mode"
    :recipe="recipe"
  ></recipe-item>
</div>
</template>

<script>
import scroll from '@/mixins/scroll'

export default {
  name: 'RecipeList',
  components: {
    RecipeItem: () => import('@/components/list/recipe-item')
  },
  mixins: [ scroll ],
  props: {
    mode: String,
    type: String
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'user-recipes':
          return this.$api.users.readRecipes(this.user.id, { page: this.page++ })
        default:
          return Promise.resolve({ data: [] })
      }
    }
  }
}
</script>

<style lang="scss">
.c-recipe-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
