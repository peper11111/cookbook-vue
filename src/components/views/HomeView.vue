<template>
<div class="home-view">
Home View
<button @click="logout">Logout</button>
</div>
</template>

<script>

export default {
  name: 'HomeView',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
