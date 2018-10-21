<template>
<div class="c-user-details">
  <detail-actions
    :disabled="pending"
    :canEdit="isAuthUser"
    :editMode="editMode"
    :createMode="createMode"
    :previewMode="previewMode"
    @action="onAction"
  ></detail-actions>
  <image-picker
    v-model="models.bannerId"
    :blank="blankBanner"
    :disabled="previewMode"
    class="c-user-details__banner"
  ></image-picker>
  <div class="c-user-details__wrapper">
    <image-picker
      v-model="models.avatarId"
      :blank="blankAvatar"
      :disabled="previewMode"
      class="c-user-details__avatar"
    ></image-picker>
    <user-content
      :models="models"
      :previewMode="previewMode"
      class="c-user-details__content"
    ></user-content>
  </div>
</div>
</template>

<script>
import config from '@/config'
import editor from '@/mixins/editor'
import { SET_USER } from '@/store/mutation-types'

export default {
  name: 'UserDetails',
  components: {
    DetailActions: () => import('@/components/detail-actions'),
    ImagePicker: () => import('@/components/form/image-picker'),
    UserContent: () => import('@/components/user/user-content')
  },
  mixins: [ editor ],
  data () {
    return {
      models: {
        avatarId: null,
        bannerId: null,
        name: null,
        biography: null
      }
    }
  },
  computed: {
    model () {
      return this.user
    },
    authUser () {
      return this.$store.state.auth.user
    },
    user () {
      return this.$store.state.user
    },
    blankAvatar () {
      return config.blankAvatar
    },
    blankBanner () {
      return config.blankBanner
    },
    isAuthUser () {
      return this.user.id === this.authUser.id
    }
  },
  methods: {
    modify (params) {
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
    margin-top: 32px;
    padding:  0 32px;
    position: relative;
  }

  &__avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  &__content {
    flex-grow: 1;
    margin-left: 32px;
  }
}
</style>
