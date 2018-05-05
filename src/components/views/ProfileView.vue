<template>
<div class="profile-view view" v-if="!loading">
  <div class="view__wrapper">
    <div class="profile">
      <div class="profile__image" @click="triggerAvatar()">
        <img :src="url(currentUser.avatar)">
        <input type="file" accept="image/*" style="display: none" ref="avatar" @change="upload()"/>
        <div class="profile__overlay">
          <i class="material-icons">camera_alt</i>
        </div>
      </div>
      <div class="profile__content">
        <div class="profile__row">
          <span class="profile__text profile__text--header" v-text="currentUser.username"></span>
          <button class="profile__button profile__button--bordered" v-text="$t('profile.edit')"></button>
          <i class="material-icons profile__button" @click="logout()">exit_to_app</i>
        </div>
        <div class="profile__row">
          <span class="profile__text profile__text--bold" v-text="currentUser.posts || 0"></span>
          <span class="profile__text profile__text--label" v-text="$t('profile.posts')"></span>
          <span class="profile__text profile__text--bold" v-text="currentUser.followers || 0"></span>
          <span class="profile__text profile__text--label" v-text="$t('profile.followers')"></span>
          <span class="profile__text profile__text--bold" v-text="currentUser.following || 0"></span>
          <span class="profile__text profile__text--label" v-text="$t('profile.following')"></span>
        </div>
        <div class="profile__row">
          <span class="profile__text"></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import { SET_AUTH } from '../../store/mutation-types'

export default {
  name: 'ProfileView',
  mixins: [ base ],
  data () {
    return {
      loading: false,
      currentUser: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$api.user.get(this.$store.state.auth.currentUserId).then(value => {
        this.currentUser = value.data
        this.loading = false
      })
    },
    logout () {
      this.$api.auth.logout().then(() => {
        this.showInfo('info.logout-successful')
        this.$store.commit(SET_AUTH, { loggedIn: false, currentUserId: null })
        this.$router.push('/login')
      })
    },
    upload () {
      const file = this.$refs.avatar.files[0]
      if (file.size > 10485760) { // 10MB
        this.showError('error.file-exceeds-limit')
        this.$refs.avatar.value = ''
      } else {
        this.$api.upload.create(file).then(value => {
          this.currentUser.avatar = value.data
          return this.$api.user.update(this.currentUser.id, { avatar: value.data })
        }).then(() => {
          this.showInfo('info.avatar-update-successful')
        })
      }
    },
    triggerAvatar () {
      this.$refs.avatar.click()
    }
  }
}
</script>
