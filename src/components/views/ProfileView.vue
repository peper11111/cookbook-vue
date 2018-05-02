<template>
<div class="profile-view">
  Profile View
  <button @click="logout">Logout</button>
</div>
</template>

<script>
import { SHOW_INFO } from '../../store/mutation-types'
import auth from '../../services/auth'

export default {
  name: 'ProfileView',
  methods: {
    logout () {
      auth.logout().then(() => {
        this.$store.commit(SHOW_INFO, 'info.logout-successful')
      })
    }
  }
}
</script>
