<template>
<nav class="c-app-navbar">
  <router-link
    to="/"
    class="c-app-navbar__row"
  >
    <img
      class="c-app-navbar__logo"
      src="/static/logo-light.png"
    />
    <span class="c-app-navbar__brand">
      {{ $t('global.app') }}
    </span>
  </router-link>
  <app-search></app-search>
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
      to="/cookbook"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        book
      </i>
    </router-link>
    <div class="c-app-navbar__separator"></div>
    <app-dropdown></app-dropdown>
  </div>
</nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  components: {
    AppDropdown: () => import('@/components/app-dropdown'),
    AppSearch: () => import('@/components/app-search')
  }
}
</script>

<style lang="scss">
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.c-app-navbar {
  @include box-elevation;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 720px;
  height: $navbar-height;
  z-index: 1000;
  padding: 0 96px;
  box-sizing: border-box;
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
    font-size: 28px;
    font-family: 'Dancing Script', cursive;
    color: $color-text;
    letter-spacing: 1px;
  }

  &__item {
    margin: 0 2px;
    font-size: 0;
    color: $color-primary-light;
    cursor: pointer;
    user-select: none;

    &:hover, &.is-active {
      color: $color-text;
    }
  }

  &__separator {
    width: 1px;
    height: 16px;
    margin: 0 8px;
    background-color: $color-primary-light;
    box-sizing: border-box;
  }
}
</style>
