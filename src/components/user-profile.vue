<template>
<div class="c-user-profile">
  <image-uploader
    :editMode="editMode"
    :imgSrc="model.bannerId ? url(model.bannerId) : '/static/blank-banner.jpg'"
    @imageUpload="updateBanner"
    class="c-user-profile__banner"
  ></image-uploader>
  <div class="c-user-profile__wrapper">
    <image-uploader
      :editMode="editMode"
      :imgSrc="model.avatarId ? url(model.avatarId) : '/static/blank-avatar.jpg'"
      @imageUpload="updateAvatar"
      class="c-user-profile__avatar"
    ></image-uploader>
    <div class="c-user-profile__content">
      <div class="c-user-profile__row">
        <h1 class="c-user-profile__username">
          {{ model.username }}
        </h1>
        <button
          v-if="currentUserProfile"
          :class="[ editMode ? 'o-button__secondary' : 'o-button__primary' ]"
          @click="editMode = !editMode"
          class="o-button"
        >
          {{ editMode ? $t('user.cancel') : $t('user.edit') }}
        </button>
        <button
          v-if="!currentUserProfile"
          :class="[ model.following ? 'o-button__secondary' : 'o-button__accent' ]"
          @click="follow"
          class="o-button"
        >
          {{ model.following ? $t('user.unfollow') : $t('user.follow') }}
        </button>
      </div>
      <user-stats
        :model="model"
        class="c-user-profile__row"
      ></user-stats>
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
    UserStats: () => import('@/components/user-stats')
  },
  mixins: [ base ],
  props: {
    model: Object
  },
  data () {
    return {
      editMode: false
    }
  },
  computed: {
    currentUserProfile () {
      return this.$store.state.currentUser.id === this.model.id
    }
  },
  methods: {
    follow () {
      this.$api.users.follow(this.id).then(() => {
        this.model.following = !this.model.following
        this.model.followers += this.model.following ? 1 : -1
      })
    },
    updateBanner (bannerId) {
      this.$emit('profileUpdate', { bannerId }, 'info.banner-update-successful')
    },
    updateAvatar (avatarId) {
      this.$emit('profileUpdate', { avatarId }, 'info.avatar-update-successful')
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

  &__username {
    margin-right: 8px;
    font-size: 24px;
  }

  &__description {
    text-align: justify;
  }
}
</style>
