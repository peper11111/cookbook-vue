<template>
<div class="c-recipe-buttons">
  <div class="c-recipe-buttons__icons">
    <i
      :class="{ 'is-active': isActiveLayout('list') }"
      @click="setActiveLayout('list')"
      class="material-icons"
    >
      view_list
    </i>
    <i
      :class="{ 'is-active': isActiveLayout('grid') }"
      @click="setActiveLayout('grid')"
      class="material-icons"
    >
      view_module
    </i>
  </div>
</div>
</template>

<script>
export default {
  name: 'RecipeButtons',
  model: {
    prop: 'layout'
  },
  props: {
    layout: String
  },
  methods: {
    isActiveLayout (layout) {
      return this.layout === layout
    },
    setActiveLayout (layout) {
      this.$emit('input', layout)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables";

.c-recipe-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;

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
