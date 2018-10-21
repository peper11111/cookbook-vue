<template>
<div class="c-step-list">
  <step-item
    v-for="(step, index) in steps"
    :key="index"
    :step="step"
    :index="index"
    :disabled="disabled"
    @delete="deleteStep"
    @input="modifyStep"
  ></step-item>
  <div
    v-if="!disabled"
    @click="addStep"
    class="c-step-list__add"
  >
    <i class="material-icons">
      add
    </i>
    <span class="c-step-list__text">
      {{ $t('list.add-step') }}
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'StepList',
  components: {
    StepItem: () => import('@/components/list/step-item')
  },
  model: {
    prop: 'steps'
  },
  props: {
    disabled: Boolean,
    steps: Array
  },
  methods: {
    addStep () {
      const steps = this.steps.slice(0)
      steps.push('')
      this.$emit('input', steps)
    },
    deleteStep (index) {
      const steps = this.steps.slice(0)
      steps.splice(index, 1)
      this.$emit('input', steps)
    },
    modifyStep (index, content) {
      const steps = this.steps.slice(0)
      steps[index] = content
      this.$emit('input', steps)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.c-step-list {
  display: flex;
  flex-direction: column;

  &__add {
    display: flex;
    line-height: 24px;
    cursor: pointer;
    color: $color-text-secondary;

    &:hover {
      color: $color-accent;
    }
  }

  &__text {
    margin-left: 8px;
  }
}
</style>
