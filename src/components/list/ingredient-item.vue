<template>
<div class="c-ingredient-item">
  <i
    :class="{ 'is-checked': checked }"
    @click="checked = !checked"
    class="material-icons c-ingredient-item__icon"
  >
    {{ checked ? 'check_box' : 'check_box_outline_blank' }}
  </i>
  <span
    :class="{ 'is-checked': checked }"
    class="c-ingredient-item__label"
  >
    {{ item }}
  </span>
</div>
</template>

<script>
export default {
  name: 'IngredientItem',
  props: {
    item: String
  },
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables";

.c-ingredient-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &__icon {
    cursor: pointer;
    color: $color-text-primary;

    &.is-checked {
      color: $color-accent;
    }
  }

  &__label {
    margin-left: 8px;
    color: $color-text-primary;

    &.is-checked {
      color: $color-gray-400;
      text-decoration: line-through;
    }
  }
}
</style>
