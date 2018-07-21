<template>
<div class="c-recipe-details">
  <div class="c-recipe-details__wrapper">
    <image-picker
      v-model="banner"
      :disabled="!editMode"
      @file="bannerFile = $event"
      class="c-recipe-details__banner"
    ></image-picker>
    <div class="c-recipe-details__info">
      <input
        v-model="title"
        :placeholder="editMode ? $t('recipe.placeholder.title') : ''"
        class="c-recipe-details__title o-form__input"
      />
      <textarea
        v-model="description"
        :disabled="!editMode"
        :placeholder="editMode ? $t('recipe.placeholder.description') : ''"
        class="o-form__textarea c-recipe-details__description"
        rows="3"
        maxlength="255"
      ></textarea>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.cuisine-type') }}
        </span>
        <select
          v-model="cuisineId"
          :placeholder="'test'"
          class="c-recipe-details__value o-form__select"
        >
          <option
            v-for="item in cuisines"
            :key="item.id"
            :value="item.id"
            :selected="cuisineId === item.id"
          >
            {{ $t(`recipe.cuisine.${item.name}`) }}
          </option>
        </select>
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.difficulty') }}
        </span>
        <rating-bar
          v-model="difficulty"
          :disabled="!editMode"
          class="c-recipe-details__value"
        ></rating-bar>
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.plates') }}
        </span>
        <input
          v-model="plates"
          class="c-recipe-details__value o-form__input"
        />
      </label>
      <label class="c-recipe-details__item">
        <span class="c-recipe-details__label">
          {{ $t('recipe.preparation-time') }}
        </span>
        <time-input
          v-model="preparationTime"
          :disabled="!editMode"
        ></time-input>
      </label>
      <div class="c-recipe-details__buttons">
        <button
          v-if="editMode"
          @click="clickAction('save')"
          class="o-button o-button__accent"
        >
          {{ $t('save')}}
        </button>
        <button
          v-if="editMode"
          @click="clickAction('cancel')"
          class="o-button o-button__primary"
        >
          {{ $t('cancel') }}
        </button>
        <button
          v-if="!editMode"
          @click="clickAction('edit')"
          class="o-button o-button__primary"
        >
          {{ $t('edit') }}
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'
import details from '@/mixins/details'

export default {
  name: 'RecipeDetails',
  components: {
    ImagePicker: () => import('@/components/image-picker'),
    RatingBar: () => import('@/components/rating-bar'),
    TimeInput: () => import('@/components/time-input')
  },
  mixins: [ base, details ],
  data () {
    return {
      editMode: true,
      banner: null,
      bannerFile: null,
      title: null,
      description: null,
      cuisineId: null,
      difficulty: null,
      plates: null,
      preparationTime: null
    }
  },
  computed: {
    cuisines () {
      return this.$store.state.cuisines
    },
    recipe () {
      return this.$store.state.recipe
    }
  },
  methods: {
    init () {
      this.banner = this.url(this.recipe.bannerId)
      this.title = this.recipe.title
      this.description = this.recipe.description
      this.cuisineId = this.recipe.cuisineId
      this.difficulty = this.recipe.difficulty
      this.plates = this.recipe.plates
      this.preparationTime = this.recipe.preparationTime
    },
    update () {
      let bannerId
      this.uploadImg(this.recipe.bannerId, this.banner, this.bannerFile).then(id => {
        bannerId = id
        return this.$api.recipes.create({
          bannerId: bannerId,
          title: this.title,
          description: this.description,
          cuisineId: this.cuisineId,
          difficulty: this.difficulty,
          plates: this.plates,
          preparationTime: this.preparationTime
        })
      }).then(value => {
        this.showInfo('info.recipe-created')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.c-recipe-details {
  &__wrapper {
    display: flex;
  }

  &__banner {
    width: 650px;
    height: 400px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    width: 350px;
    padding: 16px;
  }

  &__title {
    margin-bottom: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 40px;
  }

  &__label {
    text-align: left;
    white-space: nowrap;
    width: 140px;
  }

  &__value {
    width: 178px;
  }

  &__buttons {
    margin-top: 64px;
  }
}
</style>
