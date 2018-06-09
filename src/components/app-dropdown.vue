<template>
<div class="c-app-dropdown">
  <div
    @click.stop="toggle"
    class="c-app-dropdown__toggle"
  >
    {{ currentUser.username }}
  </div>
  <ul
    :class="{ 'is-visible': visible }"
    class="c-app-dropdown__list"
  >
    <router-link
      tag="li"
      :to="`/user/${currentUser.id}`"
      class="c-app-dropdown__item"
    >
      {{ $t('navbar.profile') }}
    </router-link>
    <router-link
      tag="li"
      to="/new-recipe"
      class="c-app-dropdown__item"
    >
      {{ $t('navbar.new-recipe') }}
    </router-link>
    <li class="c-app-dropdown__separator"></li>
    <li
      @click="logout"
      class="c-app-dropdown__item"
    >
      {{ $t('navbar.logout') }}
    </li>
  </ul>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'AppDropdown',
  mixins: [ base ],
  data () {
    return {
      visible: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  mounted () {
    window.addEventListener('click', this.hide)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.hide)
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
    hide () {
      this.visible = false
    },
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
@import '../assets/styles/mixins';
@import '../assets/styles/variables';

.c-app-dropdown {
  position: relative;
  margin: 0 2px;

  &__toggle {
    font-size: 14px;
    color: $color-text;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    user-select: none;
  }

  &__list {
    @include box-elevation;
    background-color: $color-white;
    border-radius: 2px;
    position: absolute;
    top: 28px;
    right: 0;
    display: none;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: -10px;
      right: 10px;

      border: 5px solid transparent;
      border-bottom-color: $color-white;
      box-sizing: border-box;
    }

    &.is-visible {
      display: block;
    }
  }

  &__item {
    padding: 8px 16px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      background-color: $color-primary-light;
    }

    &:first-child {
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
    }

    &:last-child {
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  &__separator {
    height: 1px;
    width: 100%;
    background-color: $color-divider;
    box-sizing: border-box;
  }
}
</style>
