<template>
<div class="c-navbar-user">
  <div
    @click="toggleDropdown"
    class="c-navbar-user__toggle"
  >
    <span class="c-navbar-user__username">
      {{ authUser.username }}
    </span>
    <img
      class="c-navbar-user__image"
      :src="imageSrc"
    >
  </div>
  <app-dropdown
    v-if="dropdownVisible"
    @close="hideDropdown"
    @click.native="hideDropdown"
    class="c-navbar-user__dropdown"
  >
    <ul slot="body">
      <router-link
        tag="li"
        :to="`/user/${authUser.id}`"
        class="c-navbar-user__item"
      >
        {{ $t('navbar.profile') }}
      </router-link>
      <router-link
        tag="li"
        to="/new-recipe"
        class="c-navbar-user__item"
      >
        {{ $t('navbar.new-recipe') }}
      </router-link>
      <li class="c-navbar-user__separator"></li>
      <li
        @click="wrap(signOut())"
        class="c-navbar-user__item"
      >
        {{ $t('navbar.sign-out') }}
      </li>
    </ul>
  </app-dropdown>
</div>
</template>

<script>
import config from '@/config'
import requester from '@/mixins/requester'
import { SIGN_OUT } from '@/store/mutation-types'

export default {
  name: 'NavbarUser',
  components: {
    AppDropdown: () => import('@/components/app-dropdown')
  },
  mixins: [ requester ],
  data () {
    return {
      dropdownVisible: false
    }
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    imageSrc () {
      return this.$helpers.thumbnailSrc(this.authUser.avatarId) || config.blankAvatar
    }
  },
  methods: {
    toggleDropdown () {
      this.dropdownVisible = !this.dropdownVisible
    },
    hideDropdown () {
      this.dropdownVisible = false
    },
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

.c-navbar-user {
  &__toggle {
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }

  &__username {
    font-family: 'Roboto', sans-serif;
    color: $color-text;
    font-size: 14px;
  }

  &__image {
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 50%;
    margin-left: 8px;
  }

  &__dropdown {
    position: absolute;
    top: 50px;
    right: 96px;
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
