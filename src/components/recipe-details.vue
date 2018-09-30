<template>
<div class="c-recipe-details">
  <image-picker
    v-model="banner"
    :disabled="!editMode"
    @file="bannerFile = $event"
    class="c-recipe-details__banner"
  ></image-picker>
  <div class="c-recipe-details__wrapper">
    <input
      v-if="editMode"
      v-model="title"
      :placeholder="$t('recipe.placeholder.title')"
      class="o-form__input"
    />
    <h1
      v-if="!editMode"
      class="c-recipe-details__title"
    >
      {{ title }}
    </h1>
    <textarea
      v-if="editMode"
      v-model="lead"
      :placeholder="$t('recipe.placeholder.lead')"
      class="o-form__textarea"
      rows="3"
      maxlength="255"
    ></textarea>
    <p
      v-if="!editMode"
      class="c-recipe-details__lead"
    >
      {{ lead }}
    </p>
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
        @click="update()"
        class="o-button o-button__accent"
      >
        {{ $t('save')}}
      </button>
      <button
        v-if="editMode"
        @click="init()"
        class="o-button o-button__primary"
      >
        {{ $t('cancel') }}
      </button>
      <button
        v-if="!editMode"
        @click="editMode = true"
        class="o-button o-button__primary"
      >
        {{ $t('edit') }}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'RecipeDetails',
  components: {
    ImagePicker: () => import('@/components/form-elements/image-picker'),
    RatingBar: () => import('@/components/form-elements/rating-bar'),
    TimeInput: () => import('@/components/form-elements/time-input')
  },
  mixins: [ base ],
  data () {
    return {
      editMode: false,
      banner: null,
      bannerFile: null,
      title: null,
      lead: null,
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
  created () {
    this.init()
  },
  methods: {
    init () {
      this.banner = this.url(this.recipe.bannerId)
      this.title = this.recipe.title
      this.lead = this.recipe.lead
      this.cuisineId = this.recipe.cuisineId
      this.difficulty = this.recipe.difficulty
      this.plates = this.recipe.plates
      this.preparationTime = this.recipe.preparationTime
      this.editMode = false
    },
    update () {
      let bannerId
      this.uploadImg(this.recipe.bannerId, this.banner, this.bannerFile).then((id) => {
        bannerId = id
        return this.$api.recipes.create({
          bannerId: bannerId,
          title: this.title,
          lead: this.lead,
          cuisineId: this.cuisineId,
          difficulty: this.difficulty,
          plates: this.plates,
          preparationTime: this.preparationTime
        })
      }).then((value) => {
        // TODO Finish recipe creation
        this.showInfo('info.recipe-created')
        this.editMode = false
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.c-recipe-details {
  display: flex;

  &__banner {
    width: 650px;
    height: 400px;
  }

  &__wrapper {
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
