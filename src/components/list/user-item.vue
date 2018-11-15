<template>
<router-link
  :to="`/user/${user.id}`"
  class="c-user-item"
>
  <img
    :src="avatarSrc"
    class="c-user-item__image"
  />
  <div class="c-user-item__content">
    <h1 class="c-user-item__username">
      {{ user.username }}
    </h1>
    <p>
      {{ user.name }}
    </p>
  </div>
</router-link>
</template>

<script>
import config from '@/config'

export default {
  name: 'UserItem',
  props: {
    user: Object
  },
  computed: {
    avatarSrc () {
      return this.$helpers.thumbnailSrc(this.user.avatarId) || config.blankAvatar
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/mixins";
@import "../../assets/styles/variables";

.c-user-item {
  @include box-elevation;
  @include box-elevation-hover;
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 16px;
  width: 290px;
  height: 150px;
  text-decoration: none;
  color: $color-text-primary;

  &__image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }

  &__username {
    font-size: 24px;
    margin-bottom: 8px;
  }
}
</style>
