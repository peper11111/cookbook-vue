<template>
<div
  v-if="items.length !== 0"
  class="c-recipe-list"
>
  <recipe-item
    v-for="recipe in items"
    :key="recipe.id"
    :layout="layout"
    :recipe="recipe"
  ></recipe-item>
</div>
<div
  v-else
  class="c-recipe-list__text"
>
  {{ $t('list.no-recipes') }}
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
    layout: String,
    filtering: Object,
    type: String,
    userId: Number
  },
  watch: {
    query () {
      this.init()
    },
    filtering () {
      this.init()
    }
  },
  computed: {
    query () {
      return this.$route.query.query
    }
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'recipes':
          return this.$api.recipes.readAll({ ...this.filtering, page: this.page++ })
        case 'recipes-search':
          return this.$api.recipes.search({ query: this.query, page: this.page++ })
        case 'user-recipes':
          return this.$api.users.readRecipes(this.userId, { page: this.page++ })
        case 'user-favourites':
          return this.$api.users.readFavourites(this.userId, { ...this.filtering, page: this.page++ })
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

  &__text {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
