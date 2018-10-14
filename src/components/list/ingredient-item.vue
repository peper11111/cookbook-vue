<template>
<div
  :class="{ 'c-ingredient-item--center': !previewMode }"
  class="c-ingredient-item"
>
  <i
    v-if="previewMode"
    :class="{ 'is-checked': checked && previewMode }"
    @click="checked = !checked"
    class="material-icons c-ingredient-item__icon"
  >
    {{ checked ? 'check_box' : 'check_box_outline_blank' }}
  </i>
  <i
    v-else
    @click="$emit('delete')"
    class="material-icons c-ingredient-item__remove"
  >
    remove
  </i>
  <form-input
    v-model="ingredient"
    :class="{ 'is-checked': checked && previewMode }"
    :disabled="previewMode"
    class="c-ingredient-item__label"
  ></form-input>
</div>
</template>

<script>
import modeContext from '@/mixins/detail/mode-context'

export default {
  name: 'IngredientItem',
  components: {
    FormInput: () => import('@/components/form/form-input')
  },
  mixins: [ modeContext ],
  props: {
    ingredient: String
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
    margin: 0 8px;
    flex-grow: 1;

    &.is-checked {
      color: $color-text-secondary;
      text-decoration: line-through;
    }
  }

  &__remove {
    margin-left: auto;
    cursor: pointer;

    &:hover {
      color: $color-accent;
    }
  }
}
</style>
