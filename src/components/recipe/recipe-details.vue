<template>
<div class="c-recipe-details">
  <detail-actions
    :disabled="pending"
    :mode="localMode"
    @action="onAction"
  ></detail-actions>
  <image-picker
    v-model="model.bannerId"
    blank="/static/blank-banner.jpg"
    :disabled="displayMode || previewMode"
    class="c-recipe-details__banner"
  ></image-picker>
  <div class="c-recipe-details__wrapper">
    <div class="c-recipe-details__row">
      <recipe-content
        :mode="localMode"
        :model="model"
        class="c-recipe-details__content"
      ></recipe-content>
      <recipe-info
        :mode="localMode"
        :model="model"
        class="c-recipe-details__info"
      ></recipe-info>
    </div>
  </div>
</div>
</template>

<script>
import detail from '@/mixins/detail'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipeDetails',
  components: {
    DetailActions: () => import('@/components/detail-actions'),
    ImagePicker: () => import('@/components/form/image-picker'),
    RecipeInfo: () => import('@/components/recipe/recipe-info'),
    RecipeContent: () => import('@/components/recipe/recipe-content')
  },
  mixins: [ detail ],
  data () {
    return {
      modelSrc: 'recipe',
      model: {
        bannerId: null,
        title: null,
        description: null,
        cuisineId: null,
        categoryId: null,
        difficulty: null,
        plates: null,
        preparationTime: null
      }
    }
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    }
  },
  methods: {
    modify (params) {
      return this.$api.recipes.modify(this.recipe.id, params).then(() => {
        return this.$api.recipes.read(this.recipe.id)
      }).then((value) => {
        this.$store.commit(SET_RECIPE, value.data)
        this.$notify.success('recipe-update-successful')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-recipe-details {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    padding: 32px 32px 0;
    position: relative;
  }

  &__row {
    display: flex;
    margin-bottom: 16px;
  }

  &__content {
    flex-grow: 1;
    margin-right: 32px;
  }

  &__info {
    width: 300px;
  }
}
</style>
