<template>
<div class="c-step-list">
  <step-item
    v-for="(step, index) in steps"
    :key="index"
    :step="step"
    :index="index"
    :mode="mode"
  ></step-item>
</div>
</template>

<script>
import modeContext from '@/mixins/detail/mode-context'

export default {
  name: 'StepList',
  components: {
    StepItem: () => import('@/components/list/step-item')
  },
  mixins: [ modeContext ],
  model: {
    prop: 'steps'
  },
  props: {
    steps: Array
  }
}
</script>

<style lang="scss">
.c-step-list {
  display: flex;
  flex-direction: column;
}
</style>
