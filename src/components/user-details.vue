<template>
<div class="c-user-details">
  <image-picker
    :editMode="editMode"
    :imgSrc="banner.src"
    @change="changeBanner"
    class="c-user-details__banner"
  ></image-picker>
  <div class="c-user-details__wrapper">
    <image-picker
      :editMode="editMode"
      :imgSrc="avatar.src"
      :blankSrc="'/static/blank-avatar.jpg'"
      @change="changeAvatar"
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
      <user-stats class="c-user-details__row"></user-stats>
      <div class="c-user-details__row">
        <textarea
          v-model="description"
          :disabled="!editMode"
          :placeholder="editMode ? $t('user.description') : ''"
          class="o-form__textarea c-user-details__description"
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
import details from '@/mixins/details'

export default {
  name: 'UserDetails',
  components: {
    ImagePicker: () => import('@/components/image-picker'),
    UserButtons: () => import('@/components/user-buttons'),
    UserStats: () => import('@/components/user-stats')
  },
  mixins: [ base, details ],
  data () {
    return {
      avatar: {
        src: null,
        file: null
      },
      banner: {
        src: null,
        file: null
      },
      description: null
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    init () {
      this.avatar = {
        src: this.user.avatarId,
        file: null
      }
      this.banner = {
        src: this.user.bannerId,
        file: null
      }
      this.description = this.user.description
    },
    update () {
      this.uploadImg(this.avatar).then(() => {
        return this.uploadImg(this.banner)
      }).then(() => {
        return this.$api.users.modify(this.user.id, {
          avatarId: this.avatar.src,
          bannerId: this.banner.src,
          description: this.description
        })
      }).then(() => {
        if (this.user.bannerId && this.user.bannerId !== this.banner.src) {
          this.$api.uploads.delete(this.user.bannerId)
        }
        if (this.user.avatarId && this.user.avatarId !== this.avatar.src) {
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
