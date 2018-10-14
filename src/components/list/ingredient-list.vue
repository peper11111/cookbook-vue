<template>
<div class="c-ingredient-list">
  <ingredient-item
    v-for="(item, index) in models.ingredients"
    :key="index"
    :item="item"
  ></ingredient-item>
</div>
</template>

<script>
import modeContext from '@/mixins/detail/mode-context'

export default {
  name: 'IngredientList',
  components: {
    IngredientItem: () => import('@/components/list/ingredient-item')
  },
  mixins: [ modeContext ],
  props: {
    models: Object
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.c-ingredient-list {
  display: flex;
  flex-direction: column;
}
</style>
