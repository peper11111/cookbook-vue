<template>
<nav class="c-app-navbar">
  <router-link
    to="/"
    class="c-app-navbar__row c-app-navbar__row--clickable"
  >
    <img
      class="c-app-navbar__logo"
      src="/static/logo-light.png"
    />
    <div class="c-app-navbar__separator"></div>
    <span class="c-app-navbar__brand">
      {{ $t('global.app') }}
    </span>
  </router-link>
  <navbar-search></navbar-search>
  <div class="c-app-navbar__row">
    <router-link
      to="/"
      exact
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        favorite
      </i>
    </router-link>
    <router-link
      to="/explore"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        explore
      </i>
    </router-link>
    <router-link
      to="/favourite"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        book
      </i>
    </router-link>
    <div class="c-app-navbar__separator"></div>
    <navbar-user></navbar-user>
  </div>
</nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  components: {
    NavbarSearch: () => import('@/components/navbar/navbar-search'),
    NavbarUser: () => import('@/components/navbar/navbar-user')
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
  min-width: 1000px;
  height: $navbar-height;
  z-index: 1000;
  padding: 0 96px;
  box-sizing: border-box;
  background-color: $color-primary;

  &__row {
    display: flex;
    align-items: center;
    text-decoration: none;

    &--clickable {
      cursor: pointer;
      user-select: none;
    }
  }

  &__logo {
    width: 32px;
    height: 32px;
  }

  &__brand {
    font-size: 28px;
    font-family: 'Dancing Script', cursive;
    color: $color-text;
    letter-spacing: 1px;
  }

  &__item {
    margin-left: 4px;
    color: $color-primary-light;
    cursor: pointer;
    user-select: none;

    &:first-child {
      margin-left: 0;
    }

    &:hover, &.is-active {
      color: $color-text;
    }
  }

  &__separator {
    width: 1px;
    height: 16px;
    margin: 0 10px;
    background-color: $color-primary-light;
    box-sizing: border-box;
  }
}
</style>
