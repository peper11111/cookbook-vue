<template>
<div class="profile-view">
  Profile View
  <button @click="logout">Logout</button>
</div>
</template>

<script>
export default {
  name: 'ProfileView',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
