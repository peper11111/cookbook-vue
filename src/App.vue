<template>
<div class="app">
  <router-view></router-view>
  <snackbar></snackbar>
</div>
</template>

<script>
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: { Snackbar }
}
</script>
