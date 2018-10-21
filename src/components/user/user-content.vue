<template>
<div class="c-user-content">
  <div class="c-user-content__row">
    <h1 class="c-user-content__username">
      {{ user.username }}
    </h1>
    <button
      v-if="canPerformAction"
      :class="{ 'o-button__primary': user.isFollowed, 'o-button__accent': !user.isFollowed, 'is-disabled': pending }"
      @click="wrap(follow())"
      class="o-button"
    >
      {{ user.isFollowed ? $t('user.unfollow') : $t('user.follow') }}
    </button>
  </div>
  <div class="c-user-content__row">
    <span class="c-user-content__value">
      {{ user.recipesCount || 0 }}
    </span>
    <span class="c-user-content__label">
      {{ $t('user.recipes') }}
    </span>
    <span class="c-user-content__value">
      {{ user.followersCount || 0 }}
    </span>
    <span class="c-user-content__label">
      {{ $t('user.followers') }}
    </span>
    <span class="c-user-content__value">
      {{ user.followedCount || 0 }}
    </span>
    <span class="c-user-content__label">
      {{ $t('user.followed') }}
    </span>
  </div>
  <form-input
    v-model="models.name"
    :disabled="previewMode"
    :placeholder="$t('user.placeholder.name')"
    class="c-user-content__row c-user-content__name"
  ></form-input>
  <form-textarea
    v-model="models.biography"
    :disabled="previewMode"
    :placeholder="$t('user.placeholder.biography')"
    class="c-user-content__row"
  ></form-textarea>
</div>
</template>

<script>
import requester from '@/mixins/requester'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserContent',
  components: {
    FormInput: () => import('@/components/form/form-input'),
    FormTextarea: () => import('@/components/form/form-textarea')
  },
  mixins: [ requester ],
  props: {
    models: Object,
    previewMode: Boolean
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    user () {
      return this.$store.state.user
    },
    canPerformAction () {
      return this.previewMode && this.authUser.id !== this.user.id
    }
  },
  methods: {
    follow () {
      return this.$api.users.follow(this.user.id).then(() => {
        return this.$api.users.read(this.user.id)
      }).then((value) => {
        this.$store.commit(SET_USER, value.data)
        this.$notify.info(this.user.isFollowed ? 'user-follow' : 'user-unfollow')
      })
    }
  }
}
</script>

<style lang="scss">
.c-user-content {
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  &__username {
    margin-right: 8px;
    font-size: 24px;
  }

  &__value {
    font-weight: bold;
  }

  &__label {
    padding: 0 32px 0 4px;
  }

  &__name {
    font-weight: bold;
  }
}
</style>
