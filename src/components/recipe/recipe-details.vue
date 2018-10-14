<template>
<div class="c-recipe-details">
  <detail-actions
    :disabled="pending"
    :mode="mode"
    :canEdit="isAuthor"
    :canDelete="isAuthor"
    @action="onAction"
  ></detail-actions>
  <image-picker
    v-model="models.bannerId"
    :blank="blankBanner"
    :disabled="previewMode"
    class="c-recipe-details__banner"
  ></image-picker>
  <div class="c-recipe-details__wrapper">
    <div class="c-recipe-details__row">
      <recipe-content
        :mode="mode"
        :models="models"
        class="c-recipe-details__content"
      ></recipe-content>
      <recipe-info
        :mode="mode"
        :models="models"
        class="c-recipe-details__info"
      ></recipe-info>
    </div>
    <div class="o-page__separator"></div>
    <div class="c-recipe-details__row">
      <div class="c-recipe-details__content">
        <h1 class="c-recipe-details__title">
          {{ $t('recipe.steps') }}
        </h1>
        <step-list
          v-model="models.steps"
          :mode="mode"
        ></step-list>
      </div>
      <div class="c-recipe-details__info">
        <h1 class="c-recipe-details__title">
          {{ $t('recipe.ingredients') }}
        </h1>
        <ingredient-list
          v-model="models.ingredients"
          :mode="mode"
        ></ingredient-list>
      </div>
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
    RecipeContent: () => import('@/components/recipe/recipe-content'),
    StepList: () => import('@/components/list/step-list')
  },
  mixins: [ detail ],
  data () {
    return {
      models: {
        bannerId: null,
        title: null,
        description: null,
        cuisineId: null,
        categoryId: null,
        difficulty: null,
        plates: null,
        preparationTime: null,
        ingredients: null,
        steps: null
      }
    }
  },
  computed: {
    model () {
      return this.recipe
    },
    authUser () {
      return this.$store.state.auth.user
    },
    recipe () {
      return this.$store.state.recipe
    },
    blankBanner () {
      return config.blankBanner
    },
    isAuthor () {
      return this.recipe.author.id === this.authUser.id
    }
  },
  methods: {
    create (params) {
      this.removeEmptyValues(params)
      return this.$api.recipes.create(params).then((value) => {
        this.$notify.success('recipe-create-successful')
        this.$router.push(`/recipe/${value.data}`)
      })
    },
    modify (params) {
      this.removeEmptyValues(params)
      return this.$api.recipes.modify(this.recipe.id, params).then(() => {
        return this.$api.recipes.read(this.recipe.id)
      }).then((value) => {
        this.$store.commit(SET_RECIPE, value.data)
        this.$notify.success('recipe-update-successful')
      })
    },
    delete () {
      if (!confirm(this.$t('recipe.recipe-delete'))) {
        return Promise.resolve()
      }
      return this.$api.recipes.delete(this.recipe.id).then(() => {
        this.$notify.success('recipe-delete-successful')
        this.$router.push(`/user/${this.recipe.author.id}`)
      })
    },
    removeEmptyValues (params) {
      params.ingredients = params.ingredients.filter((ingredient) => ingredient !== '')
      params.steps = params.steps.filter((step) => step !== '')
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
    flex-shrink: 0;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 16px;
  }
}
</style>
