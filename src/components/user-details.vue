<template>
<div class="c-user-details">
  <image-picker
    v-model="banner"
    :disabled="!editMode"
    @file="bannerFile = $event"
    class="c-user-details__banner"
  ></image-picker>
  <div class="c-user-details__wrapper">
    <image-picker
      v-model="avatar"
      blank="/static/blank-avatar.jpg"
      :disabled="!editMode"
      @file="avatarFile = $event"
      class="c-user-details__avatar"
    ></image-picker>
    <div class="c-user-details__content">
      <div class="c-user-details__row">
        <h1 class="c-user-details__username">
          {{ user.username }}
        </h1>
        <user-buttons
          :editMode="editMode"
          @click="clickAction"
        ></user-buttons>
      </div>
      <div class="c-user-details__row">
        <span class="c-user-details__value">
          {{ user.recipes || 0 }}
        </span>
        <span class="c-user-details__label">
          {{ $t('user.recipes') }}
        </span>
        <span class="c-user-details__value">
          {{ user.followers || 0 }}
        </span>
        <span class="c-user-details__label">
          {{ $t('user.followers') }}
        </span>
        <span class="c-user-details__value">
          {{ user.followed || 0 }}
        </span>
        <span class="c-user-details__label">
          {{ $t('user.followed') }}
        </span>
      </div>
      <div
        :class="{ 'c-user-details__row--no-margin': !editMode }"
        class="c-user-details__row"
      >
        <input
          v-model="name"
          :disabled="!editMode"
          :placeholder="editMode ? $t('user.placeholder.name') : ''"
          class="o-form__input c-user-details__name"
        >
      </div>
      <div class="c-user-details__row">
        <textarea
          v-model="biography"
          :disabled="!editMode"
          :placeholder="editMode ? $t('user.placeholder.biography') : ''"
          class="o-form__textarea c-user-details__biography"
          rows="3"
          maxlength="255"
        ></textarea>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'
import details from '@/mixins/details'

export default {
  name: 'UserDetails',
  components: {
    ImagePicker: () => import('@/components/image-picker'),
    UserButtons: () => import('@/components/user-buttons')
  },
  mixins: [ base, details ],
  data () {
    return {
      avatar: null,
      avatarFile: null,
      banner: null,
      bannerFile: null,
      name: null,
      biography: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    init () {
      this.avatar = this.url(this.user.avatarId)
      this.banner = this.url(this.user.bannerId)
      this.name = this.user.name
      this.biography = this.user.biography
    },
    update () {
      let avatarId, bannerId
      this.uploadImg(this.user.avatarId, this.avatar, this.avatarFile).then(id => {
        avatarId = id
        return this.uploadImg(this.user.bannerId, this.banner, this.bannerFile)
      }).then(id => {
        bannerId = id
        return this.$api.users.modify(this.user.id, {
          avatarId: avatarId,
          bannerId: bannerId,
          name: this.name,
          biography: this.biography
        })
      }).then(() => {
        if (this.user.bannerId && this.user.bannerId !== bannerId) {
          this.$api.uploads.delete(this.user.bannerId)
        }
        if (this.user.avatarId && this.user.avatarId !== avatarId) {
          this.$api.uploads.delete(this.user.avatarId)
        }
        return this.$api.users.read(this.user.id)
      }).then(value => {
        this.$store.commit('setUser', value.data)
        this.showInfo('info.profile-update-successful')
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.c-user-details {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 0 32px;
    box-sizing: border-box;
  }

  &__avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 150px);
    box-sizing: border-box;
    padding-left: 32px;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    &--no-margin, &:last-child {
      margin-bottom: 0;
    }
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

    &:last-child {
      padding-right: 0;
    }
  }

  &__name[disabled] {
    font-weight: bold;
    border-color: transparent;
  }

  &__biography[disabled] {
    background: none;
    border-color: transparent;
  }
}
</style>
