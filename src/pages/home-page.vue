<template>
<div class="o-page">
  <div class="o-page__wrapper">
    <div class="c-home-page__row">
      <div class="c-home-page__icons">
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
      type="recipes"
    ></recipe-list>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    RecipeList: () => import('@/components/list/recipe-list')
  },
  data () {
    return {
      mode: 'list'
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
@import "../assets/styles/variables";

.c-home-page {
  &__row {
    margin: 16px 16px 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
