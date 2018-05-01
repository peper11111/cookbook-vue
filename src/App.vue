<template>
<div class="app">
  <app-intro v-if="currentUser === null"></app-intro>
  <router-view class="app__wrapper" v-if="currentUser !== null"></router-view>
  <app-topbar v-if="currentUser !== null"></app-topbar>
  <app-snackbar></app-snackbar>
</div>
</template>

<script>
import AppIntro from './components/AppIntro'
import AppTopbar from './components/AppTopbar'
import AppSnackbar from './components/AppSnackbar'

export default {
  name: 'App',
  components: {
    AppIntro,
    AppTopbar,
    AppSnackbar
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$store.dispatch('fetchCurrentUser').then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/variables';

.app {
  &__wrapper {
    box-sizing: border-box;
    padding-top: $toolbar-height;
    background: $color-white;
  }
}
</style>
