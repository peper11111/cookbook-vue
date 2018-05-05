<template>
<div class="profile-view view">
  <div class="view__wrapper">
    <div class="profile">
      <div class="profile__image" @click="triggerAvatar()">
        <img :src="url('blank-profile.jpg')">
        <input type="file" accept="image/*" style="display: none" ref="avatar" @change="upload()"/>
        <div class="profile__overlay">
          <i class="material-icons">camera_alt</i>
        </div>
      </div>
      <div class="profile__content">
        <div class="profile__header">
          <span v-text="currentUser.username"></span>
          <i class="material-icons" @click="logout()">exit_to_app</i>
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
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    logout () {
      this.$api.auth.logout().then(() => {
        this.showInfo('info.logout-successful')
        this.$store.commit(SET_AUTH, { loggedIn: false, currentUser: null })
        this.$router.push('/login')
      })
    },
    upload () {
      const file = this.$refs.avatar.files[0]
      if (file.size > 10485760) { // 10MB
        this.showError('error.file-exceeds-limit')
        this.$refs.avatar.value = ''
      } else {
        this.$api.upload.create(file)
      }
    },
    triggerAvatar () {
      this.$refs.avatar.click()
    }
  }
}
</script>
