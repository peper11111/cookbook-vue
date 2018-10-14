<template>
<div class="c-step-item">
  <span class="c-step-item__index">
    {{ `${index + 1}.` }}
  </span>
  <span class="c-step-item__label">
    {{ step }}
  </span>
</div>
</template>

<script>
export default {
  name: 'StepItem',
  props: {
    index: Number,
    step: String
  }
}
</script>

<style lang="scss">
.c-step-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &__index {
    font-weight: bold;
  }

  &__label {
    margin-left: 8px;
  }
}
</style>
