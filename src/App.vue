<template>
<div class="app">
  <app-intro></app-intro>
  <snackbar></snackbar>
</div>
</template>

<script>
import AppIntro from './components/AppIntro'
import Snackbar from './components/Snackbar'

export default {
  name: 'App',
  components: { AppIntro, Snackbar }
}
</script>
