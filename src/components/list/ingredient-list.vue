<template>
<div class="c-ingredient-list">
  <ingredient-item
    v-for="(ingredient, index) in value"
    :key="index"
    :ingredient="ingredient"
    :mode="mode"
    @delete="deleteIngredient(index)"
  ></ingredient-item>
  <div
    v-if="!previewMode"
    @click="addIngredient"
    class="c-ingredient-list__add"
  >
    <i class="material-icons">
      add
    </i>
    <span class="c-ingredient-list__text">
      {{ $t('list.add-ingredient') }}
    </span>
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
    value: Array
  },
  methods: {
    addIngredient () {
      this.$emit('input', [...this.value, ''])
    },
    deleteIngredient (index) {
      this.$emit('input', this.value.filter((ingredient, idx) => idx !== index))
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.c-ingredient-list {
  display: flex;
  flex-direction: column;

  &__add {
    display: flex;
    line-height: 24px;
    cursor: pointer;

    &:hover {
      color: $color-accent;
    }
  }

  &__text {
    margin-left: 8px;
  }
}
</style>
