<template>
<div class="o-page" v-if="!pending">
  <div class="o-page__wrapper">
    <user-details></user-details>
    <div class="o-page__separator"></div>
    <recipe-list></recipe-list>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import scroll from '@/mixins/scroll'
import { ADD_RECIPES, REMOVE_RECIPES, SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserPage',
  components: {
    RecipeList: () => import('@/components/grid/recipe-list'),
    UserDetails: () => import('@/components/user/user-details')
  },
  mixins: [ requester, scroll ],
  computed: {
    userId () {
      return Number(this.$route.params.id)
    }
  },
  created () {
    this.wrap(this.fetchUser)
  },
  methods: {
    fetchUser () {
      return this.$api.users.read(this.userId).then((value) => {
        this.$store.commit(SET_USER, value.data)
        this.$store.commit(REMOVE_RECIPES)
      }).then(() => {
        return this.fetchRecipes()
      })
    },
    fetchRecipes () {
      return this.$api.users.readRecipes(this.userId, { page: this.page++ }).then((value) => {
        this.$store.commit(ADD_RECIPES, value.data)
        if (value.data.length < 12) {
          this.done = true
        }
      })
    }
  }
}
</script>
