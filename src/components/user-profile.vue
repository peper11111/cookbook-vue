<template>
<div class="c-user-profile">
  <image-picker
    :editMode="editMode"
    :imgSrc="banner"
    @change="changeBanner"
    class="c-user-profile__banner"
  ></image-picker>
  <div class="c-user-profile__wrapper">
    <image-picker
      :editMode="editMode"
      :imgSrc="avatar"
      :blankSrc="'/static/blank-avatar.jpg'"
      @change="changeAvatar"
      class="c-user-profile__avatar"
    ></image-picker>
    <div class="c-user-profile__content">
      <div class="c-user-profile__row">
        <h1 class="c-user-profile__username">
          {{ user.username }}
        </h1>
        <user-buttons
          :editMode="editMode"
          @click="clickAction"
        ></user-buttons>
      </div>
      <user-stats class="c-user-profile__row"></user-stats>
      <div class="c-user-profile__row">
        <textarea
          v-model="description"
          :disabled="!editMode"
          :placeholder="editMode ? $t('user.description') : ''"
          class="o-form__textarea c-user-profile__description"
          rows="3"
        >
        </textarea>
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
    ImagePicker: () => import('@/components/image-picker'),
    UserButtons: () => import('@/components/user-buttons'),
    UserStats: () => import('@/components/user-stats')
  },
  mixins: [ base ],
  data () {
    return {
      editMode: false,
      avatar: null,
      avatarFile: null,
      banner: null,
      bannerFile: null,
      description: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.avatar = this.user.avatarId
      this.avatarFile = null
      this.banner = this.user.bannerId
      this.bannerFile = null
      this.description = this.user.description
    },
    uploadImg (img, imgFile) {
      if (imgFile) {
        const formData = new FormData()
        formData.set('file', imgFile)
        return this.$api.uploads.create(formData)
      }
      return Promise.resolve({ data: img })
    },
    update () {
      this.uploadImg(this.avatar, this.avatarFile).then(value => {
        this.avatar = value.data
        return this.uploadImg(this.banner, this.bannerFile)
      }).then(value => {
        this.banner = value.data
        return this.$api.users.modify(this.user.id, {
          avatarId: this.avatar,
          bannerId: this.banner,
          description: this.description
        })
      }).then(() => {
        if (this.user.bannerId && this.user.bannerId !== this.banner) {
          this.$api.uploads.delete(this.user.bannerId)
        }
        if (this.user.avatarId && this.user.avatarId !== this.avatar) {
          this.$api.uploads.delete(this.user.avatarId)
        }
        return this.$api.users.read(this.user.id)
      }).then(value => {
        this.$store.commit('setUser', value.data)
        this.showInfo('info.profile-update-successful')
      })
    },
    changeBanner (banner, bannerFile) {
      this.banner = banner
      this.bannerFile = bannerFile
    },
    changeAvatar (avatar, avatarFile) {
      this.avatar = avatar
      this.avatarFile = avatarFile
    },
    clickAction (action) {
      if (action === 'edit') {
        this.editMode = true
      } else if (action === 'cancel') {
        this.init()
        this.editMode = false
      } else if (action === 'save') {
        this.update()
        this.editMode = false
      }
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
    justify-content: space-evenly;
    padding: 32px 32px 0 32px;
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

  &__description[disabled] {
    background: none;
    padding: 0;
    border: none;
  }
}
</style>
