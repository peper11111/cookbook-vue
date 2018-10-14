<template>
<div
  :class="{ 'c-step-item--center': !previewMode }"
  class="c-step-item"
>
  <span
    v-if="previewMode"
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
    :disabled="previewMode"
    :value="step"
    @input="$emit('input', index, $event)"
    class="c-step-item__label"
  ></form-input>
</div>
</template>

<script>
import modeContext from '@/mixins/detail/mode-context'

export default {
  name: 'StepItem',
  components: {
    FormInput: () => import('@/components/form/form-input')
  },
  mixins: [ modeContext ],
  props: {
    index: Number,
    step: String
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
