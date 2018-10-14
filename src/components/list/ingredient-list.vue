<template>
<div class="c-ingredient-list">
  <h1 class="c-ingredient-list__title">
    {{ $t('list.ingredients') }}
  </h1>
  <div class="c-ingredient-list__wrapper">
    <ingredient-item
      v-for="(item, index) in models.ingredients"
      :key="index"
      :item="item"
    ></ingredient-item>
  </div>
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

  &__title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>
