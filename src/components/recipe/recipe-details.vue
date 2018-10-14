<template>
<div class="c-recipe-details">
  <detail-actions
    :disabled="pending"
    :mode="localMode"
    :permissions="recipe.permissions"
    @action="onAction"
  ></detail-actions>
  <image-picker
    v-model="model.bannerId"
    :blank="blankBanner"
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
    <div class="o-page__separator"></div>
    <div class="c-recipe-details__row">
      <ingredient-list
        :mode="localMode"
        :model="model"
      ></ingredient-list>
    </div>
  </div>
</div>
</template>

<script>
import config from '@/config'
import detail from '@/mixins/detail'
import { SET_RECIPE } from '@/store/mutation-types'

export default {
  name: 'RecipeDetails',
  components: {
    DetailActions: () => import('@/components/detail-actions'),
    ImagePicker: () => import('@/components/form/image-picker'),
    IngredientList: () => import('@/components/list/ingredient-list'),
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
        preparationTime: null,
        ingredients: null
      }
    }
  },
  computed: {
    recipe () {
      return this.$store.state.recipe
    },
    blankBanner () {
      return config.blankBanner
    }
  },
  methods: {
    create (params) {
      // TODO Temporary solution until ingredients and steps creation is done
      return this.$api.recipes.create({
        ...params,
        ingredients: [ 'składnik' ],
        steps: [ 'krok' ]
      }).then((value) => {
        this.$notify.success('recipe-create-successful')
        this.$router.push(`/recipe/${value.data}`)
      })
    },
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
    margin-top: 32px;
    position: relative;
  }

  &__row {
    display: flex;
    padding: 0 32px;
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
