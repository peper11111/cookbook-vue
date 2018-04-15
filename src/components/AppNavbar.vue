<template>
<nav class="app-navbar">
  <router-link class="app-navbar__logo" to="/" v-text="$t('app')"></router-link>
  <div class="app-navbar__list">
    <router-link class="app-navbar__item" to="/explore"><i class="material-icons">explore</i></router-link>
    <router-link class="app-navbar__item" to="/favorite"><i class="material-icons">favorite</i></router-link>
    <router-link class="app-navbar__item" to="/profile"><i class="material-icons">person</i></router-link>
    <router-link class="app-navbar__item" to="/settings"><i class="material-icons">settings</i></router-link>
    <a class="app-navbar__item" @click="logout"><i class="material-icons">power_settings_new</i></a>
  </div>
</nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $navbar-height;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: $color-white;
  z-index: 1000;

  &__logo {
    font-family: 'Dancing Script', cursive;
    color: $color-black;
    text-decoration: none;
    font-size: 24px;
  }

  &__list {
    display: flex;
    flex-direction: row;
  }

  &__item {
    color: $color-grey-300;
    padding: 0 4px;
    cursor: pointer;

    &:hover, &.router-link-active {
      color: $color-grey-900;
    }
  }
}
</style>
