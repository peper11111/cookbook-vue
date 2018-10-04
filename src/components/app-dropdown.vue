<template>
<div class="c-app-dropdown">
  <div
    @click.stop="toggle"
    class="c-app-dropdown__toggle"
  >
    {{ authUser.username }}
    <img
      class="c-app-dropdown__avatar"
      :src="avatarSrc"
    >
  </div>
  <ul
    :class="{ 'is-visible': visible }"
    class="c-app-dropdown__list"
  >
    <router-link
      tag="li"
      :to="`/user/${authUser.id}`"
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
      @click="signOut"
      class="c-app-dropdown__item"
    >
      {{ $t('navbar.sign-out') }}
    </li>
  </ul>
</div>
</template>

<script>
import base from '@/mixins/base'
import { SIGN_OUT } from '@/store/mutation-types'

export default {
  name: 'AppDropdown',
  mixins: [ base ],
  data () {
    return {
      visible: false
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
    signOut () {
      this.$api.auth.logout().then(() => {
        this.$store.commit(SIGN_OUT)
        this.$notify.success('sign-out-successful')
        this.$router.push('/sign-in')
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

  &__toggle {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: $color-text;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    user-select: none;
  }

  &__avatar {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 50%;
    margin-left: 8px;
  }

  &__list {
    @include box-elevation;
    background-color: $color-white;
    border-radius: 2px;
    position: absolute;
    top: 38px;
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
