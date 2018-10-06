<template>
<div class="c-recipe-list">
  <div class="c-recipe-list__icons">
    <i
      :class="{ 'is-active': isActiveMode('list') }"
      @click="setActiveMode('list')"
      class="material-icons c-recipe-list__icon"
    >
      view_list
    </i>
    <i
      :class="{ 'is-active': isActiveMode('grid') }"
      @click="setActiveMode('grid')"
      class="material-icons c-recipe-list__icon"
    >
      view_module
    </i>
  </div>
  <div class="c-recipe-list__wrapper">
    <recipe-tile
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    ></recipe-tile>
  </div>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { ADD_RECIPES, REMOVE_RECIPES } from '@/store/mutation-types'

export default {
  name: 'RecipeList',
  components: {
    RecipeTile: () => import('@/components/grid/recipe-tile')
  },
  mixins: [ requester ],
  props: {
    type: String
  },
  data () {
    return {
      done: false,
      mode: 'grid',
      page: 1
    }
  },
  computed: {
    recipes () {
      return this.$store.state.recipes
    },
    userId () {
      return this.$route.params.id
    }
  },
  created () {
    this.$store.commit(REMOVE_RECIPES)
    this.wrap(this.fetchRecipes)
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    isActiveMode (mode) {
      return this.mode === mode
    },
    setActiveMode (mode) {
      this.mode = mode``
    },
    onScroll () {
      if (this.pending || this.done) {
        return
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        this.wrap(this.fetchRecipes)
      }
    },
    fetchRecipes () {
      return this.getRecipesMethod().then((value) => {
        this.$store.commit(ADD_RECIPES, value.data)
        if (value.data.length < 12) {
          this.done = true
        }
      })
    },
    getRecipesMethod () {
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
@import '../../assets/styles/variables';

.c-recipe-list {
  &__icons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__icon {
    color: $color-gray-300;
    margin-right: 16px;
    cursor: pointer;
    user-select: none;

    &.is-active {
      color: $color-black;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
