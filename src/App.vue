<template>
<div class="app" v-if="initialized">
  <app-intro v-if="currentUser === null"></app-intro>
  <router-view v-if="currentUser !== null"></router-view>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import AppIntro from '@/components/AppIntro'
import AppSnackbar from '@/components/AppSnackbar'

export default {
  name: 'App',
  components: {
    AppIntro,
    AppSnackbar
  },
  data () {
    return {
      initialized: false
    }
  },
  mounted () {
    this.$store.dispatch('fetchCurrentUser').then(() => {
      this.initialized = true
    })
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  }
}
</script>
