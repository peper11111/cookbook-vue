<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <recipe-details></recipe-details>
    <div class="o-page__separator"></div>
    <div class="o-page__container">
      <h1 class="o-typography__header">
        {{ $t('recipe.comments') }}
      </h1>
      <comment-list
        :inputVisible="true"
        :recipeId="recipeId"
        type="recipe-comments"
      ></comment-list>
    </div>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipePage',
  mixins: [ requester ],
  components: {
    CommentInput: () => import('@/components/form/comment-input'),
    CommentList: () => import('@/components/comment/comment-list'),
    RecipeDetails: () => import('@/components/recipe/recipe-details')
  },
  computed: {
    recipeId () {
      return Number(this.$route.params.id)
    }
  },
  created () {
    this.fetchRecipe()
  },
  methods: {
    fetchRecipe () {
      this.wrap(() => {
        return this.$api.recipes.read(this.recipeId).then((value) => {
          this.$store.commit(SET_RECIPE, value.data)
        })
      })
    }
  }
}
</script>
