<template>
<div class="c-recipe-list">
  <div class="c-recipe-list__row">
    <h1 class="c-recipe-list__title">
      {{ $t('grid.recipes') }}
    </h1>
    <div class="c-recipe-list__icons">
      <i
        :class="{ 'is-active': isActiveMode('list') }"
        @click="setActiveMode('list')"
        class="material-icons"
      >
        view_list
      </i>
      <i
        :class="{ 'is-active': isActiveMode('grid') }"
        @click="setActiveMode('grid')"
        class="material-icons"
      >
        view_module
      </i>
    </div>
  </div>
  <div class="c-recipe-list__wrapper">
    <recipe-item
      v-for="recipe in recipes"
      :key="recipe.id"
      :grid="isActiveMode('grid')"
      :recipe="recipe"
    ></recipe-item>
  </div>
  <p
    v-if="recipes.length === 0"
    class="c-recipe-list__text"
  >
    {{ $t('grid.no-recipes') }}
  </p>
</div>
</template>

<script>
import config from '@/config'
import requester from '@/mixins/requester'
import { ADD_RECIPES, REMOVE_RECIPES } from '@/store/mutation-types'

export default {
  name: 'RecipeList',
  components: {
    RecipeItem: () => import('@/components/grid/recipe-item')
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
    user () {
      return this.$store.state.user
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
      this.mode = mode
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
        if (value.data.length < config.pageSize) {
          this.done = true
        }
      })
    },
    getRecipesMethod () {
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
@import '../../assets/styles/variables';

.c-recipe-list {
  &__row {
    margin: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 24px;
  }

  &__text {
    margin-top: 18px;
    text-align: center;
  }

  &__icons {
    display: flex;
    align-items: center;

    .material-icons {
      color: $color-gray-300;
      margin-left: 8px;
      cursor: pointer;
      user-select: none;

      &:first-child {
        margin-left: 0;
      }

      &.is-active {
        color: $color-black;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
