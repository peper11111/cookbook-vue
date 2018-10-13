<template>
<div class="c-comment-input">
  <img
    :src="avatarSrc"
    class="c-comment-input__image"
  />
  <div class="c-comment-input__wrapper">
    <input
      v-model="comment"
      :placeholder="$t('comment.placeholder')"
      class="o-form__input o-form__input--full"
    />
    <div class="c-comment-input__buttons">
      <button
        @click="comment = ''"
        class="o-button o-button__primary"
      >
        {{ $t('global.cancel') }}
      </button>
      <button class="o-button o-button__accent">
        {{ $t('global.comment') }}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import config from '@/config'

export default {
  name: 'CommentInput',
  data () {
    return {
      comment: ''
    }
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    avatarSrc () {
      return this.$helpers.thumbnailSrc(this.authUser.avatarId) || config.blankAvatar
    }
  }
}
</script>

<style lang="scss">
.c-comment-input {
  display: flex;

  &__image {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  &__wrapper {
    flex-grow: 1;
    margin-left: 16px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
