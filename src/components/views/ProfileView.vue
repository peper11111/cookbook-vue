<template>
<div class="profile-view view">
  <div class="view__wrapper">
    <div class="profile">
      <img class="profile__image" :src="url('blank-profile.jpg')">
      <div class="profile__content">
        <button @click="logout()">Logout</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import base from '../../mixins/base'
import auth from '../../services/auth'

export default {
  name: 'ProfileView',
  mixins: [ base ],
  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>
