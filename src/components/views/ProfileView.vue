<template>
<div class="profile-view view">
  <div class="view__wrapper">
    <div class="profile">
      <div class="profile__image" @click="triggerAvatar()">
        <img :src="url('blank-profile.jpg')">
        <input type="file" accept="image/*" style="display: none" ref="avatar" @change="create()"/>
        <div class="profile__overlay">
          <i class="material-icons">camera_alt</i>
        </div>
      </div>
      <div class="profile__content">
        <button @click="logout()">Logout</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import { SHOW_INFO, SET_AUTH } from '../../store/mutation-types'

export default {
  name: 'ProfileView',
  mixins: [ base ],
  methods: {
    logout () {
      this.$api.auth.logout().then(value => {
        this.$store.commit(SHOW_INFO, value.data)
        this.$store.commit(SET_AUTH, { loggedIn: false })
        this.$router.push('/login')
      })
    },
    create () {
      this.$api.upload.create(this.$refs.avatar.files[0])
    },
    triggerAvatar () {
      this.$refs.avatar.click()
    }
  }
}
</script>
