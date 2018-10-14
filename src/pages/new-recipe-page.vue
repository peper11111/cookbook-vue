<template>
<div
  v-if="!pending"
  class="o-page"
>
  <div class="o-page__wrapper">
    <recipe-details v-model="mode"></recipe-details>
  </div>
</div>
</template>

<script>
import { CREATE } from '@/mixins/detail/mode-types'
import requester from '@/mixins/requester'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'NewRecipeView',
  mixins: [ requester ],
  components: {
    RecipeDetails: () => import('@/components/recipe/recipe-details')
  },
  data () {
    return {
      mode: CREATE
    }
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    }
  },
  created () {
    this.wrap(this.fetchRecipe())
  },
  methods: {
    fetchRecipe () {
      return new Promise((resolve) => {
        this.$store.commit(SET_RECIPE, { author: this.authUser, ingredients: [], steps: [] })
        resolve()
      })
    }
  }
}
</script>
