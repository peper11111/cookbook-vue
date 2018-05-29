<template>
<div class="c-user-dropdown">
  <div
    @click.stop="toggle"
    class="c-user-dropdown__icon"
  >
    <i class="material-icons">
      more_vert
    </i>
  </div>
  <ul
    v-if="advanced"
    :class="{ 'is-active': active }"
    class="c-user-dropdown__list"
  >
    <router-link
      tag="li"
      to="/new-recipe"
      class="c-user-dropdown__item"
    >
      {{ $t('profile.add-recipe') }}
    </router-link>
    <li class="c-user-dropdown__item">
      {{ $t('profile.edit-profile') }}
    </li>
    <li
      v-if="model.bannerId"
      @click="deleteBanner"
      class="c-user-dropdown__item"
    >
      {{ $t('profile.delete-banner') }}
    </li>
    <li
      v-if="model.avatarId"
      @click="deleteAvatar"
      class="c-user-dropdown__item"
    >
      {{ $t('profile.delete-avatar') }}
    </li>
    <hr class="c-user-dropdown__separator"/>
    <li
      @click="logout"
      class="c-user-dropdown__item"
    >
      {{ $t('profile.logout') }}
    </li>
  </ul>
  <ul
    v-else
    :class="{ 'is-active': active }"
    @click="hide"
    class="c-user-dropdown__list"
  >
    <li class="c-user-dropdown__item">
      {{ $t('profile.follow-user') }}
    </li>
  </ul>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'UserDropdown',
  mixins: [ base ],
  props: {
    advanced: Boolean,
    model: Object
  },
  data () {
    return {
      active: false
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
      this.active = !this.active
    },
    hide () {
      this.active = false
    },
    logout () {
      this.$api.auth.logout().then(() => {
        this.showInfo('info.logout-successful')
        this.$store.commit('logout')
        this.$router.push('/login')
      })
    },
    deleteBanner () {
      this.$emit('deleteBanner')
    },
    deleteAvatar () {
      this.$emit('deleteAvatar')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.c-user-dropdown {
  position: relative;

  &__icon {
    color: $text-color-primary;
    cursor: pointer;
    user-select: none;
  }

  &__list {
    position: absolute;
    left: 0;
    top: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    display: none;

    &.is-active {
      display: block;
    }
  }

  &__item {
    padding: 8px 16px;
    cursor: pointer;
    background-color: $color-primary;
    white-space: nowrap;

    &:hover {
      background-color: $color-secondary;
    }
  }

  &__separator {
    margin: 0;
    border: none;
    border-top: 1px solid $color-secondary;
  }
}
</style>
