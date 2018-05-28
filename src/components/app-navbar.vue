<template>
<nav class="c-app-navbar">
  <router-link class="c-app-navbar__row" to="/">
    <img
      class="c-app-navbar__logo"
      src="/static/favicon.png"
    />
    <span class="c-app-navbar__brand">
      {{ $t('app') }}
    </span>
  </router-link>
  <form
    @submit.prevent="submit"
    class="c-app-navbar__search o-form"
  >
    <div class="o-form__wrapper">
      <input
        v-model="search"
        :placeholder="$t('form.search')"
        class="o-form__input"
      />
      <i
        @click="submit"
        class="o-form__icon material-icons"
      >
        search
      </i>
    </div>
  </form>
  <div class="c-app-navbar__row">
    <router-link
      to="/"
      exact
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        explore
      </i>
    </router-link>
    <router-link
      to="/favorite"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        favorite
      </i>
    </router-link>
    <router-link
      to="/profile"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        person
      </i>
    </router-link>
  </div>
</nav>
</template>

<script>
export default {
  name: 'AppNavbar',
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

.c-app-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $navbar-height;
  z-index: 1000;
  padding: 0 96px;
  box-sizing: border-box;
  border-bottom: 1px solid $color-grey-300;
  background-color: $color-white;

  &__row {
    display: flex;
    align-items: center;
  }

  &__logo {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }

  &__brand {
    font-size: 24px;
    font-family: 'Dancing Script', cursive;
    color: $color-black;
  }

  &__search {
    width: 300px;
  }

  &__item {
    color: $color-grey-300;
    margin-left: 4px;

    &:hover, &.is-active {
      color: $color-black;
    }
  }
}
</style>
