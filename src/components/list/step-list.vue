<template>
<div class="c-step-list">
  <step-item
    v-for="(step, index) in models.steps"
    :index="index"
    :key="index"
    :step="step"
  ></step-item>
</div>
</template>

<script>
export default {
  name: 'StepList',
  components: {
    StepItem: () => import('@/components/list/step-item')
  },
  props: {
    models: Object
  }
}
</script>

<style lang="scss">
.c-step-list {
  display: flex;
  flex-direction: column;
}
</style>
