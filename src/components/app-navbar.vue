<template>
<nav class="c-app-navbar">
  <router-link
    to="/"
    class="c-app-navbar__row"
  >
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
      <div
        @click="submit"
        class="o-form__icon"
      >
        <i class="material-icons">
          search
        </i>
      </div>
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
  border-bottom: 1px solid $color-secondary;
  background-color: $color-primary;

  &__row {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &__logo {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }

  &__brand {
    font-size: 24px;
    font-family: 'Dancing Script', cursive;
    color: $text-color-primary;
  }

  &__search {
    width: 300px;
  }

  &__item {
    color: $color-secondary;
    margin-left: 4px;

    &:hover, &.is-active {
      color: $text-color-primary;
    }
  }
}
</style>
