<template>
<div
  :class="{ 'c-step-item--center': !disabled }"
  class="c-step-item"
>
  <span
    v-if="disabled"
    class="c-step-item__index"
  >
    {{ `${index + 1}.` }}
  </span>
  <i
    v-else
    @click="$emit('delete', index)"
    class="material-icons c-step-item__remove"
  >
    remove
  </i>
  <form-input
    :disabled="disabled"
    :value="step"
    @input="$emit('input', index, $event)"
    class="c-step-item__label"
  ></form-input>
</div>
</template>

<script>
export default {
  name: 'StepItem',
  components: {
    FormInput: () => import('@/components/form/form-input')
  },
  props: {
    index: Number,
    step: String,
    disabled: Boolean
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables";

.c-step-item {
  display: flex;
  margin-bottom: 8px;
  line-height: 24px;

  &--center {
    align-items: center;
  }

  &__index {
    font-weight: bold;
  }

  &__label {
    margin-left: 8px;
    flex-grow: 1;
  }

  &__remove {
    cursor: pointer;

    &:hover {
      color: $color-accent;
    }
  }
}
</style>
