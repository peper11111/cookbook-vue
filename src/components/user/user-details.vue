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
      <user-actions
        :editMode="editMode"
        :disabled="loading"
        @cancel="init()"
        @edit="editMode = true"
        @follow="follow()"
        @save="update()"
        class="c-user-details__row"
      ></user-actions>
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
import base from '@/mixins/base'
import { SET_USER, SIGN_IN } from '@/store/mutation-types'

export default {
  name: 'UserDetails',
  components: {
    FormInput: () => import('@/components/form/form-input'),
    FormTextarea: () => import('@/components/form/form-textarea'),
    ImagePicker: () => import('@/components/form/image-picker'),
    UserActions: () => import('@/components/user/user-actions'),
    UserSummary: () => import('@/components/user/user-summary')
  },
  mixins: [ base ],
  data () {
    return {
      loading: null,
      avatar: null,
      avatarFile: null,
      banner: null,
      bannerFile: null,
      name: null,
      biography: null,
      editMode: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    authUser () {
      return this.$store.state.auth.user
    },
    userId () {
      return Number(this.$route.params.id)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.avatar = this.$helpers.thumbnailSrc(this.user.avatarId)
      this.banner = this.$helpers.imageSrc(this.user.bannerId)
      this.name = this.user.name
      this.biography = this.user.biography
      this.editMode = false
    },
    update () {
      this.loading = true
      let avatarId, bannerId
      this.uploadImg(this.user.avatarId, this.avatar, this.avatarFile).then((id) => {
        avatarId = id
        return this.uploadImg(this.user.bannerId, this.banner, this.bannerFile)
      }).then((id) => {
        bannerId = id
        return this.$api.users.modify(this.userId, {
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
        return this.$api.users.read(this.userId)
      }).then((value) => {
        this.$store.commit(SET_USER, value.data)
        if (this.authUser.id === this.userId) {
          return this.$api.users.current().then((value) => {
            this.$store.commit(SIGN_IN, value.data)
          })
        } else {
          return Promise.resolve()
        }
      }).then(() => {
        this.$notify.success('profile-update-successful')
        this.loading = false
        this.editMode = false
      })
    },
    follow () {
      this.loading = true
      this.$api.users.follow(this.userId).then(() => {
        return this.$api.users.read(this.userId)
      }).then((value) => {
        this.$store.commit(SET_USER, value.data)
        this.$notify.info(this.user.following ? 'user-follow' : 'user-unfollow')
        this.loading = false
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

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>