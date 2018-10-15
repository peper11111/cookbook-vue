<template>
<form
  @submit.prevent="submit"
  class="c-navbar-search o-form"
>
  <div class="o-form__wrapper">
    <input
      v-model="query"
      :placeholder="$t('form.search')"
      class="c-navbar-search__input o-form__input o-form__input--full"
    />
    <div
      @click="submit"
      class="c-navbar-search__icon o-form__icon"
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
  name: 'NavbarSearch',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    submit () {
      this.$router.push({
        path: '/search',
        query: { query: this.query }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables';

.c-navbar-search {
  width: 360px;
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
