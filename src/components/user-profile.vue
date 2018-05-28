<template>
<div class="c-user-profile">
  <image-uploader
    :active="true"
    :src="userDetails.bannerId ? url(userDetails.bannerId) : '/static/blank-banner.jpg'"
    @upload="updateBanner"
    class="c-user-profile__banner"
  ></image-uploader>
  <div class="c-user-profile__wrapper">
    <image-uploader
      :active="true"
      :src="userDetails.avatarId ? url(userDetails.avatarId) : '/static/blank-avatar.jpg'"
      @upload="updateAvatar"
      class="c-user-profile__avatar"
    ></image-uploader>
    <div class="c-user-profile__content">
      <div class="c-user-profile__row">
        <h1 class="c-user-profile__name">
          {{ userDetails.name }}
        </h1>
      </div>
      <div class="c-user-profile__row">
        <span class="c-user-profile__value">
          {{ userDetails.recipes || 0 }}
        </span>
        <span class="c-user-profile__label">
          {{ $t('profile.recipes') }}
        </span>
        <span class="c-user-profile__value">
          {{ userDetails.followers || 0 }}
        </span>
        <span class="c-user-profile__label">
          {{ $t('profile.followers') }}
        </span>
        <span class="c-user-profile__value">
          {{ userDetails.following || 0 }}
        </span>
        <span class="c-user-profile__label">
          {{ $t('profile.following') }}
        </span>
      </div>
      <div class="c-user-profile__row">
        <p class="c-user-profile__description">
          {{ userDetails.description }}
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
    ImageUploader: () => import('@/components/image-uploader')
  },
  mixins: [ base ],
  props: {
    id: Number
  },
  data () {
    return {
      loading: false,
      userDetails: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$api.users.readDetails(this.id).then(value => {
        this.userDetails = value.data
        this.loading = false
      })
    },
    updateBanner (bannerId) {
      const userDetails = { ...this.userDetails, bannerId }
      this.$api.users.updateDetails(this.id, userDetails).then(() => {
        if (this.userDetails.bannerId) {
          this.$api.uploads.delete(this.userDetails.bannerId)
        }
        this.userDetails = userDetails
        this.showInfo('info.banner-update-successful')
      })
    },
    updateAvatar (avatarId) {
      const userDetails = { ...this.userDetails, avatarId }
      this.$api.users.updateDetails(this.id, userDetails).then(() => {
        if (this.userDetails.avatarId) {
          this.$api.uploads.delete(this.userDetails.avatarId)
        }
        this.userDetails = userDetails
        this.showInfo('info.avatar-update-successful')
      })
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
