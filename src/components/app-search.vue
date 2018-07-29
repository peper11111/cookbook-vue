<template>
<form
  @submit.prevent="submit"
  class="c-app-search o-form"
>
  <div class="o-form__wrapper">
    <input
      v-model="search"
      :placeholder="$t('form.search')"
      class="c-app-search__input o-form__input"
    />
    <div
      @click="submit"
      class="c-app-search__icon o-form__icon"
    >
      <i class="material-icons">
        search
      </i>
    </div>
  </div>
</form>
</template>

<script>
export default {
  name: 'AppSearch',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    submit () {
      console.log(this.search)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.c-app-search {
  width: 300px;
  margin: 0 16px;
  box-sizing: border-box;

  &__input {
    color: $color-text;

    &:focus {
      border-bottom-color: $color-text;
    }

    &::placeholder {
      color: $color-primary-light;
    }
  }

  &__icon {
    color: $color-text;
  }
}
</style>
