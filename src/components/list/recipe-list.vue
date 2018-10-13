<template>
<div
  v-if="items.length !== 0"
  class="c-recipe-list"
>
  <recipe-item
    v-for="recipe in items"
    :key="recipe.id"
    :mode="mode"
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
    blank: String,
    mode: String,
    type: String,
    userId: Number
  },
  methods: {
    getFetchMethod () {
      switch (this.type) {
        case 'user-recipes':
          return this.$api.users.readRecipes(this.userId, { page: this.page++ })
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
