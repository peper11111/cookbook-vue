<template>
<div
  v-if="items.length !== 0"
  class="c-recipe-list"
>
  <recipe-buttons v-model="layout"></recipe-buttons>
  <div class="c-recipe-list__wrapper">
    <recipe-item
      v-for="recipe in items"
      :key="recipe.id"
      :layout="layout"
      :recipe="recipe"
    ></recipe-item>
  </div>
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
    RecipeButtons: () => import('@/components/list/recipe-buttons'),
    RecipeItem: () => import('@/components/list/recipe-item')
  },
  mixins: [ scroll ],
  props: {
    type: String,
    userId: Number
  },
  data () {
    return {
      layout: 'grid'
    }
  },
  computed: {
    query () {
      return this.$route.query
    }
  },
  watch: {
    query () {
      this.init()
    }
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'recipes':
          return this.$api.recipes.readAll({ ...this.query, page: this.page })
        case 'recipes-search':
          return this.$api.recipes.search({ ...this.query, page: this.page })
        case 'user-recipes':
          return this.$api.users.readRecipes(this.userId, { page: this.page })
        case 'user-recommended':
          return this.$api.users.readRecommended(this.userId, { ...this.query, page: this.page })
        case 'user-favourites':
          return this.$api.users.readFavourites(this.userId, { ...this.query, page: this.page })
        default:
          return Promise.resolve({ data: [] })
      }
    }
  }
}
</script>

<style lang="scss">
.c-recipe-list {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -16px;
  }

  &__text {
    margin-top: 24px;
    text-align: center;
  }
}
</style>
