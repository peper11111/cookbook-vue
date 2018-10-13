<template>
<div class="c-user-recipes">
  <div class="c-user-recipes__row">
    <h1 class="c-user-recipes__title">
      {{ $t('list.recipes') }}
    </h1>
    <div class="c-user-recipes__icons">
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
  <recipe-list
    :mode="mode"
    :userId="user.id"
    type="user-recipes"
  ></recipe-list>
</div>
</template>

<script>
export default {
  name: 'UserRecipes',
  components: {
    RecipeList: () => import('@/components/list/recipe-list')
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
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.c-user-recipes {
  &__row {
    margin: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 24px;
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
}
</style>
