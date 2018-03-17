<template>
<div class="login-view">
  <h1>Cookbook</h1>
  <form class="form">
    <input class="form__input" type="text" :placeholder="$t('login')"/>
    <input class="form__input" type="password" :placeholder="$t('password')"/>
    <input class="form__input" type="submit" :value="$t('log-in')"/>
  </form>
</div>
</template>

<script>
export default {
  name: 'LoginView'
}
</script>

<style lang="scss">
.login-view {
  background-image: url("../assets/images/dan-gold-105699-unsplash.jpg");
  font-family: "Dancing Script", cursive;
}
</style>
