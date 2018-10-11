<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <recipe-details :mode="mode"></recipe-details>
    <div class="o-page__separator"></div>
    <recipe-comments></recipe-comments>
  </div>
</div>
</template>

<script>
import { DISPLAY, PREVIEW } from '@/mixins/detail/mode-types'
import requester from '@/mixins/requester'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipePage',
  mixins: [ requester ],
  components: {
    RecipeComments: () => import('@/components/recipe/recipe-comments'),
    RecipeDetails: () => import('@/components/recipe/recipe-details')
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    recipe () {
      return this.$store.state.recipe
    },
    mode () {
      return this.recipe.author.id === this.authUser.id ? PREVIEW : DISPLAY
    }
  },
  created () {
    this.wrap(this.fetchRecipe)
  },
  methods: {
    fetchRecipe () {
      return this.$api.recipes.read(this.$route.params.id).then((value) => {
        this.$store.commit(SET_RECIPE, value.data)
      })
    }
  }
}
</script>
