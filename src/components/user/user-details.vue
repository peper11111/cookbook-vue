<template>
<div class="c-user-details">
  <image-picker
    v-model="bannerId"
    blank="/static/blank-banner.jpg"
    :disabled="!editMode"
    class="c-user-details__banner"
  ></image-picker>
  <div class="c-user-details__wrapper">
    <image-picker
      v-model="avatarId"
      blank="/static/blank-avatar.jpg"
      :disabled="!editMode"
      class="c-user-details__avatar"
    ></image-picker>
    <div class="c-user-details__content">
      <div class="c-user-details__row">
        <h1 class="c-user-details__username">
          {{ user.username }}
        </h1>
        <detail-actions
          :canEdit="canEdit"
          :disabled="pending"
          :editMode="editMode"
          @click="handleAction"
        ></detail-actions>
        <button
          v-if="!canEdit"
          :class="{ 'o-button__primary': user.isFollowed, 'o-button__accent': !user.isFollowed, 'is-disabled': pending }"
          @click="wrap(follow)"
          class="o-button"
        >
          {{ user.isFollowed ? $t('user.unfollow') : $t('user.follow') }}
        </button>
      </div>
      <user-summary class="c-user-details__row"></user-summary>
      <form-input
        v-model="name"
        :disabled="!editMode"
        :placeholder="$t('user.placeholder.name')"
        class="c-user-details__row"
      ></form-input>
      <form-textarea
        v-model="biography"
        :disabled="!editMode"
        :placeholder="$t('user.placeholder.biography')"
        :maxlength="255"
        :rows="3"
        class="c-user-details__row"
      ></form-textarea>
    </div>
  </div>
</div>
</template>

<script>
import detail from '@/mixins/detail'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserDetails',
  components: {
    DetailActions: () => import('@/components/detail-actions'),
    FormInput: () => import('@/components/form/form-input'),
    FormTextarea: () => import('@/components/form/form-textarea'),
    ImagePicker: () => import('@/components/form/image-picker'),
    UserSummary: () => import('@/components/user/user-summary')
  },
  mixins: [ detail ],
  data () {
    return {
      avatarId: null,
      bannerId: null,
      name: null,
      biography: null
    }
  },
  computed: {
    canEdit () {
      return this.authUser.id === this.user.id
    },
    authUser () {
      return this.$store.state.auth.user
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    init () {
      this.avatarId = this.user.avatarId
      this.bannerId = this.user.bannerId
      this.name = this.user.name
      this.biography = this.user.biography
    },
    save () {
      const params = this.getParams()
      return this.$api.users.modify(this.user.id, params).then(() => {
        return this.$api.users.read(this.user.id)
      }).then((value) => {
        this.$store.commit(SET_USER, value.data)
        return this.authUser.id === this.user.id
          ? this.$helpers.fetchCurrentUser()
          : Promise.resolve()
      }).then(() => {
        this.$notify.success('profile-update-successful')
      })
    },
    getParams () {
      const params = {}

      if (this.avatarId !== this.user.avatarId) {
        params.avatarId = this.avatarId
      }
      if (this.bannerId !== this.user.bannerId) {
        params.bannerId = this.bannerId
      }
      if (this.name !== this.user.name) {
        params.name = this.name
      }
      if (this.biography !== this.user.biography) {
        params.biography = this.biography
      }

      return params
    },
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
@import '../../assets/styles/variables';

.c-user-details {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 16px;
    box-sizing: border-box;
  }

  &__avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 200px);
    box-sizing: border-box;
    padding-left: 32px;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__username {
    margin-right: 8px;
    font-size: 24px;
  }
}
</style>
