<template>
<div
  :class="{ 'c-ingredient-item--center': !disabled }"
  class="c-ingredient-item"
>
  <i
    v-if="disabled"
    :class="{ 'is-checked': checked && disabled }"
    @click="checked = !checked"
    class="material-icons c-ingredient-item__icon"
  >
    {{ checked ? 'check_box' : 'check_box_outline_blank' }}
  </i>
  <i
    v-else
    @click="$emit('delete', index)"
    class="material-icons c-ingredient-item__remove"
  >
    remove
  </i>
  <form-input
    :class="{ 'is-checked': checked && disabled }"
    :disabled="disabled"
    :value="ingredient"
    @input="$emit('input', index, $event)"
    class="c-ingredient-item__label"
  ></form-input>
</div>
</template>

<script>
export default {
  name: 'IngredientItem',
  components: {
    FormInput: () => import('@/components/form/form-input')
  },
  props: {
    disabled: Boolean,
    ingredient: String,
    index: Number
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
  margin-bottom: 8px;
  line-height: 24px;

  &--center {
    align-items: center;
  }

  &__icon {
    cursor: pointer;

    &.is-checked {
      color: $color-accent;
    }
  }

  &__label {
    margin-left: 8px;
    flex-grow: 1;

    &.is-checked {
      color: $color-text-secondary;
      text-decoration: line-through;
    }
  }

  &__remove {
    cursor: pointer;

    &:hover {
      color: $color-accent;
    }
  }
}
</style>
