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
      to="/new-recipe"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        note_add
      </i>
    </router-link>
    <router-link
      :to="`/user/${currentUser.id}`"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        person
      </i>
    </router-link>
    <div class="c-app-navbar__separator"></div>
    <div
      @click="logout"
      class="c-app-navbar__item"
    >
      <i class="material-icons">
        exit_to_app
      </i>
    </div>
  </div>
</nav>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'AppNavbar',
  components: {
    AppSearch: () => import('@/components/app-search')
  },
  mixins: [ base ],
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    logout () {
      this.$api.auth.logout().then(() => {
        this.showInfo('info.logout-successful')
        this.$store.commit('logout')
        this.$router.push('/login')
      })
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

  &__item {
    margin: 0 2px;
    font-size: 0;
    color: $color-secondary;
    cursor: pointer;
    user-select: none;

    &:hover, &.is-active {
      color: $text-color-primary;
    }
  }

  &__separator {
    width: 1px;
    height: 16px;
    margin: 0 8px;
    background-color: $color-secondary;
  }
}
</style>
