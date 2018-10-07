<template>
<ul class="c-navbar-dropdown">
  <router-link
    tag="li"
    :to="`/user/${authUser.id}`"
    class="c-navbar-dropdown__item"
  >
    {{ $t('navbar.profile') }}
  </router-link>
  <router-link
    tag="li"
    to="/new-recipe"
    class="c-navbar-dropdown__item"
  >
    {{ $t('navbar.new-recipe') }}
  </router-link>
  <li class="c-navbar-dropdown__separator"></li>
  <li
    @click="wrap(signOut)"
    class="c-navbar-dropdown__item"
  >
    {{ $t('navbar.sign-out') }}
  </li>
</ul>
</template>

<script>
import requester from '@/mixins/requester'
import { SIGN_OUT } from '@/store/mutation-types'

export default {
  name: 'NavbarDropdown',
  mixins: [ requester ],
  computed: {
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
    signOut () {
      return this.$api.auth.logout().then(() => {
        this.$store.commit(SIGN_OUT)
        this.$notify.success('sign-out-successful')
        this.$router.push('/sign-in')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/mixins';
@import '../../assets/styles/variables';

.c-navbar-dropdown {
  @include box-elevation;
  background-color: $color-white;
  border-radius: 2px;

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
