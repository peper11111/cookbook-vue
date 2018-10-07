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
    <div
      @click.stop="toggleDropdown"
      class="c-app-navbar__row c-app-navbar__row--clickable"
    >
      <span class="c-app-navbar__username">
      {{ authUser.username }}
      </span>
      <img
        class="c-app-navbar__avatar"
        :src="avatarSrc"
      >
    </div>
  </div>
  <navbar-dropdown
    v-if="dropdownVisible"
    class="c-app-navbar__dropdown"
  ></navbar-dropdown>
</nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  components: {
    NavbarSearch: () => import('@/components/navbar/navbar-search'),
    NavbarDropdown: () => import('@/components/navbar/navbar-dropdown')
  },
  data () {
    return {
      dropdownVisible: false
    }
  },
  computed: {
    avatarSrc () {
      return this.$helpers.thumbnailSrc(this.authUser.avatarId) || '/static/blank-avatar.jpg'
    },
    authUser () {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    window.addEventListener('click', this.hideDropdown)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.hideDropdown)
  },
  methods: {
    toggleDropdown () {
      this.dropdownVisible = !this.dropdownVisible
    },
    hideDropdown () {
      this.dropdownVisible = false
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

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

  &__avatar {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 50%;
    margin-left: 8px;
  }

  &__username {
    font-family: 'Roboto', sans-serif;
    color: $color-text;
    font-size: 14px;
  }

  &__dropdown {
    position: absolute;
    top: 50px;
    right: 96px;
  }
}
</style>
