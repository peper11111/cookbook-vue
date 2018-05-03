<template>
<div class="profile-view view">
  Profile View
  <button @click="logout()">Logout</button>
</div>
</template>

<script>
import auth from '../../services/auth'

export default {
  name: 'ProfileView',
  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>
