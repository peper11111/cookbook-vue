<template>
<div class="c-recipe-list">
  <div class="c-recipe-list__row">
    <h1 class="c-recipe-list__title">
      {{ $t('list.recipes') }}
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
  <div
    v-if="items.length !== 0"
    class="c-recipe-list__wrapper"
  >
    <recipe-item
      v-for="recipe in items"
      :key="recipe.id"
      :grid="isActiveMode('grid')"
      :recipe="recipe"
    ></recipe-item>
  </div>
  <p
    v-else
    class="c-recipe-list__text"
  >
    {{ $t('list.no-recipes') }}
  </p>
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
    type: String
  },
  data () {
    return {
      mode: 'grid'
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    isActiveMode (mode) {
      return this.mode === mode
    },
    setActiveMode (mode) {
      this.mode = mode
    },
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
