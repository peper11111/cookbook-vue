<template>
<div class="c-ingredient-list">
  <ingredient-item
    v-for="(ingredient, index) in ingredients"
    :key="index"
    :ingredient="ingredient"
    :index="index"
    :mode="mode"
    @delete="deleteIngredient"
    @input="modifyIngredient"
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
  model: {
    prop: 'ingredients'
  },
  props: {
    ingredients: Array
  },
  methods: {
    addIngredient () {
      const ingredients = this.ingredients.slice(0)
      ingredients.push('')
      this.$emit('input', ingredients)
    },
    deleteIngredient (index) {
      const ingredients = this.ingredients.slice(0)
      ingredients.splice(index, 1)
      this.$emit('input', ingredients)
    },
    modifyIngredient (index, content) {
      const ingredients = this.ingredients.slice(0)
      ingredients[index] = content
      this.$emit('input', ingredients)
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
