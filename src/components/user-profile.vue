<template>
<div class="c-user-profile">
  <image-uploader
    :advanced="currentUserProfile"
    :model="model.bannerId ? url(model.bannerId) : '/static/blank-banner.jpg'"
    @imageUpload="updateBanner"
    class="c-user-profile__banner"
  ></image-uploader>
  <div class="c-user-profile__wrapper">
    <image-uploader
      :advanced="currentUserProfile"
      :model="model.avatarId ? url(model.avatarId) : '/static/blank-avatar.jpg'"
      @imageUpload="updateAvatar"
      class="c-user-profile__avatar"
    ></image-uploader>
    <div class="c-user-profile__content">
      <div class="c-user-profile__row">
        <h1 class="c-user-profile__name">
          {{ model.name }}
        </h1>
        <user-dropdown
          :advanced="currentUserProfile"
          :model="model"
          @avatarDelete="deleteAvatar"
          @bannerDelete="deleteBanner"
        ></user-dropdown>
      </div>
      <div class="c-user-profile__row">
        <span class="c-user-profile__value">
          {{ model.recipes || 0 }}
        </span>
        <span class="c-user-profile__label">
          {{ $t('profile.recipes') }}
        </span>
        <span class="c-user-profile__value">
          {{ model.followers || 0 }}
        </span>
        <span class="c-user-profile__label">
          {{ $t('profile.followers') }}
        </span>
        <span class="c-user-profile__value">
          {{ model.following || 0 }}
        </span>
        <span class="c-user-profile__label">
          {{ $t('profile.following') }}
        </span>
      </div>
      <div class="c-user-profile__row">
        <p class="c-user-profile__description">
          {{ model.description }}
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '@/mixins/base'

export default {
  name: 'UserProfile',
  components: {
    ImageUploader: () => import('@/components/image-uploader'),
    UserDropdown: () => import('@/components/user-dropdown')
  },
  mixins: [ base ],
  props: {
    id: Number,
    model: Object
  },
  computed: {
    currentUserProfile () {
      return this.$store.state.currentUser.id === this.id
    }
  },
  methods: {
    updateBanner (bannerId) {
      const userDetails = { ...this.model, bannerId }
      this.$emit('profileUpdate', userDetails, 'info.banner-update-successful')
    },
    updateAvatar (avatarId) {
      const userDetails = { ...this.model, avatarId }
      this.$emit('profileUpdate', userDetails, 'info.avatar-update-successful')
    },
    deleteAvatar () {
      const userDetails = { ...this.model, avatarId: null }
      this.$emit('profileUpdate', userDetails, 'info.avatar-delete-successful')
    },
    deleteBanner () {
      const userDetails = { ...this.model, bannerId: null }
      this.$emit('profileUpdate', userDetails, 'info.banner-delete-successful')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.c-user-profile {
  &__banner {
    width: 100%;
    height: 300px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 32px;
    box-sizing: border-box;
  }

  &__avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    transform: translate(0, -50%);
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: calc(100% - 150px);
    box-sizing: border-box;
    padding: 32px 0 32px 32px;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__name {
    font-size: 24px;
    margin-right: 8px;
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

  &__description {
    text-align: justify;
  }
}
</style>
