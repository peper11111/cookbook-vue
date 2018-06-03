<template>
<div class="c-user-profile">
  <image-picker
    :editMode="editMode"
    :model="banner"
    @change="changeBanner"
    class="c-user-profile__banner"
  ></image-picker>
  <div class="c-user-profile__wrapper">
    <image-picker
      :editMode="editMode"
      :model="avatar"
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
      avatar: {},
      banner: {},
      description: null,
      avatarId: null,
      bannerId: null
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
      this.avatar = {
        blank: '/static/blank-avatar.jpg',
        src: this.url(this.user.avatarId),
        file: null
      }
      this.banner = {
        blank: '/static/blank-banner.jpg',
        src: this.url(this.user.bannerId),
        file: null
      }
      this.description = this.user.description
      this.avatarId = this.user.avatarId
      this.bannerId = this.user.bannerId
    },
    async update () {
      if (this.avatar.file) {
        const formData = new FormData()
        formData.set('file', this.avatar.file)
        await this.$api.uploads.create(formData).then(value => {
          this.avatarId = value.data
        })
      }
      if (this.banner.file) {
        const formData = new FormData()
        formData.set('file', this.banner.file)
        await this.$api.uploads.create(formData).then(value => {
          console.log(value.data)
          this.bannerId = value.data
        })
      }
      await this.$api.users.modify(this.user.id, {
        avatarId: this.avatarId,
        bannerId: this.bannerId,
        description: this.description
      }).then(() => {
        if (this.user.bannerId && this.user.bannerId !== this.bannerId) {
          this.$api.uploads.delete(this.user.bannerId)
        }
        if (this.user.avatarId && this.user.avatarId !== this.avatarId) {
          this.$api.uploads.delete(this.user.avatarId)
        }
        return this.$api.users.read(this.user.id)
      }).then(value => {
        this.$store.commit('setUser', value.data)
        this.showInfo('info.profile-update-successful')
      })
    },
    changeBanner (banner) {
      this.banner = banner
    },
    changeAvatar (avatar) {
      this.avatar = avatar
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

  &__description[disabled] {
    background: none;
    padding: 0;
    border: none;
  }
}
</style>
