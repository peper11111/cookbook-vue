<template>
<nav class="app-navbar">
  <router-link class="app-navbar__row" to="/">
    <img class="app-navbar__logo" src="static/favicon.png"/>
    <span class="typography__logo typography__logo--small" v-text="$t('app')"></span>
  </router-link>
  <div class="app-navbar__row">
    <router-link class="icon-button icon-button--toggle icon-button--hover" to="/" exact><i class="material-icons">explore</i></router-link>
    <router-link class="icon-button icon-button--toggle icon-button--hover" to="/favorite"><i class="material-icons">favorite</i></router-link>
    <router-link class="icon-button icon-button--toggle icon-button--hover" to="/profile"><i class="material-icons">person</i></router-link>
  </div>
</nav>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $toolbar-height;
  border-bottom: 1px solid $color-grey-300;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: $color-white;
  z-index: 1000;

  &__logo {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }

  &__row {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    align-items: center;
  }
}
</style>
