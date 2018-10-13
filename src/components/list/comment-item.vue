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
    <div class="c-comment-item__row">
      <span
        v-if="isAuthor"
        class="c-comment-item__action"
      >
        {{ $t('global.edit') }}
      </span>
      <span
        v-if="isAuthor"
        @click="onDelete"
        class="c-comment-item__action"
      >
        {{ $t('global.delete') }}
      </span>
      <span class="c-comment-item__action">
        {{ $t('global.reply') }}
      </span>
    </div>
    <p
      v-if="comment.commentsCount !== 0 && !responses"
      @click="responses = true"
      class="c-comment-item__response"
    >
      {{ $t('comment.response', [ comment.commentsCount ]) }}
    </p>
    <comment-list
      v-if="responses"
      :commentId="comment.id"
      class="c-comment-item__list"
      type="comment-item"
    ></comment-list>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import config from '@/config'
import requester from '@/mixins/requester'

export default {
  name: 'CommentItem',
  components: {
    CommentList: () => import('@/components/list/comment-list')
  },
  mixins: [ requester ],
  props: {
    comment: Object
  },
  data () {
    return {
      responses: false
    }
  },
  computed: {
    authUser () {
      return this.$store.state.auth.user
    },
    imageSrc () {
      return this.$helpers.thumbnailSrc(this.comment.author.avatarId) || config.blankAvatar
    },
    creationTime () {
      return moment(this.comment.creationTime).fromNow()
    },
    isAuthor () {
      return this.comment.author.id === this.authUser.id
    }
  },
  methods: {
    onDelete () {
      if (confirm(this.$t('comment.comment-delete'))) {
        this.wrap(this.deleteComment)
      }
    },
    deleteComment () {
      return this.$api.comments.delete(this.comment.id).then(() => {
        this.$notify.success('comment-delete-successful')
      })
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

  &__action {
    color: $color-text-secondary;
    cursor: pointer;
    margin-right: 8px;
    margin-top: 8px;

    &:hover {
      text-decoration: underline;
    }
  }

  &__response {
    font-weight: bold;
    margin-bottom: 8px;
    cursor: pointer;
  }

  &__list {
    margin-top: 16px;
  }
}
</style>
