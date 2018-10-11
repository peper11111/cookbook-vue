<template>
<div class="c-comment-item">
  <img
    :src="imageSrc"
    class="c-comment-item__image"
  />
  <div class="c-comment-item__wrapper">
    <div class="c-comment-item__row">
      <router-link
        :to="`/user/${comment.author.id}`"
        class="c-comment-item__author"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="c-comment-item__time">
      {{ creationTime }}
    </span>
    </div>
    <div class="c-comment-item__row c-comment-item__content">
      {{ comment.content }}
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import config from '@/config'

export default {
  name: 'CommentItem',
  props: {
    comment: Object
  },
  computed: {
    imageSrc () {
      return this.$helpers.thumbnailSrc(this.comment.author.avatarId) || config.blankAvatar
    },
    creationTime () {
      return moment(this.comment.creationTime).fromNow()
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables";

.c-comment-item {
  display: flex;
  margin-bottom: 8px;

  &__image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  &__wrapper {
    flex-grow: 1;
    margin-left: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &__author {
    text-decoration: none;
    color: $color-text-primary;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  &__time {
    margin-left: 8px;
  }

  &__content {
    text-align: justify;
  }
}
</style>
